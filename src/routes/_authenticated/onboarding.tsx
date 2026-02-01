import { OnboardingPage } from '@/pages/auth/OnboardingPage'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/onboarding')({
  beforeLoad: ({ context }) => {
    const user = context?.user;
    if (user?.org_id) {
      throw redirect({
        to: '/explore', 
        replace: true,
      });
    }
  },
  component: () => <OnboardingPage />,
})