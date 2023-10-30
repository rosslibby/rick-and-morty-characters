import { ReactNode } from 'react'
import styles from './paper.module.css'

export default function Paper({ children, className }: {
  children: ReactNode
  className?: string
}) {
  const classname = className
    ? `${styles.paper} ${className}`
    : styles.paper
  return (
    <div className={classname}>
      {children}
    </div>
  )
}
