'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import axios from 'axios';
import { setToken, getToken, removeToken } from '@/utils/auth';
import withAuth from '@/components/withAuth';
import { Project } from '@/server/models';

const Home: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();

    const checkAuthentication = async () => {
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/verifyToken', {
            headers: { Authorization: `Bearer ${token}` }
          });

          if (response.status === 200) {
            setIsAuthenticated(true);
            if (pathname === '/') {
              router.push('/projects');
            }
          } else {
            setIsAuthenticated(false);
            router.push('/log-in');
          }
        } catch (error) {
          setIsAuthenticated(false);
          router.push('/log-in');
        }
      } else {
        setIsAuthenticated(false);
        router.push('/log-in');
      }

      setLoading(false);
    };

    checkAuthentication();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <main className="relative">
      <div>

      </div>
    </main>
  );
};

export default withAuth(Home);


