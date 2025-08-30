import { NextResponse } from 'next/server';
import { query } from '../../../lib/db-es';

export async function GET() {
  try {
    // Simple health check query
    const result = await query('SELECT 1 as test');
    
    return NextResponse.json({ 
      status: 'Database connected successfully',
      timestamp: new Date().toISOString(),
      test: result[0]
    });
  } catch (error) {
    console.error('Database health check failed:', error);
    
    return NextResponse.json({ 
      status: 'Database connection failed',
      error: error.message,
      code: error.code,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
