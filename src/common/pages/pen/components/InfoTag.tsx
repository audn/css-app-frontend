import { ReactNode } from 'react';
import concat from '../../../utils/helpers/concat';

type Props = {
  label: string;
  value: string | number | ReactNode;
  icon: string;
};
function InfoTag({ label, value, icon }: Props) {
  return (
    <div className="flex items-center px-5 py-3 text-sm font-normal hover:bg-types-150/50">
      <div className="w-40">
        <i className={concat('mr-2', icon)} />
        {label}
      </div>
      {value}
    </div>
  );
}

export default InfoTag;
