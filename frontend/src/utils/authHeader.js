import { useAuth } from '../hooks/useAuth';

export default function authHeader() {
  const auth = useAuth();

  if (auth && auth.accessToken) {
    return { 'x-access-token': auth.accessToken };
  } else {
    return {};
  }
}
