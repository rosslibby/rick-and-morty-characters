import Paper from 'components/paper'
import styles from './episodes.module.css'
import { useCallback, useContext, useState } from 'react'
import { Episode } from './types'
import { storeCtx } from 'app/api'
import Button from './button'
import { useApi } from 'app/api/hooks/api'
import { RESULTS_LIMIT } from 'app/api/constants'
import { useInfiniteScroll } from 'components/infinite-scroll/hooks'
import Loading from 'components/loading'

export default function Episodes() {
  const [selected, setSelected] = useState<number>(-1)
  const {
    episodes,
    episodesCount,
    episodesLoading,
    episodesPage,
  } = useContext(storeCtx)
  const TOTAL_PAGES = Math.ceil(episodesCount / RESULTS_LIMIT)
  const { loadEpisodes } = useApi()
  const getNextEpisodes = useCallback(() => {
    if (episodesPage < TOTAL_PAGES) {
      loadEpisodes()
    }
  }, [episodesPage, loadEpisodes, TOTAL_PAGES])
  const { setLastElement } = useInfiniteScroll({
    callback: getNextEpisodes,
  })

  return (
    <Paper className={styles.sidebar}>
      <nav>
        <h2>Episodes</h2>
        <ul className={styles.episodes}>
          {episodes.map((episode: Episode) => (
            <Button
              cbRef={(ref: HTMLLIElement) => setLastElement(ref)}
              id={episode.id}
              key={`episode-${episode.id}`}
              name={episode.name}
              handleClick={setSelected}
              selected={episode.id === selected}
            />
          ))}
          {episodesLoading && !episodes.length && (
            <Loading />
          )}
        </ul>
      </nav>
    </Paper>
  )
}
