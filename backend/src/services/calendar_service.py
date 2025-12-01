import json
import boto3
import os
import uuid
import datetime
from typing import Any


def get_dynamodb_table() -> Any:
    table_name = os.environ.get("TABLE_NAME")  # raises keyerror if var n/a exist
    aws_environment = os.environ.get("AWSENV", "AWS")
    # fix make environment variable
    # region = os.environ.get("REGION", "us-east-2")
    if aws_environment == "AWS_SAM_LOCAL":
        dynamodb_table = boto3.resource(
            "dynamodb", endpoint_url="http://127.0.0.1:8000"
        )
        # endpoint_url="http://127.0.0.1:8000" or docker http://dynamodb:8000"
    else:
        dynamodb_table = boto3.resource("dynamodb")
    return dynamodb_table.Table(table_name)


# def order(calendars,order_by="last_accessed"):


def get_all_calendars() -> dict[str, Any]:
    table = get_dynamodb_table()
    response = table.scan()
    print(response)
    # calendars = order(response["Items"])
    return response["Items"]


def get_calendar(calendar_id: str):
    table = get_dynamodb_table()
    response = table.get_item(Key={"id": calendar_id})
    print(response)
    return response["Item"]


def parse_create_request(
    event: dict[str, Any],
) -> tuple[dict[str, Any] | None, dict | None]:
    if not event["body"] or event["body"] == "":
        return None, {"error": "Bad request: Empty Body"}
    return json.loads(event["body"]), None


def validate_hex_code(color: str):
    return color[0] == "#" and len(color) == 7


def get_extension_from_filename(filename):
    _, ext = os.path.splitext(filename)
    if len(ext) > 1:
        return ext.lstrip(".")
    return ext


def validate_file_extension(file_extension: str, filename: str):
    allowed_extensions_list = os.environ.get("ALLOWED_EXTENSIONS").split(",")
    ext = get_extension_from_filename(filename)
    return (
        file_extension in allowed_extensions_list
        and ext.lower() in allowed_extensions_list
    )


def validate_calendar_metadata(metadata: dict[str, Any]) -> None | str:
    allowed_content_types_list = os.environ.get("ALLOWED_CONTENT_TYPES").split(",")
    max_file_size = int(os.environ.get("MAX_FILE_SIZE"))

    required_metadata = {
        "is_private": bool,
        "week_color": str,
        "day_color": str,
        "text_color": str,
        "light_mode": bool,
        "filename": str,
        "content_type": str,
        "file_extension": str,
        "file_size": int,
    }

    required_metadata_keys = set(required_metadata.keys())
    metadata_keys = set(metadata.keys())

    if required_metadata_keys != metadata_keys:
        print(f"Error\nexpected:{required_metadata_keys}\nkeys: {metadata_keys}")
        return "Missing fields"

    for key, expected_type in required_metadata.items():
        if not isinstance(metadata[key], expected_type):
            print(f"Error {metadata[key]} is not valid")
            return f"Invalid {key} data type"

    if not validate_hex_code(metadata["week_color"]) or not validate_hex_code(
        metadata["day_color"]
    ):
        print("Error hex_code is not valid")
        return "Invalid hex_code"

    if metadata["content_type"] not in allowed_content_types_list:
        print("Error content_type is not valid")
        return "Invalid content_type"

    if not validate_file_extension(metadata["file_extension"], metadata["filename"]):
        print("Error file_extension is not valid")
        return "Invalid file_extension"

    # print(int(metadata["file_size"]) + "maxfilesize: " + max_file_size + " type: " + type(max_file_size))

    if int(metadata["file_size"]) > max_file_size:
        print("Error file_size is not valid")
        return "Invalid file_size"

    return None


def create_calendar(metadata: dict) -> dict:
    return {
        "id": str(uuid.uuid4()),
        "date_created": str(datetime.datetime.now(tz=datetime.UTC)),
        "last_accessed": str(datetime.datetime.now(tz=datetime.UTC)),
        "is_private": metadata["is_private"],
        "week_color": metadata["week_color"],
        "day_color": metadata["day_color"],
        "text_color": metadata["text_color"],
        "light_mode": metadata["light_mode"],
        "filename": metadata["filename"],
        "file_size": metadata["file_size"],
        "content_type": metadata["content_type"],
        "file_extension": metadata["file_extension"],
        "file_id": str(uuid.uuid4()),
    }
