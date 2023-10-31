import Paper from 'components/paper'
import styles from './episodes.module.css'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Episode } from './types'
import { storeCtx } from 'app/api'
import Button from './button'
import { useApi } from 'app/api/hooks/api'
import { RESULTS_LIMIT } from 'app/api/constants'

export default function Episodes() {
  const [lastElement, setLastElement] = useState<HTMLLIElement | null>(null)
  const containerRef = useRef<HTMLOListElement>(null)
  const boundaryRef = useRef<HTMLLIElement>(null)
  const [loadNext, setLoadNext] = useState<boolean>(false)
  const [observer, setObserver] = useState<IntersectionObserver | null>(null)
  const {
    episodes,
    episodesCount,
    episodesPage,
    _: {
      setEpisodesPage,
    } } = useContext(storeCtx)
  const TOTAL_PAGES = Math.ceil(episodesCount / RESULTS_LIMIT)
  const { loadEpisodes } = useApi()
  useEffect(() => {
    if (typeof window === undefined) {
      console.log('no window')
      return
    }
    else {
      console.log('we got window')
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setLoadNext(true)
            // setEpisodesPage((page: number) => page + 1)
          }
        }
      )

      setObserver(observer)
    }
  }, [setEpisodesPage, setObserver])

  const getNextEpisodes = useCallback(() => {
    console.log(episodesPage, TOTAL_PAGES)
    if (episodesPage < TOTAL_PAGES && loadNext) {
      setLoadNext(false)
      loadEpisodes()
    }
  }, [episodesPage, loadEpisodes, loadNext, TOTAL_PAGES])

  useEffect(() => {
    getNextEpisodes()
  }, [getNextEpisodes, TOTAL_PAGES])

  useEffect(() => {
    if (!observer) return
    const currentElement = lastElement
    const currentObserver = observer

    if (currentElement) {
      console.log('observing', currentElement)
      currentObserver?.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        currentObserver?.unobserve(currentElement)
      }
    }
  }, [lastElement, observer])

  // I am displaying the list as an ordered list (ol)
  // so that the list items (li) can have "value" attributes

  return (
    <Paper className={styles.sidebar}>
      <nav>
        <h2>Episodes</h2>
        <ol className={styles.episodes} ref={containerRef}>
          {episodes.map((episode: Episode) => (
            <Button
              key={`episode-${episode.id}`}
              id={episode.id}
              name={episode.name}
              cbRef={(ref: HTMLLIElement) => setLastElement(ref)}
            />
          ))}
          <li className={styles.boundary} ref={boundaryRef} />
        </ol>
      </nav>
    </Paper>
  )
}
