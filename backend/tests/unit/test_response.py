import pytest
from decimal import Decimal
from backend.src.utils import response


def test_success():
    test_cases = [Decimal("10"), {"a": 4, "b": 4}]
    outputs = [
        {
            "statusCode": 200,
            "headers": {"Content-Type": "application/json"},
            "body": '"10"',
        },
        {
            "statusCode": 200,
            "headers": {"Content-Type": "application/json"},
            "body": '{"a": 4, "b": 4}',
        },
    ]

    for index in range(len(test_cases)):
        assert outputs[index] == response.success(test_cases[index])
