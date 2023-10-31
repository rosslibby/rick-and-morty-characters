import { useContext } from 'react'
import { Episode } from 'components/episodes/types'
import { storeCtx } from 'app/api'
import { useApi } from './api'
import { getCharacterId } from 'utils'

export const useNavigation = () => {
  const {
    episode,
    episodes,
    _: {
      selectEpisode,
      setCharactersPage,
    }
  } = useContext(storeCtx)
  const { loadCharacters, resetCharacters } = useApi()

  const toggleSelect = (id?: number) => {
    if (typeof id !== undefined && id !== episode?.id) {
      const episode = episodes.find((episode: Episode) => episode.id === id)
      selectEpisode(episode)
      const characterIDs = episode?.characters.map((character: string) => getCharacterId(character))
      loadCharacters(characterIDs)
      setCharactersPage(0)
    } else {
      selectEpisode(null)
      resetCharacters()
    }
  }

  return {
    toggleSelect,
  }
}
