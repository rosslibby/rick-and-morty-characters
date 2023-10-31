import { MouseEvent, useContext } from 'react'
import styles from './episodes.module.css'
import { storeCtx } from 'app/api'
import { useNavigation } from 'app/api/hooks/navigation'

export default function Button({ id, name }: {
  id: number
  name: string
}) {
  const { episode, _: { selectEpisode }} = useContext(storeCtx)
  const { toggleSelect } = useNavigation()
  const handleEpisodeClick = (e: MouseEvent<HTMLLIElement>) => {
    toggleSelect((e.target as HTMLLIElement).value)
  }

  return (
    <li
      className={styles.episode}
      onClick={handleEpisodeClick}
      tabIndex={0}
      value={id}
    >{name}</li>
  )
}
