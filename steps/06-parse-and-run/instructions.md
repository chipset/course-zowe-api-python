# Parse Results and Run

The downloaded data arrives as mainframe **fixed-width format** — each record is a single string where fields are at known character positions with no delimiters. You'll write a parser to convert this into structured JSON.

## Fixed-width field layout

| Field | Start | Length |
|---|---|---|
| `account` | 0 | 10 |
| `billing` | 10 | 12 |
| `name` | 22 | 30 |
| `phone` | 52 | 12 |
| `email` | 64 | 40 |

## Your task

Add `parse_records(raw_text)` to [Open `apiml_client.py`](open:apiml_client.py):

```python
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
```

Then wire the full workflow in `__main__`:

```python
if __name__ == "__main__":
    token = get_token()

    datasets = list_datasets(token)
    print(f"Found {len(datasets)} dataset(s)")

    clean_datasets(token)

    # Use the first dataset returned, or your known output dataset name
    output_dataset = datasets[0] if datasets else f"{HLQ}.TEST.OUTPUT"
    raw = download_dataset(token, output_dataset)

    records = parse_records(raw)
    import json
    print(json.dumps(records, indent=2))
```

## Run it

```
python apiml_client.py
```

You should see a JSON array of customer records with account, billing, name, phone, and email fields.

Click **Check Work** to complete the course!
