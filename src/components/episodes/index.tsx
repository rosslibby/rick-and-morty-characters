import Paper from 'components/paper'
import styles from './episodes.module.css'
import { MouseEvent, useContext } from 'react'
import { navigationCtx } from 'components/navigation'
import { Episode } from './types'

export default function Episodes() {
  const { episode, episodes, _: { selectEpisode } } = useContext(navigationCtx)
  const handleEpisodeClick = (e: MouseEvent<HTMLLIElement>) => {

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
