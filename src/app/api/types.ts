import { Character } from 'components/characters/types'
import { Episode } from 'components/episodes/types'

export interface Store {
  characters: Character[]
  charactersCount: number
  charactersLoading: boolean
  episodes: Episode[]
  episodesCount: number
  episode: Episode | null
  episodesLoading: boolean
  charactersPage: number
  episodesPage: number
  _: {
    [key: string]: Function
  }
}
