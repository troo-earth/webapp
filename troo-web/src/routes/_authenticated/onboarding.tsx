import { OnboardingPage } from '@/pages/auth/OnboardingPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/onboarding')({
    component: () => <OnboardingPage/>,
})