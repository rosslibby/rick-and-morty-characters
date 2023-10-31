import { useCallback, useContext } from 'react'
import { storeCtx } from '..'
import { Episode } from 'components/episodes/types'
import { Character } from 'components/characters/types'

export const useApi = () => {
  const {
    characters,
    charactersPage,
    episodesPage,
    _: {
      setCharacters,
      setEpisodes,
      setEpisodesCount,
      setLoading,
      setCharactersPage,
      setEpisodesPage,
    }} = useContext(storeCtx)

  const loadEpisodes = useCallback(async () => {
    setLoading(true)

    const { count, episodes: result } = await (
      await fetch(`/api/episodes/?page=${episodesPage + 1}`)
    ).json()
    
    setEpisodes((episodes: Episode[]) => [...episodes, ...result])
    setEpisodesCount(count)

    setEpisodesPage((page: number) => page + 1)

    setLoading(false)
  }, [
    episodesPage,
    setEpisodes,
    setEpisodesCount,
    setEpisodesPage,
    setLoading,
  ])

  const resetCharacters = useCallback(async () => {
    setLoading(true)

    const result = await (
      await fetch('/api/characters')
    ).json()

    setCharacters(result)
    setLoading(false)
  }, [setCharacters, setLoading])

  const loadCharacters = useCallback(async (characterIDs: number[] = [], page?: number) => {
    setLoading(true)

    // Get IDs of characters that are already loaded
    const existingCharacters = characters.map(
      (character: Character) => character.id
    )
    // Get IDs of all characters in selected episode
    const episodeCharacters = [
      ...(new Set([
        ...existingCharacters.filter(
          (characterId: number) => characterIDs.includes(characterId)
        ),
        ...characterIDs,
      ]))
    ]

    // Compile IDs of characters that should be removed for
    // the selected episode
    const removeCharacters = existingCharacters.filter(
      (characterId: number) => !episodeCharacters?.includes(characterId)
    )

    // Compile IDs of characters that need to be fetched
    const newCharacters = characterIDs.filter(
      (characterId: number) => !existingCharacters.includes(characterId)
    )

    const queryPage = page || charactersPage + 1
    const endpoint = newCharacters.length
      ? `/api/characters/${newCharacters?.join(',')}`
      : `/api/characters`
    const { characters: result } = await (
      await fetch(`${endpoint}/?page=${queryPage}`)
    ).json()

    setCharacters(
      (characters: Character[]) => [
        ...characters.filter(
          (character: Character) => !removeCharacters.includes(character.id)
        ),
        ...result,
      ]
    )
    setCharactersPage(page)
    setLoading(false)
  }, [
    characters,
    charactersPage,
    setCharacters,
    setCharactersPage,
    setLoading,
  ])

  return {
    loadCharacters,
    loadEpisodes,
    resetCharacters,
  }
}
