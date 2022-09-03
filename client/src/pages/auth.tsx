import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { CenterLayout } from '../common/layouts/Center';
import { setCurrentUser } from '../common/utils/hooks/user';

export default function Auth() {
  const router = useRouter();
  const token = router.query.code as string;
  const [_, setCookie] = useCookies(['access_token']);

  if (token) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', token);
    } else {
      console.warn("didn't set access_token in localStorage");
    }
    setCookie('access_token', token);
    setCurrentUser();
    router.push('/');
  }

  return <CenterLayout title="Authorize">Authorizing..</CenterLayout>;
}
