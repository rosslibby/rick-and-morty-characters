import Paper from 'components/paper'
import styles from './episodes.module.css'
import { MouseEvent, useContext } from 'react'
import { Episode } from './types'
import { storeCtx } from 'app/api'

export default function Episodes() {
  const { episode, episodes, _: { selectEpisode } } = useContext(storeCtx)
  const handleEpisodeClick = (e: MouseEvent<HTMLLIElement>) => {
    const { value: selectedId } = e.target as HTMLLIElement
    if (episode?.id === selectedId) {
      selectEpisode(null)
    } else {
      selectEpisode()
    }
  }

  // I am displaying the list as an ordered list (ol)
  // so that the list items (li) can have "value" attributes

  return (
    <Paper className={styles.sidebar}>
      <nav>
        <h2>Episodes</h2>
        <ol>
          {episodes.map((episode: Episode) => (
            <li
              key={`episode-${episode.id}`}
              value={episode.id}
            >{episode.name}</li>
          ))}
        </ol>
      </nav>
    </Paper>
  )
}
