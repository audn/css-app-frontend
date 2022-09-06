import { ReactNode } from 'react';
import P from '../components/layout/headings/P';
import SectionSeparator from '../components/layout/SectionSeparator';
import concat from '../utils/helpers/concat';

type Props = {
  title?: string;
  children: ReactNode | ReactNode[];
};
export function Section({ title, children }: Props) {
  console.log(children);

  return (
    <div>
      <SectionSeparator title={title!} />
      {Array.isArray(children) ? (
        children.map((x) => <P className="mt-3 first:mt-0">{x}</P>)
      ) : (
        <P>{children}</P>
      )}
    </div>
  );
}
export function SectionWrapper({
  children,
  className,
}: Props & { className?: string }) {
  return (
    <div
      className={concat(className ? className : '', 'flex flex-col space-y-8')}
    >
      {children}
    </div>
  );
}
