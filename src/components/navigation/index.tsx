'use client'

import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { Navigation, SelectedEpisode } from './types'
import { Episode } from 'components/episodes/types'
import { Character } from 'components/characters/types'

export const navigationCtx = createContext<Navigation>({
  characters: [],
  episodes: [],
  episode: null,
  loading: false,
  _: {},
})

export default function Navigation({ children }: {
  children: ReactNode
}) {
  const [loading, setLoading] = useState<boolean>(false)
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [characters, setCharacters] = useState<Character[]>([])
  const [episode, setEpisode] = useState<SelectedEpisode | null>(null)

  // load initial data (characters and episodes)
  const init = useCallback(async () => {
    setLoading(true)

    if (!characters.length) {
      const result = await (await fetch('/api/characters')).json()
      setCharacters(result)
    }

    if (!episodes.length) {
      const result = await (await fetch('/api/episodes')).json()
      setEpisodes(result)
    }

    setLoading(false)
  }, [characters, episodes])

  useEffect(() => {
    if ((!characters.length || !episodes.length) && !loading) {
      init()
    }
  }, [characters, episodes, init, loading])

  return (
    <navigationCtx.Provider value={{
      characters,
      episodes,
      episode,
      loading,
      _: {
        selectEpisode: setEpisode,
      }
    }}>
      {children}
    </navigationCtx.Provider>
  )
}
