import { useRouter } from 'next/router';
import React from 'react';
import useAuthState from '../../../../store/auth';
import useSidebarState from '../../../../store/sidebar';
import Item from './components/Item';

function Bookmarks() {
  const user = useAuthState((s) => s.user);
  const router = useRouter();

  const active = (id: string) => router.asPath.includes(id);
  const { isSidebarCollapsed } = useSidebarState((s) => ({
    isSidebarCollapsed: s.isCollapsed,
  }));

  if (!isSidebarCollapsed) {
    return (
      <div>
        {user.componentsSaved && user.componentsSaved?.length >= 1 && (
          <React.Fragment>
            <h3 className="text-base font-medium text-white/60">Bookmarks</h3>
            <div className="mt-2 space-y-2">
              {user.componentsSaved?.map(({ component }) => (
                <Item active={active(component!.id)} component={component!} />
              ))}
            </div>
          </React.Fragment>
        )}
      </div>
    );
  } else return <></>;
}

export default Bookmarks;
