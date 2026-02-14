import { LoginModal } from "../../features/auth/components/login/LoginModal";
import AuthFooter from '../../features/auth/components/shared/AuthFooter';
import AuthHeader from '../../features/auth/components/shared/AuthHeader';
import BgGradient from '@/components/ui/global/BgGradient';
import { LoginDecorative } from '../../features/auth/components/login/LoginDecorative';
import type React from "react";
import { useState } from "react";
import LoadingScreen from "@/components/global/Loading";
import InviteModal from "@/shared/invitations/components/InviteModal";
import { Route } from "@/routes/(public)/login";
import { useInviteFlow } from "@/shared/invitations/hooks/useInviteFlow";

export const LoginPage: React.FC = () => {

  const inviteData = Route.useLoaderData();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const { clearInvite } = useInviteFlow();

  const invitedEmail = inviteData?.data?.valid ? inviteData.data.email : undefined;

  if(isLoggingIn) {
    return <LoadingScreen/>
  }


  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#FDFDFD] font-nunito">
      
     <BgGradient variant='primary'/> 
     <AuthHeader/>

      <div className="relative z-10 w-full max-w-350 px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center grow">
        
        <LoginDecorative/>

        <div className="col-span-1 lg:col-span-7 flex justify-center lg:justify-end h-full items-center">
          <LoginModal onPendingChange={setIsLoggingIn} prefilledEmail={invitedEmail} onDismissInvite={clearInvite}/>
        </div>
      </div>

      <AuthFooter/>
      <InviteModal data={inviteData} />

      <style>{`
        .animate-bounce-slow {
            animation: bounce-slow 4s infinite;
        }
        .animate-bounce-delayed {
            animation: bounce-slow 4.5s infinite;
            animation-delay: 1.2s;
        }
        @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};