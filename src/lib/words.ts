import { default as GraphemeSplitter } from 'grapheme-splitter'

export const isWinningWord = (word: string, answer: string) => {
  return answer === word
}

export const unicodeSplit = (word: string) => {
  return new GraphemeSplitter().splitGraphemes(word)
}

export const unicodeLength = (word: string) => {
  return unicodeSplit(word).length
}

export const localeAwareLowerCase = (text: string) => {
  return process.env.REACT_APP_LOCALE_STRING
    ? text.toLocaleLowerCase(process.env.REACT_APP_LOCALE_STRING)
    : text.toLowerCase()
}

export const localeAwareUpperCase = (text: string) => {
  return text.toUpperCase()
}

export const getWordOfDay = () => {
  const getAnswer: string = 'money'

  return {
    solution: localeAwareUpperCase(getAnswer),
  }
}

export const { solution } = getWordOfDay()
