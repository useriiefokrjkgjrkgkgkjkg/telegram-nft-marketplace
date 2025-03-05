import { NextResponse } from 'next/server'

export async function GET() {
  // Здесь будет логика получения подарков
  return NextResponse.json({
    gifts: [
      {
        id: 1,
        title: 'Desk Calendar',
        price: 0.55,
        image: '/images/calendar1.jpg',
        isListed: true
      },
      {
        id: 2,
        title: 'Wall Calendar',
        price: 0.75,
        image: '/images/calendar2.jpg',
        isListed: false
      }
    ]
  })
}

export async function POST(request: Request) {
  const data = await request.json()
  
  // Здесь будет логика создания нового подарка
  return NextResponse.json({
    success: true,
    gift: {
      id: Math.random(),
      ...data
    }
  })
} 