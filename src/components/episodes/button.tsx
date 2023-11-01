import { LegacyRef, MouseEvent, memo } from 'react'
import styles from './episodes.module.css'
import { useNavigation } from 'app/api/hooks/navigation'

function Button({ cbRef, handleClick, id, name, selected }: {
  cbRef: LegacyRef<HTMLLIElement>
  handleClick: Function
  id: number
  name: string
  selected: boolean
}) {
  const className = selected
    ? `${styles.episode} ${styles['episode--active']}`
    : styles.episode
  const { toggleSelect } = useNavigation()
  const handleEpisodeClick = (e: MouseEvent<HTMLLIElement>) => {
    if (!selected) {
      toggleSelect(id)
      handleClick(id)
    } else {
      handleClick(-1)
      toggleSelect()
    }
  }

  return (
    <li
      className={className}
      onClick={handleEpisodeClick}
      ref={cbRef}
      tabIndex={0}
    >{name}</li>
  )
}

export default memo(Button)
