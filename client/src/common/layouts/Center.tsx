import { ILayout } from '../lib/interfaces';
import { DefaultLayout } from './Default';

export const CenterLayout = ({ children, ...props }: ILayout) => {
  return (
    <DefaultLayout {...props}>
      <div className="fixed inset-0 z-50 h-screen min-h-screen bg-types-150">
        <div className="flex items-center justify-center h-full text-2xl font-semibold">
          {children}
        </div>
      </div>
    </DefaultLayout>
  );
};
