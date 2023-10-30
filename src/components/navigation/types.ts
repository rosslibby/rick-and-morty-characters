import { Character } from 'components/characters/types'
import { Episode } from 'components/episodes/types'

export interface SelectedEpisode {
  characters: Character[]
  episode: Episode
}

export interface Navigation {
  characters: Character[]
  episodes: Episode[]
  episode: SelectedEpisode | null
  loading: boolean
  _: {
    [key: string]: Function
  }
}
