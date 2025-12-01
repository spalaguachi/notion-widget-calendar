import boto3
from botocore.config import Config
from botocore.client import BaseClient
import os


def get_client() -> BaseClient:
    # region = os.environ.get("REGION", "us-east-2")
    return boto3.client("s3", config=Config(signature_version="s3v4"))


def generate_upload_url(file_id: str, content_type: str) -> tuple[str, int]:
    s3_client = get_client()
    bucket_name = os.environ.get("BUCKET_NAME")
    min_file_size = 1
    max_file_size = int(os.environ.get("MAX_FILE_SIZE"))
    expiration = 360
    fields = {
        "Content-Type": content_type,
        "key": file_id,
        "x-amz-meta-original-filename": file_id,
        # "x-amz-checksum-sha256": checksum,
    }

    conditions = [
        {"Content-Type": content_type},
        {"key": file_id},
        {"x-amz-meta-original-filename": file_id},
        # {"x-amz-checksum-sha256": checksum},
        ["content-length-range", min_file_size, max_file_size],
    ]

    url = s3_client.generate_presigned_post(
        Bucket=bucket_name,
        Key=file_id,
        Fields=fields,
        Conditions=conditions,
        ExpiresIn=expiration,
    )
    return url, expiration


def generate_download_url(file_id: str) -> tuple[str, int]:
    s3_client = get_client()
    bucket_name = os.environ.get("BUCKET_NAME")
    expiration = 360
    url = s3_client.generate_presigned_url(
        "get_object",
        Params={"Bucket": bucket_name, "Key": file_id},
        ExpiresIn=expiration,
    )
    return url, expiration
