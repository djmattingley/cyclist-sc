import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import RaceCalendar from '@/components/RaceCalendar'

export default async function RaceCalendarPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data } = await supabase
    .from('user_settings')
    .select('race_date')
    .eq('user_id', user.id)
    .single()

  return <RaceCalendar userId={user.id} initialRaceDate={data?.race_date ?? null} />
}
