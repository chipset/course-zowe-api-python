module.exports = async function validate(context) {
  if (!await context.files.exists('apiml_client.py')) {
    return context.fail('`apiml_client.py` not found.');
  }

  const src = await context.files.read('apiml_client.py');

  if (!src.includes('load_dotenv')) {
    return context.fail('Missing `load_dotenv()` call. Import and call it at the top of the file.');
  }

  if (!src.includes('def get_token')) {
    return context.fail('`get_token()` function not found. Implement it to authenticate with the API ML.');
  }

  if (src.includes('def get_token') && src.includes('pass') &&
      !src.includes('requests.post') && !src.includes('requests.get')) {
    return context.fail('`get_token()` is still a stub. Implement the POST to the login endpoint.');
  }

  if (!src.includes('/auth/login') && !src.includes('login')) {
    return context.warn(
      '`get_token()` exists but doesn\'t seem to call the auth/login endpoint. Double-check the URL.',
    );
  }

  if (!src.includes('apimlAuthenticationToken') && !src.includes('cookies')) {
    return context.warn(
      'Function looks good, but make sure you\'re reading the `apimlAuthenticationToken` cookie from the response.',
    );
  }

  return context.pass('Authentication function implemented! Ready to make authenticated requests.');
};
