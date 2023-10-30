import { NextResponse } from 'next/server'
import { ENDPOINT } from '../../constants'
import { NextApiRequest } from 'next'
import { getCharacterId } from 'utils'

export async function GET(request: NextApiRequest) {
  const { id } = request.query

  try {
    const episode = await (await fetch(`${ENDPOINT}/episode/${id}`)).json()
    const characterIDs = episode.characters.map(
      (url: string) => getCharacterId(url)
    )
    const characters = await (
      await fetch(`/api/characters/${characterIDs.join(',')}`)
    ).json()

    return NextResponse.json(
      {
        ...episode,
        characters,
      },
      {
        status: 200,
      },
    )
  } catch(err) {
    console.error(`There was a problem fetching episode ${id}:`, err)

    return NextResponse.error()
  }
}
