export const getCharacterId = (url: string) => Number(
  url.match(/\d+/g)?.pop()
)
