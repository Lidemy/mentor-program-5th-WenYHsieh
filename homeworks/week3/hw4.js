function isPalindrome(str) {
  let strReversed = ''
  for (let i = str.length - 1; i >= 0; i--) { strReversed += str[i] }
  if (str === strReversed) {
    console.log('True')
  } else {
    console.log('False')
  }
}
isPalindrome('hello')
