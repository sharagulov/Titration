import { ref, onMounted } from 'vue'

export function useAnimatedText(fullText, speedFirst = 300, speedNext = 80) {
  const allWords = fullText.trim().split(' ')
  const displayedWords = ref([])
  let index = 0
  function playAnimation() {
    if (index >= allWords.length) return
    displayedWords.value.push(allWords[index])
    index++
    setTimeout(playAnimation, index === 1 ? speedFirst : speedNext)
  }
  onMounted(playAnimation)
  return {
    displayedWords,
    wordsCount: allWords.length
  }
}
