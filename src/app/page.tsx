'use client'

import Image from 'next/image'
import styles from './page.module.css'
import Episodes from 'components/episodes'

export default function Home() {

  return (
    <main className={styles.main}>
      <Episodes />
    </main>
  )
}
