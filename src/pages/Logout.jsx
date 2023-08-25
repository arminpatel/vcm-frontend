import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useContext } from 'react';
import UserContext from '../utils/UserContext';

export default function Logout() {

  const { setUser } = useContext(UserContext);

  useEffect(() => {
    setUser(null);
  });

  localStorage.removeItem("user");
  Cookies.remove("refresh");
  Cookies.remove("access");
  return (
    <Navigate to="/" />
  );
}
