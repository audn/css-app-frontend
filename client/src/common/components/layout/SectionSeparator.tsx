import concat from '../../utils/helpers/concat';

function SectionSeparator({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <div
      className={concat(
        className ? className : '',
        'flex items-center w-full text-on-100',
      )}
    >
      <div className="w-full h-px bg-types-100" />
      <div className="flex mx-5 text-sm font-semibold rounded-full whitespace-nowrap bg-tdypes-100">
        {title}
      </div>
      <div className="w-full h-px bg-types-100" />
    </div>
  );
}

export default SectionSeparator;
