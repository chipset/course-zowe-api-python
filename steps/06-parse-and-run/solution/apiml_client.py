import os
import json
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


def clean_datasets(token):
    url = f"{APIML_URL}/api/v1/manipulate"
    cookies = {"apimlAuthenticationToken": token}
    payload = create_payload()
    response = requests.post(url, json=payload, cookies=cookies, verify=False)
    response.raise_for_status()
    print("Cleaning triggered:", response.json())
    return response.json()


def download_dataset(token, dataset_name):
    url = f"{APIML_URL}/api/v1/download-dataset"
    cookies = {"apimlAuthenticationToken": token}
    payload = create_payload(dataset=dataset_name)
    response = requests.post(url, json=payload, cookies=cookies, verify=False)
    response.raise_for_status()
    return response.text


def parse_records(raw_text):
    records = []
    for line in raw_text.strip().splitlines():
        if len(line) < 64:
            continue
        records.append({
            "account": line[0:10].strip(),
            "billing": line[10:22].strip(),
            "name":    line[22:52].strip(),
            "phone":   line[52:64].strip(),
            "email":   line[64:].strip(),
        })
    return records


if __name__ == "__main__":
    token = get_token()

    datasets = list_datasets(token)
    print(f"Found {len(datasets)} dataset(s)")

    clean_datasets(token)

    output_dataset = datasets[0] if datasets else f"{HLQ}.TEST.OUTPUT"
    raw = download_dataset(token, output_dataset)

    records = parse_records(raw)
    print(json.dumps(records, indent=2))
