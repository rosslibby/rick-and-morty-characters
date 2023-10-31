import { useCallback, useContext } from 'react'
import { Episode } from 'components/episodes/types'
import { storeCtx } from 'app/api'

export const useNavigation = () => {
  const {
    episode,
    episodes,
    _: {
      selectEpisode,
      setCharactersPage,
      setLoading,
    }
  } = useContext(storeCtx)

  const toggleSelect = (id?: number) => {
    if (typeof id !== undefined && id !== episode?.id) {
      const episode = episodes.find((episode: Episode) => episode.id === id)
      selectEpisode(episode)
      setCharactersPage(0)
    } else {
      selectEpisode(null)
    }
  }

  const loadEpisode = useCallback(async (id: number) => {
    setLoading(true)

    const episode = await (await fetch(`/api/episodes/${id}`)).json()

    setLoading(false)
  }, [setLoading])

  return {
    toggleSelect,
    loadEpisode,
  }
}
