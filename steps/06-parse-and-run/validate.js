module.exports = async function validate(context) {
  if (!await context.files.exists('apiml_client.py')) {
    return context.fail('`apiml_client.py` not found.');
  }

  const src = await context.files.read('apiml_client.py');

  if (!src.includes('def parse_records')) {
    return context.fail('`parse_records()` function not found. Add it to parse the fixed-width mainframe data.');
  }

  const hasFieldSlicing = src.includes('line[') || src.includes('.strip()');
  if (!hasFieldSlicing) {
    return context.warn(
      '`parse_records()` found, but doesn\'t appear to slice fixed-width fields. ' +
      'Use string slicing like `line[0:10].strip()` to extract each field.',
    );
  }

  const hasAllFields = ['account', 'billing', 'name', 'phone', 'email']
    .every((f) => src.includes(`"${f}"`) || src.includes(`'${f}'`));
  if (!hasAllFields) {
    return context.warn(
      'Not all fields (account, billing, name, phone, email) are present in `parse_records()`. ' +
      'Check the field layout in the instructions.',
    );
  }

  const hasFullFlow = src.includes('get_token') &&
    src.includes('list_datasets') &&
    src.includes('clean_datasets') &&
    src.includes('download_dataset') &&
    src.includes('parse_records');

  if (!hasFullFlow) {
    return context.warn(
      'Parser looks good, but the `__main__` block doesn\'t call all five functions yet. ' +
      'Wire up the full workflow: get_token → list_datasets → clean_datasets → download_dataset → parse_records.',
    );
  }

  return context.pass(
    'Course complete! You built a full mainframe API client: auth, dataset discovery, cleaning, download, and parsing.',
  );
};
