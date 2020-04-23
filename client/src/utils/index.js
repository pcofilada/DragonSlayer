import Cookies from 'js-cookie';

export const isLoggedIn = () => {
  if (Cookies.get('token')) {
    return true;
  }

  return false;
};
