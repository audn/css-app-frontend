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
        'flex items-center w-full text-on-150 mb-2',
      )}
    >
      <div className="flex mr-5 text-base font-semibold rounded-full whitespace-nowrap bg-tdypes-100">
        {title}
      </div>
      <div className="w-full h-px bg-types-100" />
    </div>
  );
}

export default SectionSeparator;
