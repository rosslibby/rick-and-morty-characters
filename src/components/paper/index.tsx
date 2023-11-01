import { ReactNode } from 'react'
import styles from './paper.module.css'

type Props = {
  children: ReactNode
  className?: string
}

export default function Paper({ children, className }: Props) {
  const classname = className
    ? `${styles.paper} ${className}`
    : styles.paper
  return (
    <div className={classname}>
      {children}
    </div>
  )
}
