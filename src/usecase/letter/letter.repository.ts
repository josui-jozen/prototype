import type { Letter } from './letter.types'

export type LetterRepository = {
  findReceived: () => Promise<Letter[]>
  findSent: () => Promise<Letter[]>
}
