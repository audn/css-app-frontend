import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import concat from '../../../utils/helpers/concat';
import Link from '../../layout/Link';

type Props = {
  label: string | ReactElement;
  icon?: string;
  route: string;
  condition?: boolean;
  customIcon?: ReactElement;
};
function NavItem({ label, icon, route, condition, customIcon }: Props) {
  const router = useRouter();
  console.log(label);

  const active =
    route == '/' ? route == router.pathname : router.asPath.includes(route);
  if (typeof condition !== 'boolean' || condition) {
    return (
      <Link
        href={route}
        className={concat(
          active
            ? 'bg-brand-primary-100 !text-types-50'
            : 'hover:bg-brand-primary-100 hover:text-types-50',
          'flex items-center px-3 py-[6px] rounded font-normal animate text-[16px] group',
        )}
      >
        {icon ? (
          <div className="flex justify-start w-7">
            <i className={concat('mr-1d text-sm', icon)} />
          </div>
        ) : (
          customIcon &&
          React.cloneElement(customIcon, {
            className: `${customIcon.props.className} ${
              active && '!text-types-50'
            }`,
          })
        )}
        {typeof label === 'object'
          ? React.cloneElement(label, {
              className: `${label.props.className} ${
                active && '!text-types-50'
              }`,
            })
          : label}
      </Link>
    );
  } else return <></>;
}

export default NavItem;
