import Paper from 'components/paper'
import styles from './episodes.module.css'
import { useContext } from 'react'
import { Episode } from './types'
import { storeCtx } from 'app/api'
import Button from './button'

export default function Episodes() {
  const { episodes } = useContext(storeCtx)

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
            />
          ))}
        </ol>
      </nav>
    </Paper>
  )
}
