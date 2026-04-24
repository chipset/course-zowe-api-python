# Create a Payload Helper

The next two API calls (clean and download) share a common structure: they both need your credentials plus additional parameters. Rather than building the same dict twice, you'll write a `create_payload()` helper.

## Your task

Add `create_payload(**kwargs)` to `apiml_client.py`:

```python
def create_payload(**kwargs):
    base = {
        "username": APIML_USER,
        "password": APIML_PASSWORD,
        "hlq": HLQ,
    }
    base.update(kwargs)
    return base
```

### How it works

- Starts with the three fields every request needs
- Accepts any extra keyword arguments and merges them in
- Callers can override defaults or add new fields:

```python
# Basic usage — just credentials + HLQ
payload = create_payload()

# Add a dataset name for the download step
payload = create_payload(dataset="CUST001.TEST.RESULTS")
```

This pattern keeps your code DRY — if the API adds a required field later, you only update one place.

Click **Check Work** when done.
