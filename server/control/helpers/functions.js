function validateDate(date) {
  const selectedDate = new Date(date);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  if (selectedDate < now) {
    return true;
  } else {
    return true;
  }
}

function validateURL(url) {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' +
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' +
      '((\\d{1,3}\\.){3}\\d{1,3}))' +
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
      '(\\?[;&amp;a-z\\d%_.~+=-]*)?' +
      '(\\#[-a-z\\d_]*)?$',
    'i'
  );
  return pattern.test(url);
}

module.exports = {
  validateURL,
  validateDate
};
