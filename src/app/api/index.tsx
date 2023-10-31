'use client'

import { ReactNode, createContext, useState } from 'react'
import { Store } from './types'
import { Episode } from 'components/episodes/types'
import { Character } from 'components/characters/types'

export const storeCtx = createContext<Store>({
  characters: [],
  episodesCount: 0,
  episodes: [],
  episode: null,
  loading: false,
  charactersPage: 0,
  episodesPage: 0,
  _: {},
})

export default function Api({ children }: {
  children: ReactNode
}) {
  const [loading, setLoading] = useState<boolean>(false)
  const [episodesCount, setEpisodesCount] = useState<number>(0)
  const [episodesPage, setEpisodesPage] = useState<number>(0)
  const [charactersPage, setCharactersPage] = useState<number>(0)
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [characters, setCharacters] = useState<Character[]>([])
  const [episode, setEpisode] = useState<Episode | null>(null)

  return (
    <storeCtx.Provider value={{
      characters,
      episodesCount,
      episodes,
      episode,
      loading,
      charactersPage,
      episodesPage,
      _: {
        selectEpisode: setEpisode,
        setCharacters,
        setEpisodes,
        setEpisodesCount,
        setLoading,
        setCharactersPage,
        setEpisodesPage,
      }
    }}>
      {children}
    </storeCtx.Provider>
  )
}
