module.exports = async function validate(context) {
  if (!await context.files.exists('apiml_client.py')) {
    return context.fail('`apiml_client.py` not found.');
  }

  const src = await context.files.read('apiml_client.py');

  const hasClean = src.includes('def clean_datasets') || src.includes('/manipulate');
  const hasDownload = src.includes('def download_dataset') || src.includes('/download-dataset') || src.includes('download_dataset');

  if (!hasClean && !hasDownload) {
    return context.fail(
      'Neither `clean_datasets()` nor `download_dataset()` found. Add both functions to `apiml_client.py`.',
    );
  }

  if (!hasClean) {
    return context.fail('`clean_datasets()` not found. Add a function that POSTs to the `/manipulate` endpoint.');
  }

  if (!hasDownload) {
    return context.fail('`download_dataset()` not found. Add a function that POSTs to the `/download-dataset` endpoint.');
  }

  if (!src.includes('create_payload')) {
    return context.warn('Both functions exist, but neither calls `create_payload()`. Use it to build the request body.');
  }

  return context.pass('Both `clean_datasets()` and `download_dataset()` implemented!');
};
