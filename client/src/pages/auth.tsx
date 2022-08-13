import { useRouter } from 'next/router';
import { CenterLayout } from '../common/layouts/Center';
import { setCurrentUser } from '../common/utils/hooks/user';

export default function Home() {
  const router = useRouter();
  const token = router.query.code as string;

  if (token) {
    localStorage.setItem('access_token', token);
    setCurrentUser();
    router.push('/');
  }

  return <CenterLayout>Authorizing..</CenterLayout>;
}
