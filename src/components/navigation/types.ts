import { Character } from 'components/characters/types'
import { Episode } from 'components/episodes/types'

export interface SelectedEpisode {
  characters: Character[]
  episode: Episode
}

export interface Navigation {
  episodes: Episode[]
  episode: SelectedEpisode | null
  _: {
    [key: string]: Function
  }
}
