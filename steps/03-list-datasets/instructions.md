# List Mainframe Datasets

With a token in hand, you can now query the mainframe for datasets. Datasets are organized by **High-Level Qualifier (HLQ)** — think of it as the top-level namespace for your data, similar to a username prefix.

## The endpoint

```
GET {APIML_URL}/api/v1/datasets?hlq={HLQ}
Authorization: apimlAuthenticationToken={token}
```

Pass the token as a cookie header.

## Your task

Add a `list_datasets(token)` function to `apiml_client.py`:

```python
def list_datasets(token):
    url = f"{APIML_URL}/api/v1/datasets"
    cookies = {"apimlAuthenticationToken": token}
    params = {"hlq": HLQ}
    response = requests.get(url, cookies=cookies, params=params, verify=False)
    response.raise_for_status()
    return response.json()
```

Then call it in `__main__`:

```python
if __name__ == "__main__":
    token = get_token()
    datasets = list_datasets(token)
    print("Datasets found:")
    for ds in datasets:
        print(f"  {ds}")
```

### What's an HLQ?

On z/OS, every dataset name follows the pattern `HLQ.QUALIFIER.MEMBER`. The HLQ is the owner prefix — querying by HLQ returns all datasets belonging to that owner. Your unique HLQ from Step 1 ensures you're only seeing your own data.

Click **Check Work** when done.
