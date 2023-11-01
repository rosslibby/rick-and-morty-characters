'use client'

import { ReactNode, createContext, useState } from 'react'
import { Store } from './types'
import { Episode } from 'components/episodes/types'
import { Character } from 'components/characters/types'

export const storeCtx = createContext<Store>({
  characters: [],
  charactersCount: 0,
  charactersLoading: false,
  episodes: [],
  episodesCount: 0,
  episode: null,
  episodesLoading: false,
  charactersPage: 0,
  episodesPage: 0,
  _: {},
})

type Props = {
  children: ReactNode
}

export default function Api({ children }: Props) {
  const [charactersLoading, setCharactersLoading] = useState<boolean>(false)
  const [episodesLoading, setEpisodesLoading] = useState<boolean>(false)
  const [episodesCount, setEpisodesCount] = useState<number>(0)
  const [charactersCount, setCharactersCount] = useState<number>(0)
  const [episodesPage, setEpisodesPage] = useState<number>(0)
  const [charactersPage, setCharactersPage] = useState<number>(0)
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [characters, setCharacters] = useState<Character[]>([])
  const [episode, setEpisode] = useState<Episode | null>(null)

  return (
    <storeCtx.Provider value={{
      characters,
      charactersCount,
      charactersLoading,
      episodes,
      episodesCount,
      episode,
      episodesLoading,
      charactersPage,
      episodesPage,
      _: {
        selectEpisode: setEpisode,
        setCharacters,
        setCharactersCount,
        setCharactersLoading,
        setEpisodes,
        setEpisodesCount,
        setEpisodesLoading,
        setCharactersPage,
        setEpisodesPage,
      }
    }}>
      {children}
    </storeCtx.Provider>
  )
}
