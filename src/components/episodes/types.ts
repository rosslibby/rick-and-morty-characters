import { Character } from 'components/characters/types'

export interface Episode {
  id: number
  name: string
  air_date: string
  episode: string
  characters: string[] | Character[]
  url: string
  created: string
}
