import { NextResponse } from 'next/server'
import { ENDPOINT } from '../constants'

export async function GET(request: Request) {
  try {
    const response = await (await fetch(`${ENDPOINT}/character`)).json()

    return NextResponse.json(
      {
        characters: response.results,
      },
      {
        status: 200,
      },
    )
  } catch(err) {
    console.error('There was a problem fetching characters:', err)

    return NextResponse.error()
  }
}
