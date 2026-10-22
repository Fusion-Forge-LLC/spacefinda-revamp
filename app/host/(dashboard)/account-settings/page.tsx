import type { ComponentType } from 'react'
import { Bell, CreditCard, Settings, Shield } from 'lucide-react'
import SideTabsLayout from '@/components/host/side-tabs-layout'
import AccountManagement from '@/components/host/settings/account-management'
import NotificationSettings from '@/components/host/settings/notification-settings'
import PayoutSettings from '@/components/host/settings/payout-settings'
import SecuritySettings from '@/components/host/settings/security-settings'

const TABS = [
  { value: 'notification', label: 'Notification', icon: Bell, panel: NotificationSettings },
  { value: 'payout', label: 'Payout', icon: CreditCard, panel: PayoutSettings },
  { value: 'security', label: 'Security', icon: Shield, panel: SecuritySettings },
  { value: 'account', label: 'Account settings', icon: Settings, panel: AccountManagement },
]

export default async function Page({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const { tab } = await searchParams
  const active = TABS.find((t) => t.value === tab) ?? TABS[0]
  const Panel: ComponentType = active.panel

  return (
    <SideTabsLayout
      title='Settings'
      description='Configure your account preferences.'
      basePath='/host/account-settings'
      tabs={TABS}
      active={active.value}
    >
      <Panel />
    </SideTabsLayout>
  )
}
