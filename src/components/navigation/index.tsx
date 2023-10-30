'use client'

import { ReactNode, createContext, useState } from 'react'
import { Navigation, SelectedEpisode } from './types'
import { Episode } from 'components/episodes/types'
import { Character } from 'components/characters/types'

export const navigationCtx = createContext<Navigation>({
  episodes: [],
  episode: null,
  _: {},
})

export default function Navigation({ children }: {
  children: ReactNode
}) {
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [characters, setCharacters] = useState<Character[]>([])
  const [episode, setEpisode] = useState<SelectedEpisode | null>(null)

  return (
    <navigationCtx.Provider value={{
      episodes,
      episode,
      _: {
        selectEpisode: setEpisode,
      }
    }}>
      {children}
    </navigationCtx.Provider>
  )
}
