import { FocusEvent, LegacyRef, MouseEvent, useState } from 'react'
import styles from './episodes.module.css'
import { useNavigation } from 'app/api/hooks/navigation'

export default function Button({ cbRef, handleClick, id, name, selected }: {
  cbRef: LegacyRef<HTMLLIElement>
  handleClick: Function
  id: number
  name: string
  selected: boolean
}) {
  const className = selected
    ? `${styles.episode} ${styles.episode}--active`
    : styles.episode
  const [clicked, setClicked] = useState<boolean>(false)
  const { toggleSelect } = useNavigation()
  const handleEpisodeClick = (e: MouseEvent<HTMLLIElement>) => {
    if (!selected) {
      toggleSelect(id)
      handleClick(id)
    }
  }
  const handleBlur = (e: FocusEvent<HTMLLIElement>) => {
    if (selected) toggleSelect()
  }

  return (
    <li
      className={className}
      onClick={handleEpisodeClick}
      onBlur={handleBlur}
      ref={cbRef}
      tabIndex={0}
    >{name}</li>
  )
}
