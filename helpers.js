const capitalize = (s) => {
  if (typeof s !== 'string') return s
  return s
    .toLocaleLowerCase('tr')
    .split(' ')
    .map((str) => str.charAt(0).toLocaleUpperCase('TR') + str.substring(1))
    .join(' ')
}

module.exports = {
  capitalize,
}
