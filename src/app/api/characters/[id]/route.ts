import { NextRequest, NextResponse } from 'next/server'
import { ENDPOINT } from '../../constants'

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  const page = request.nextUrl.searchParams.get('page')
  console.log('ID:', id, 'Page:', page)

  try {
    const response = await (
      await fetch(`${ENDPOINT}/character/${id}/?page=${page || 1}`)
    ).json()

    return NextResponse.json(
      {
        characters: Array.isArray(response)
          ? response
          : [response],
      },
      {
        status: 200,
      },
    )
  } catch(err) {
    console.error(`There was a problem fetching character ${id}:`, err)

    return NextResponse.error()
  }
}
