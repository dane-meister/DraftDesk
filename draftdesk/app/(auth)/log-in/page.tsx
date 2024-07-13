'use client'
import LandingPage from "@/components/LandingPage";
import LogIn from "@/components/LogIn";
import { useRouter } from 'next/navigation';

const Page: React.FC = () => {
    const router = useRouter();

    function handleLogin(): void {
        router.push('/projects');
    }

    function handleCreateAccount(): void {
        router.push('/register');
    }

  return (
    <LogIn onLogin={handleLogin} createAccountClicked={handleCreateAccount} />
  );
};

export default Page;