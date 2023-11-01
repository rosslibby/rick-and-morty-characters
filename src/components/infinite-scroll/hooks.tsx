import { useCallback, useEffect, useState } from 'react'

type Props = {
  callback: Function
}

export const useInfiniteScroll = ({ callback }: Props) => {
  const [lastElement, setLastElement] = useState<HTMLElement | null>(null)
  const [loadNext, setLoadNext] = useState<boolean>(false)
  const [observer, setObserver] = useState<IntersectionObserver | null>(null)

  useEffect(() => {
    if (typeof window !== undefined) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setLoadNext(true)
          }
        }
      )

      setObserver(observer)
    }
  }, [])

  const getNext = useCallback(() => {
    if (loadNext) {
      setLoadNext(false)
      callback()
    }
  }, [callback, loadNext])

  useEffect(() => {
    getNext()
  }, [getNext])

  useEffect(() => {
    if (!observer) return

    if (lastElement) {
      observer?.observe(lastElement)
    }

    return () => {
      if (lastElement) {
        observer?.unobserve(lastElement)
      }
    }
  }, [lastElement, observer])

  return {
    setLastElement,
  }
}
