import Paper from 'components/paper'
import styles from './episodes.module.css'
import { useCallback, useContext, useEffect, useState } from 'react'
import { Episode } from './types'
import { storeCtx } from 'app/api'
import Button from './button'
import { useApi } from 'app/api/hooks/api'
import { RESULTS_LIMIT } from 'app/api/constants'
import { useInfiniteScroll } from 'components/infinite-scroll/hooks'

export default function Episodes() {
  // const [lastElement, setLastElement] = useState<HTMLLIElement | null>(null)
  // const [loadNext, setLoadNext] = useState<boolean>(false)
  // const [observer, setObserver] = useState<IntersectionObserver | null>(null)
  const {
    episodes,
    episodesCount,
    episodesPage,
  } = useContext(storeCtx)
  const TOTAL_PAGES = Math.ceil(episodesCount / RESULTS_LIMIT)
  const { loadEpisodes } = useApi()
  const getNextEpisodes = () => {
    if (episodesPage < TOTAL_PAGES) {
      loadEpisodes()
    }
  }
  const { setLastElement } = useInfiniteScroll({
    callback: getNextEpisodes,
  })
  // useEffect(() => {
  //   if (typeof window !== undefined) {
  //     const observer = new IntersectionObserver(
  //       ([entry]) => {
  //         if (entry.isIntersecting) {
  //           setLoadNext(true)
  //         }
  //       }
  //     )

  //     setObserver(observer)
  //   }
  // }, [])

  // const _getNextEpisodes = useCallback(() => {
  //   if (episodesPage < TOTAL_PAGES && loadNext) {
  //     setLoadNext(false)
  //     loadEpisodes()
  //   }
  // }, [episodesPage, loadEpisodes, loadNext, TOTAL_PAGES])

  // useEffect(() => {
  //   getNextEpisodes()
  // }, [getNextEpisodes, TOTAL_PAGES])

  // useEffect(() => {
  //   if (!observer) return

  //   if (lastElement) {
  //     observer?.observe(lastElement)
  //   }

  //   return () => {
  //     if (lastElement) {
  //       observer?.unobserve(lastElement)
  //     }
  //   }
  // }, [lastElement, observer])

  // I am displaying the list as an ordered list (ol)
  // so that the list items (li) can have "value" attributes

  return (
    <Paper className={styles.sidebar}>
      <nav>
        <h2>Episodes</h2>
        <ol className={styles.episodes}>
          {episodes.map((episode: Episode) => (
            <Button
              key={`episode-${episode.id}`}
              id={episode.id}
              name={episode.name}
              cbRef={(ref: HTMLLIElement) => setLastElement(ref)}
            />
          ))}
        </ol>
      </nav>
    </Paper>
  )
}
