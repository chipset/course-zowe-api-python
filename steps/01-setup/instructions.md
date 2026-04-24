# Project Setup

In this course you'll build a Python client that talks to a mainframe via the **Zowe API Mediation Layer (API ML)** — a gateway that exposes z/OS services as standard REST APIs.

Your client will:
1. Authenticate with the API ML
2. Query mainframe datasets by High-Level Qualifier (HLQ)
3. Trigger a data-cleaning job
4. Download and parse the results

## Your tasks

### 1. Install the dependencies

```
pip install -r requirements.txt
```

The three libraries you need:

| Library | Purpose |
|---|---|
| `requests` | HTTP calls to the API ML |
| `python-dotenv` | Load credentials from a `.env` file |
| `urllib3` | SSL configuration (mainframes often use self-signed certs) |

### 2. Create your `.env` file

Copy the example and fill in your values:

```
cp .env.example .env
```

Then open `.env` and set a **unique High-Level Qualifier** — change `HLQ` from `CUST001` to something that identifies you (e.g. your username). This prevents collisions with other workshop participants on the shared mainframe.

> **Note:** The APIML_URL, APIML_USER, and APIML_PASSWORD will be provided by your workshop instructor.

When your `.env` is ready, click **Check Work**.
