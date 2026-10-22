import VerificationFlow from '@/components/dashboard/verification/verification-flow'
import UnderReview from '@/components/host/verification/under-review'

export default function Page() {
  return (
    // Cancel the dashboard's main padding so the stepper bar runs edge to edge under the topbar
    <div className='-mx-4 -my-6 md:-mx-6 md:-my-8'>
      <VerificationFlow
        exitHref='/host/profile'
        introDescription='SpaceFinda requires identity verification to build trust between you and renters. This is a one-time process and takes about 3 minutes.'
        submittedScreen={<UnderReview />}
      />
    </div>
  )
}
