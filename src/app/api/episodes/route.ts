import { NextRequest, NextResponse } from 'next/server'
import { ENDPOINT } from '../constants'

export async function GET(request: NextRequest) {
  const page = request.nextUrl.searchParams.get('page')

  try {
    const response = await (await fetch(`${ENDPOINT}/episode?page=${page || 1}`)).json()

    return NextResponse.json(
      response.results,
      {
        status: 200,
      },
    )
  } catch(err) {
    console.error('There was a problem fetching episodes:', err)

    return NextResponse.error()
  }
}
