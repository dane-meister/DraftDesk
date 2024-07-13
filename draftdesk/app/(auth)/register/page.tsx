'use client'
import LandingPage from "@/components/LandingPage";
import Register from "@/components/Register";
import { useRouter } from 'next/navigation';

const Page: React.FC = () => {
    const router = useRouter();
    function handleLogin(): void {
        router.push('/projects');
    }

    function handleLoginClick(): void {
        router.push('/log-in');
    }

  return (
    <Register onLogin={handleLogin} onLoginClicked={handleLoginClick}/>
  );
};

export default Page;
