import { NextResponse } from 'next/server'
import { ENDPOINT } from '../../constants'
import { NextApiRequest } from 'next'

export async function GET(request: NextApiRequest) {
  const { id } = request.query

  try {
    const response = await (await fetch(`${ENDPOINT}/episode/${id}`)).json()

    return NextResponse.json(
      response,
      {
        status: 200,
      },
    )
  } catch(err) {
    console.error('There was a problem fetching episodes:', err)

    return NextResponse.error()
  }
}
