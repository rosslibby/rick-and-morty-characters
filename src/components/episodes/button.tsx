import { LegacyRef, MouseEvent, useContext } from 'react'
import styles from './episodes.module.css'
import { storeCtx } from 'app/api'
import { useNavigation } from 'app/api/hooks/navigation'

export default function Button({ cbRef, id, name }: {
  cbRef: LegacyRef<HTMLLIElement>
  id: number
  name: string
}) {
  const { toggleSelect } = useNavigation()
  const handleEpisodeClick = (e: MouseEvent<HTMLLIElement>) => {
    toggleSelect((e.target as HTMLLIElement).value)
  }

  return (
    <li
      className={styles.episode}
      onClick={handleEpisodeClick}
      ref={cbRef}
      tabIndex={0}
      value={id}
    >{name}</li>
  )
}
