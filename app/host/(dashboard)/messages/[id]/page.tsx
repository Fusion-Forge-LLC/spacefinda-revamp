import { notFound } from 'next/navigation'
import ConversationThread from '@/components/host/messages/conversation-thread'
import { DUMMY_CONVERSATIONS } from '@/lib/dummy'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const conversation = DUMMY_CONVERSATIONS.find((c) => c.id === id)

  if (!conversation) notFound()

  // Keyed so switching conversations resets the thread's local messages and draft
  return <ConversationThread key={conversation.id} conversation={conversation} />
}
