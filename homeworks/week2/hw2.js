function capitalize(str) {
  // check first charater, if not lower case, return original string
  let codeOfFirstChar = str.charCodeAt(0);
  if (!(codeOfFirstChar>=97 && codeOfFirstChar<=122)){ return str }
  // first charater convert to uppercase + rest of string without first character 
  return String.fromCharCode(codeOfFirstChar-32) + str.slice(1)
}
