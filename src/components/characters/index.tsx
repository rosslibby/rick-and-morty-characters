import Paper from 'components/paper'
import Image from 'next/image'
import { useContext } from 'react'
import { Character } from './types'
import styles from './characters.module.css'
import { storeCtx } from 'app/api'
import Loading from 'components/loading'

export default function Characters() {
  const { characters, charactersLoading } = useContext(storeCtx)

  return (
    <Paper className={styles.characters}>
      {!charactersLoading && characters.map((character: Character) => (
        <Image
          key={`character-${character.id}`}
          className={styles.avatar}
          src={character.image}
          alt={character.name}
          height={160}
          width={160}
        />
      ))}
      {charactersLoading && (
        <Loading />
      )}
    </Paper>
  )
}
