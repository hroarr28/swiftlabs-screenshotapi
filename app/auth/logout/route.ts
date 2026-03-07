import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = await createClient()
  
  // Sign out from Supabase
  await supabase.auth.signOut()
  
  // Redirect to home page
  const { origin } = new URL(request.url)
  return NextResponse.redirect(`${origin}/?message=Logged out successfully`)
}

// Also support GET for direct link access
export async function GET(request: Request) {
  const supabase = await createClient()
  
  // Sign out from Supabase
  await supabase.auth.signOut()
  
  // Redirect to home page
  const { origin } = new URL(request.url)
  return NextResponse.redirect(`${origin}/?message=Logged out successfully`)
}
