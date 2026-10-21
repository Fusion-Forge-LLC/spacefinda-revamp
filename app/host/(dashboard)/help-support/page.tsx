import type { ComponentType } from 'react'
import { Inbox, MessageCircleQuestion, MessageSquareText, Scale } from 'lucide-react'
import SideTabsLayout from '@/components/host/side-tabs-layout'
import ContactSupport from '@/components/host/help/contact-support'
import HostFaqs from '@/components/host/help/host-faqs'
import HostPolicies from '@/components/host/help/host-policies'
import SupportRequests from '@/components/host/help/support-requests'

// No design for this page yet; it follows the account settings layout
const TABS = [
  { value: 'faqs', label: 'FAQs', icon: MessageCircleQuestion, panel: HostFaqs },
  { value: 'contact', label: 'Contact us', icon: MessageSquareText, panel: ContactSupport },
  { value: 'requests', label: 'My requests', icon: Inbox, panel: SupportRequests },
  { value: 'policies', label: 'Host policies', icon: Scale, panel: HostPolicies },
]

export default async function Page({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const { tab } = await searchParams
  const active = TABS.find((t) => t.value === tab) ?? TABS[0]
  const Panel: ComponentType = active.panel

  return (
    <SideTabsLayout
      title='Help & support'
      description='Get help with your listings, bookings and payouts.'
      basePath='/host/help-support'
      tabs={TABS}
      active={active.value}
    >
      <Panel />
    </SideTabsLayout>
  )
}
