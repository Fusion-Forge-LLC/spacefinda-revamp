import { MessageSquareMore } from 'lucide-react'
import EmptyState from '@/components/host/empty-state'

export default function Page() {
  return (
    <EmptyState
      icon={MessageSquareMore}
      className='flex-1 justify-center bg-gray-50/50'
      title='Select a conversation'
      description='Pick a renter on the left to read and reply to their messages.'
    />
  )
}
