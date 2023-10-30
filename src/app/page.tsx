'use client'

import Image from 'next/image'
import styles from './page.module.css'
import Episodes from 'components/episodes'
import Characters from 'components/characters'

export default function Home() {

  return (
    <main className={styles.main}>
      <Episodes />
      <Characters />
    </main>
  )
}
