import { Character } from 'components/characters/types'
import { Episode } from 'components/episodes/types'

export interface Store {
  characters: Character[]
  episodes: Episode[]
  episode: Episode | null
  loading: boolean
  charactersPage: number
  episodesPage: number
  _: {
    [key: string]: Function
  }
}
