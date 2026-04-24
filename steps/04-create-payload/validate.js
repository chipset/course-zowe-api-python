module.exports = async function validate(context) {
  if (!await context.files.exists('apiml_client.py')) {
    return context.fail('`apiml_client.py` not found.');
  }

  const src = await context.files.read('apiml_client.py');

  if (!src.includes('def create_payload')) {
    return context.fail('`create_payload()` function not found. Add it to `apiml_client.py`.');
  }

  // Check it merges kwargs or extra params
  const hasUpdate = src.includes('.update(') || src.includes('**kwargs') || src.includes('| ');
  if (!hasUpdate) {
    return context.warn(
      '`create_payload()` found, but it doesn\'t appear to merge extra parameters. ' +
      'Use `base.update(kwargs)` or `{**base, **kwargs}` so callers can extend the payload.',
    );
  }

  const hasCredentials = src.includes('APIML_USER') || src.includes('username');
  if (!hasCredentials) {
    return context.warn('`create_payload()` should include the username/password credentials in the base payload.');
  }

  return context.pass('`create_payload()` helper ready! Clean, reusable payload construction.');
};
