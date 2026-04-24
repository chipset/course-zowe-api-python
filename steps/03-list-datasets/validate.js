module.exports = async function validate(context) {
  if (!await context.files.exists('apiml_client.py')) {
    return context.fail('`apiml_client.py` not found.');
  }

  const src = await context.files.read('apiml_client.py');

  if (!src.includes('def list_datasets')) {
    return context.fail('`list_datasets()` function not found. Add it to `apiml_client.py`.');
  }

  if (!src.includes('/datasets') && !src.includes('list-datasets')) {
    return context.warn('`list_datasets()` exists but the datasets endpoint URL isn\'t visible. Check the URL path.');
  }

  if (!src.includes('hlq') && !src.includes('HLQ')) {
    return context.warn('Make sure you\'re passing the HLQ as a query parameter to filter datasets.');
  }

  if (!src.includes('cookies')) {
    return context.warn('Pass the token as a cookie (`cookies={"apimlAuthenticationToken": token}`).');
  }

  return context.pass('`list_datasets()` implemented! Your client can now discover mainframe datasets.');
};
