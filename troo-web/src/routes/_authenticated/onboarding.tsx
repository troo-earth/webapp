import { OnboardingPage } from '@/features/auth/components/register/onboard/OnboardingPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/onboarding')({
    component: () => <OnboardingPage/>,
})