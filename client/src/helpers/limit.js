 export function limit(word) {
  let word_array = word.split('');
  let final = ''
  for (let i = 0; i < word_array.length; i++) {
    final = final + word_array[i]
    if (i === 20) {
      final += '...'
      return final
    }
  }
  return final;
}
