import { useCallback, useContext } from 'react'
import { storeCtx } from '..'
import { Episode } from 'components/episodes/types'
import { Character } from 'components/characters/types'

export const useApi = () => {
  const {
    charactersPage,
    episodesPage,
    _: {
      setCharacters,
      setEpisodes,
      setLoading,
      setCharactersPage,
      setEpisodesPage,
    }} = useContext(storeCtx)

  const loadEpisodes = useCallback(async () => {
    setLoading(true)

    const result = await (
      await fetch(`/api/episodes/?page=${episodesPage + 1}`)
    ).json()
    
    setEpisodes((episodes: Episode[]) => [...episodes, ...result])

    setEpisodesPage((page: number) => page + 1)

    setLoading(false)
  }, [episodesPage, setEpisodes, setEpisodesPage, setLoading])

  const loadCharacters = useCallback(async (id?: string) => {
    setLoading(true)

    const endpoint = id ? `/api/characters/${id}` : `/api/characters`
    const result = await (
      await fetch(`${endpoint}/?page=${charactersPage + 1}`)
    ).json()

    setCharacters((characters: Character[]) => [...characters, ...result])

    setCharactersPage((page: number) => page + 1)

    setLoading(false)
  }, [charactersPage, setCharacters, setCharactersPage, setLoading])

  return {
    loadCharacters,
    loadEpisodes,
  }
}
