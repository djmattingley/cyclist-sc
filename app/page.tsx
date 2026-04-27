import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ProgramApp from '@/components/ProgramApp'
import type { UserSettings, UserProgress } from '@/lib/types'

export default async function HomePage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [settingsRes, progressRes] = await Promise.all([
    supabase.from('user_settings').select('*').eq('user_id', user.id).single(),
    supabase.from('user_progress').select('*').eq('user_id', user.id),
  ])

  const initialSettings = (settingsRes.data ?? null) as UserSettings | null
  const initialProgress = (progressRes.data ?? []) as UserProgress[]

  return (
    <ProgramApp
      user={user}
      initialSettings={initialSettings}
      initialProgress={initialProgress}
    />
  )
}
