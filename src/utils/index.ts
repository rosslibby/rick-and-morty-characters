export const getCharacterId = (url: string) => url.match(/\d+/g)?.pop()
