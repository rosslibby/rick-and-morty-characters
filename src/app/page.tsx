'use client'

import styles from './page.module.css'
import Episodes from 'components/episodes'
import Characters from 'components/characters'
import { useCallback, useContext, useEffect } from 'react'
import { storeCtx } from './api'
import { useApi } from './api/hooks/api'

export default function Home() {
  const { characters, episodes, loading } = useContext(storeCtx)
  const { loadCharacters, loadEpisodes } = useApi()
  const init = useCallback(() => {
    if (!characters.length && !episodes.length && !loading) {
      loadCharacters()
      loadEpisodes()
    }
  }, [characters, episodes, loading, loadCharacters, loadEpisodes])

  useEffect(() => {
    if (!characters.length && !episodes.length && !loading) {
      init()
    }
  }, [characters, episodes, init, loading])

  return (
    <main className={styles.main}>
      <Episodes />
      <Characters />
    </main>
  )
}
