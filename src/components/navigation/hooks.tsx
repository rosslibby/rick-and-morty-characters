import { useContext } from 'react'
import { navigationCtx } from '.'
import { Episode } from 'components/episodes/types'

export const useNavigation = () => {
  const {
    episode,
    episodes,
    _: {
      selectEpisode,
    }
  } = useContext(navigationCtx)
  const toggleSelect = (id?: number) => {
    if (typeof id !== undefined) {
      const episode = episodes.find((episode: Episode) => episode.id === id)
      selectEpisode()
    }
  }
}
