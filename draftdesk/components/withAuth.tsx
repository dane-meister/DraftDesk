import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { getToken } from '@/utils/auth';

const withAuth = (WrappedComponent: React.FC) => {
  const WithAuthComponent: React.FC = (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const token = getToken();

      const checkAuthentication = async () => {
        console.log("Auth token", token);
        if (token) {
          try {
            const response = await axios.get('http://localhost:5000/verifyToken', {
              headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 200) {
              setIsAuthenticated(true);
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
    }, [router]);

    if (loading) {
      return <div>Loading...</div>;
    }

    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  return WithAuthComponent;
};

export default withAuth;
