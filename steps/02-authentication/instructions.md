# Authentication

The Zowe API ML uses **JWT tokens** for authentication. You POST your credentials once and receive a token that authorizes all subsequent requests.

## The auth endpoint

```
POST {APIML_URL}/gateway/api/v1/auth/login
Content-Type: application/json

{ "username": "...", "password": "..." }
```

A successful response returns `200 OK` with the token in the `apimlAuthenticationToken` cookie.

## Your task

Implement `get_token()` in `apiml_client.py`:

```python
def get_token():
    url = f"{APIML_URL}/gateway/api/v1/auth/login"
    payload = {"username": APIML_USER, "password": APIML_PASSWORD}
    response = requests.post(url, json=payload, verify=False)
    response.raise_for_status()
    return response.cookies.get("apimlAuthenticationToken")
```

### Why `verify=False`?

Mainframe environments often use self-signed TLS certificates that aren't in your system's trust store. `verify=False` skips certificate validation — acceptable in a workshop, but in production you'd provide the CA bundle via `verify='/path/to/ca.pem'`.

## Testing it

Run the script to confirm authentication works:

```
python apiml_client.py
```

You should see `Token acquired: eyJhbGciOi...`

Click **Check Work** when done.
