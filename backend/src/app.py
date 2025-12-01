import json

from botocore.exceptions import ClientError

from services import calendar_service, image_service
from utils import response


def lambda_handler(event, _context):
    request_method = event["httpMethod"]
    path = event["path"]
    if request_method == "GET" and path == "/metadata":
        return get_all_calendars()
    if request_method == "GET" and path.startswith("/metadata/"):
        return get_calendar_by_id(event)
    if request_method == "PUT":
        return create_calendar_handler(event)

    return response.not_found()


def get_all_calendars():
    try:
        calendars = calendar_service.get_all_calendars()
        for calendar in calendars:
            calendar["image_url"], calendar["expires_in"] = (
                image_service.generate_download_url(calendar["file_id"])
            )
        return response.success(calendars)
    except ClientError as e:
        print("ERROR fetching items: " + str(e))
        return response.server_error(
            "A client error occurred while fetching calendars images"
        )


def get_calendar_by_id(event):
    try:
        # calendar, error = calendar_service.parse_create_request(event)
        path_parameters = event.get("pathParameters") or {}
        calendar_id = path_parameters.get("id")
        if not calendar_id:
            return response.error("Missing parameter: id")

        calendar_data = calendar_service.get_calendar(calendar_id)
        calendar_data["image_url"], calendar_data["expires_in"] = (
            image_service.generate_download_url(calendar_data["file_id"])
        )
        return response.success(calendar_data)
    except ClientError as e:
        print("Error fetching calendar data: " + str(e))
        return response.server_error("A client error occurred while fetching data")


def create_calendar_handler(event):
    try:
        calendar, error = calendar_service.parse_create_request(event)
        if error:
            return response.error(error)

        error = calendar_service.validate_calendar_metadata(calendar)
        if error:
            return response.error(error)

        params = calendar_service.create_calendar(calendar)

        table = calendar_service.get_dynamodb_table()

        db_response = table.put_item(Item=params)
        print(db_response)

        url, expiration = image_service.generate_upload_url(
            params["file_id"], params["content_type"]
        )

        return response.success(
            {
                "calendar_id": params["id"],
                "upload_url": url,
                "expires_in": expiration,
            }
        )
    except json.JSONDecodeError as e:
        print("Invalid JSON: " + str(e))
        return response.error("Invalid JSON in request data")
    except ClientError as e:  # dynamodb or s3
        print("AWS error: " + str(e))
        return response.server_error("Failed to create upload/metadata record")
