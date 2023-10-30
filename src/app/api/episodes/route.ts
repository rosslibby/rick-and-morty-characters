import { NextResponse } from 'next/server'
import { ENDPOINT } from '../constants'

export async function GET(request: Request) {
  try {
    const response = await (await fetch(`${ENDPOINT}/episode`)).json()

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
