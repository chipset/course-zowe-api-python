module.exports = async function validate(context) {
  if (!await context.files.exists('requirements.txt')) {
    return context.fail('`requirements.txt` not found. Make sure the starter files were scaffolded correctly.');
  }

  if (!await context.files.exists('.env')) {
    return context.fail('`.env` file not found. Copy `.env.example` to `.env` and fill in your credentials.');
  }

  const env = await context.files.read('.env');

  const required = ['APIML_URL', 'APIML_USER', 'APIML_PASSWORD', 'HLQ'];
  const missing = required.filter((key) => !env.includes(key + '='));
  if (missing.length > 0) {
    return context.fail(`Missing variables in \`.env\`: ${missing.join(', ')}`);
  }

  // Check HLQ has been customized from the default
  if (env.includes('HLQ=CUST001') || env.includes('HLQ=your-username')) {
    return context.warn(
      'Update `HLQ` in your `.env` to something unique (e.g. your username). Using the default risks clashing with other participants.',
    );
  }

  return context.pass('Setup complete! Dependencies listed and `.env` configured.');
};
