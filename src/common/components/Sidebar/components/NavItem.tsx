import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import useSidebarState from '../../../store/sidebar';
import concat from '../../../utils/helpers/concat';
import Link from '../../layout/Link';

type Props = {
  label: string | ReactElement;
  icon?: string;
  route: string;
  condition?: boolean;
  customIcon?: ReactElement;
};
function NavItem({ label, icon, route, condition }: Props) {
  const router = useRouter();
  const { isSidebarCollapsed, isHoveringCollapsedSidebar } = useSidebarState(
    (s) => ({
      isSidebarCollapsed: s.isCollapsed,
      isHoveringCollapsedSidebar: s.isHoveringCollapsedSidebar,
    }),
  );
  const active =
    route == '/' ? route == router.pathname : router.asPath.includes(route);
  if (typeof condition !== 'boolean' || condition) {
    return (
      <Link
        href={route}
        className={concat(
          isSidebarCollapsed && !isHoveringCollapsedSidebar
            ? 'w-9 h-9 flex justify-center items-center'
            : 'px-3 py-[6px]',
          active
            ? 'bg-brand-primary-100 !text-types-50'
            : 'hover:bg-brand-primary-100 hover:text-types-50',
          'flex items-center rounded font-normal animate text-[16px] group',
        )}
      >
        <div
          className={concat(
            isSidebarCollapsed && !isHoveringCollapsedSidebar
              ? 'text-lg'
              : ' w-7 text-sm',
            'flex justify-start',
          )}
        >
          <i className={icon} />
        </div>
        {(!isSidebarCollapsed || isHoveringCollapsedSidebar) && label}
      </Link>
    );
  } else return <></>;
}

export default NavItem;
