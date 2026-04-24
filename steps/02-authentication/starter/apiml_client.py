import os
import requests
import urllib3
from dotenv import load_dotenv

# Suppress SSL warnings for self-signed mainframe certificates
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

load_dotenv()

APIML_URL = os.getenv("APIML_URL", "")
APIML_USER = os.getenv("APIML_USER", "")
APIML_PASSWORD = os.getenv("APIML_PASSWORD", "")
HLQ = os.getenv("HLQ", "")

# TODO: implement get_token() — authenticate and return a JWT token
def get_token():
    pass


if __name__ == "__main__":
    token = get_token()
    print(f"Token acquired: {token[:20]}..." if token else "Authentication failed.")
