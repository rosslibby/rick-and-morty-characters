'use client'

import styles from './page.module.css'
import Episodes from 'components/episodes'
import Characters from 'components/characters'
import { useCallback, useContext, useEffect } from 'react'
import { storeCtx } from './api'
import { useApi } from './api/hooks/api'

export default function Home() {
  const {
    characters,
    charactersLoading,
    episodes,
    episodesLoading,
  } = useContext(storeCtx)
  const { loadCharacters, loadEpisodes } = useApi()
  const init = useCallback(() => {
    if (!characters.length && !episodes.length && !charactersLoading && !episodesLoading) {
      loadCharacters()
      loadEpisodes()
    }
  }, [
    characters,
    charactersLoading,
    episodes,
    episodesLoading,
    loadCharacters,
    loadEpisodes,
  ])

  useEffect(() => {
    if (!characters.length && !episodes.length && !charactersLoading && !episodesLoading) {
      init()
    }
  }, [characters, episodes, init, charactersLoading, episodesLoading])

  return (
    <main className={styles.main}>
      <Episodes />
      <Characters />
    </main>
  )
}
