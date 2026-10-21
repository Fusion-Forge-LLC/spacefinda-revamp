import React from 'react'
import MessagesShell from '@/components/host/messages/messages-shell'
import { DUMMY_CONVERSATIONS } from '@/lib/dummy'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <MessagesShell conversations={DUMMY_CONVERSATIONS}>{children}</MessagesShell>
}
