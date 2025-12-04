import json
from .decimal_encoder import DecimalEncoder


def error(message: str, status_code: int = 400) -> dict:
    """Create a error response (e.g., bad request)."""
    return {
        "statusCode": status_code,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps({"error": message}),
    }


def not_found(message: str = "Not Found") -> dict:
    return error(message, 404)


def server_error(message: str) -> dict:
    return error(message, 500)


def success(data: dict, status_code: int = 200) -> dict:
    return {
        "statusCode": status_code,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps(data, cls=DecimalEncoder),
    }
