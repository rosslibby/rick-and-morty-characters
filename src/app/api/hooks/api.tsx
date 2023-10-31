import { useCallback, useContext, useState } from 'react'
import { storeCtx } from '..'
import { Episode } from 'components/episodes/types'
import { Character } from 'components/characters/types'

export const useApi = () => {
  const [currentEpisode, setCurrentEpisode] = useState<number>(0)
  const {
    characters,
    charactersPage,
    episode,
    episodesPage,
    _: {
      setCharacters,
      setCharactersCount,
      setCharactersLoading,
      setEpisodes,
      setEpisodesCount,
      setEpisodesLoading,
      setCharactersPage,
      setEpisodesPage,
    }} = useContext(storeCtx)

  const loadEpisodes = useCallback(async () => {
    setEpisodesLoading(true)

    const { count, episodes: result } = await (
      await fetch(`/api/episodes/?page=${episodesPage + 1}`)
    ).json()
    
    setEpisodes((episodes: Episode[]) => [...episodes, ...result])
    setEpisodesCount(count)

    setEpisodesPage((page: number) => page + 1)

    setEpisodesLoading(false)
  }, [
    episodesPage,
    setEpisodes,
    setEpisodesCount,
    setEpisodesPage,
    setEpisodesLoading,
  ])

  const resetCharacters = useCallback(async () => {
    setCharactersLoading(true)

    const result = await (
      await fetch('/api/characters')
    ).json()

    setCharacters(result)
    setCharactersLoading(false)
  }, [setCharacters, setCharactersLoading])

  const loadCharacters = useCallback(async (characterIDs: number[] = []) => {
    setCharactersLoading(true)

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

    const endpoint = newCharacters.length
      ? `/api/characters/${newCharacters?.join(',')}`
      : `/api/characters`
    const queryPage = episode?.id === currentEpisode
      ? charactersPage + 1
      : 1
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
    setCharactersCount(newCharacters.length)
    setCharactersPage(queryPage + 1)
    if (episode && currentEpisode !== episode.id) {
      setCurrentEpisode(episode.id)
    }
    setCharactersLoading(false)
  }, [
    characters,
    charactersPage,
    currentEpisode,
    episode,
    setCharacters,
    setCharactersCount,
    setCharactersPage,
    setCharactersLoading,
  ])

  return {
    loadCharacters,
    loadEpisodes,
    resetCharacters,
    setCurrentEpisode,
  }
}
