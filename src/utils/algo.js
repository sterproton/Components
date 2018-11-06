const searchAndMatch = (str, target) => {
  let isMatched = true
  for (let i = 0; i < str.length; i += 1) {
    if (str[i] !== target[i]) {
      isMatched = false
      break
    }
  }
  return isMatched
}
