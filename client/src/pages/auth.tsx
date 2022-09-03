import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { CenterLayout } from '../common/layouts/Center';
import { setCurrentUser } from '../common/utils/hooks/user';

export default function Auth() {
  const router = useRouter();
  const token = router.query.code as string;
  const [_, setCookie] = useCookies(['access_token']);

  if (token) {
    localStorage.setItem('access_token', token);
    setCookie('access_token', token);
    setCurrentUser();
    router.push('/');
  }

  return <CenterLayout title="Authorize">Authorizing..</CenterLayout>;
}
