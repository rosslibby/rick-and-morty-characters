import { NextResponse } from 'next/server'
import { ENDPOINT } from '../../constants'
import { NextApiRequest } from 'next'

export async function GET(request: NextApiRequest) {
  const { id, page } = request.query

  try {
    const response = await (await fetch(`${ENDPOINT}/character/${id}/?page=${page || 1}`)).json()

    return NextResponse.json(
      response.results,
      {
        status: 200,
      },
    )
  } catch(err) {
    console.error(`There was a problem fetching character ${id}:`, err)

    return NextResponse.error()
  }
}
