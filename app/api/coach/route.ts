import { createClient } from '@/lib/supabase/server'
import { SC_SYSTEM_PROMPT } from '@/lib/program-data'

export async function POST(req: Request) {
  // Auth check — only signed-in users can call this
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({
      text: [
        'VERDICT: GO AS PLANNED',
        'CHANGES: None — proceed as planned',
        'REASON: AI coach not yet configured. Add ANTHROPIC_API_KEY to your environment variables to enable coaching.',
        'COACH NOTE: Log your session data now — coaching responses will appear automatically once the API key is set.',
      ].join('\n'),
    })
  }

  const { messages } = await req.json() as { messages: { role: string; content: string }[] }

  // Phase 4 will replace this stub with the real Anthropic SDK call
  // See README Phase 4 for implementation details
  const { default: Anthropic } = await import('@anthropic-ai/sdk')
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

  const response = await client.messages.create({
    model: 'claude-haiku-4-5',
    max_tokens: 1024,
    system: SC_SYSTEM_PROMPT,
    messages: messages as { role: 'user' | 'assistant'; content: string }[],
  })

  const text = response.content[0].type === 'text' ? response.content[0].text : ''
  return Response.json({ text })
}
