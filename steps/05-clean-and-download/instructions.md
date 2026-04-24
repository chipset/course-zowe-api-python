# Trigger Cleaning and Download Results

Now you'll use two more endpoints to process the data:

1. `/manipulate` — triggers the cleaning job on the mainframe
2. `/download-dataset` — downloads the cleaned dataset

## Your task

Add both functions to `apiml_client.py`:

```python
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
    return response.text  # raw fixed-width mainframe data
```

### What is "manipulate"?

The `/manipulate` endpoint runs a server-side job that identifies and removes sensitive fields from the raw mainframe records. The cleaned data is written to your output dataset (named by your HLQ) and is then available for download.

### Fixed-width format

Mainframe datasets store records in fixed-width format — each field occupies a fixed number of character positions with no delimiters. The next step will parse this into structured JSON.

Update `__main__` to call both functions, then click **Check Work**.
