import React from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { getLoggedInUserId } from '../../services/auth-service';
import { getSetById } from '../../services/set-service';

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const location = useLocation();
  const { setId } = useParams<{ setId: string }>();
  const userId = getLoggedInUserId();
  
  const [isOwner, setIsOwner] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const fetchSetOwner = async () => {
      try {
        if (userId && setId) {
          const set = await getSetById(setId);
          setIsOwner(set.userId === +userId);
        } else {
          setIsOwner(false);
        }
      } catch (error) {
        console.error("Error fetching set data:", error);
        setIsOwner(false);
      }
    };

    fetchSetOwner();
  }, [setId, userId]);

  if (isOwner === null) {
    return <div>Loading...</div>; 
  }

  if (!userId || !isOwner) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;