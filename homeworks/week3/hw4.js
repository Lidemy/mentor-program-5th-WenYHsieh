function isPalindrome(str) {
  let strReversed = ''
  for (let i = str.length - 1; i >= 0; i--) strReversed += str[i]
  return str === strReversed ? 'True' : 'False'
  /*
  if (str === strReversed) {
    return 'True'
  } else {
    return 'False'
  }
  */
}

console.log(isPalindrome('HHAHH'))
console.log(isPalindrome('Hello'))
