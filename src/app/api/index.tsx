'use client'

import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { Store } from './types'
import { Episode } from 'components/episodes/types'
import { Character } from 'components/characters/types'

export const storeCtx = createContext<Store>({
  characters: [],
  episodes: [],
  episode: null,
  loading: false,
  _: {},
})

export default function Api({ children }: {
  children: ReactNode
}) {
  const [loading, setLoading] = useState<boolean>(false)
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [characters, setCharacters] = useState<Character[]>([])
  const [episode, setEpisode] = useState<Episode | null>(null)

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
    <storeCtx.Provider value={{
      characters,
      episodes,
      episode,
      loading,
      _: {
        selectEpisode: setEpisode,
        setLoading,
      }
    }}>
      {children}
    </storeCtx.Provider>
  )
}
