import { useRouter } from 'next/router';
import { DefaultLayout } from '../common/layouts/Default';
import { useCurrentUser } from '../common/utils/hooks/user';

export default function Home() {
  const router = useRouter();
  const token = router.query.code as string;

  if (token) {
    localStorage.setItem('access_token', token);
    useCurrentUser();
    router.push('/');
  }

  return (
    <DefaultLayout title={'Index'}>
      <div className="fixed inset-0 z-50 h-screen min-h-screen bg-types-150">
        <div className="flex items-center justify-center h-full text-2xl font-semibold">
          Authorizing...
        </div>
      </div>
    </DefaultLayout>
  );
}
