# def validate_calendar_metadata(metadata: dict[str, Any]) -> None | str:
import pytest

from src.services import calendar_service

import uuid
import datetime


@pytest.fixture()
def metadata():
    return {
        "is_private": False,
        "week_color": "#4C8B3C",
        "day_color": "#r3rm4c",
        "text_color": "#000000",
        "light_mode": False,
        "filename": "a-pink-city.jpg",
        "content_type": "image/jpeg",
        "file_extension": "jpg",
        "file_size": 2278047,
    }


def test_validate_calendar_metadata(metadata, monkeypatch):
    monkeypatch.setenv("ALLOWED_CONTENT_TYPES", "image/jpeg,image/png")
    monkeypatch.setenv("ALLOWED_EXTENSIONS", "jpeg,jpg,png")
    monkeypatch.setenv("MAX_FILE_SIZE", "5242880")

    ret = calendar_service.validate_calendar_metadata(metadata)
    assert ret == None


def test_validate_file_extension(monkeypatch):
    filename = "meow.jpg"
    file_extension = "jpg"
    monkeypatch.setenv("ALLOWED_EXTENSIONS", "jpeg,jpg,png")
    ret = calendar_service.validate_file_extension(file_extension, filename)
    assert ret == True


def test_validate_not_file_extension(monkeypatch):
    filename = "meow.jpg"
    file_extension = "pdf"
    monkeypatch.setenv("ALLOWED_EXTENSIONS", "jpeg,jpg,png")
    ret = calendar_service.validate_file_extension(file_extension, filename)
    assert ret == False


def test_validate_hex_code():
    hex_code = "#roid"
    ret = calendar_service.validate_hex_code(hex_code)
    assert ret == False


def test_create_calendar(metadata):
    ret = calendar_service.create_calendar(metadata)
    sample_output = {
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
    print(ret)

    ret_keys = set(ret.keys())
    sample_output_keys = set(sample_output.keys())
    assert ret_keys == sample_output_keys
    # def create_calendar(metadata: dict) -> dict:
