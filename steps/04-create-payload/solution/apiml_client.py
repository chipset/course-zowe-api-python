import os
import requests
import urllib3
from dotenv import load_dotenv

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

load_dotenv()

APIML_URL = os.getenv("APIML_URL", "")
APIML_USER = os.getenv("APIML_USER", "")
APIML_PASSWORD = os.getenv("APIML_PASSWORD", "")
HLQ = os.getenv("HLQ", "")


def get_token():
    url = f"{APIML_URL}/gateway/api/v1/auth/login"
    payload = {"username": APIML_USER, "password": APIML_PASSWORD}
    response = requests.post(url, json=payload, verify=False)
    response.raise_for_status()
    return response.cookies.get("apimlAuthenticationToken")


def list_datasets(token):
    url = f"{APIML_URL}/api/v1/datasets"
    cookies = {"apimlAuthenticationToken": token}
    params = {"hlq": HLQ}
    response = requests.get(url, cookies=cookies, params=params, verify=False)
    response.raise_for_status()
    return response.json()


def create_payload(**kwargs):
    base = {
        "username": APIML_USER,
        "password": APIML_PASSWORD,
        "hlq": HLQ,
    }
    base.update(kwargs)
    return base


if __name__ == "__main__":
    token = get_token()
    datasets = list_datasets(token)
    print(f"Found {len(datasets)} dataset(s)")
