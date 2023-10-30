import Paper from 'components/paper'
import styles from './episodes.module.css'

export default function Episodes() {
  return (
    <Paper className={styles.sidebar}>
      <nav>
        <h2>Episodes</h2>
        <ul>
          <li>Episode 1</li>
          <li>Episode 2</li>
          <li>Episode 3</li>
          <li>Episode 4</li>
          <li>Episode 5</li>
          <li>Episode 6</li>
          <li>Episode 7</li>
          <li>Episode 8</li>
        </ul>
      </nav>
    </Paper>
  )
}
