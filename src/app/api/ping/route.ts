import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json({
      status: 'success',
      message: 'pong',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error in ping endpoint:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
