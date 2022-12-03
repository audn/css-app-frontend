import concat from '../../../utils/helpers/concat';

type Props = {
  title: string;
  text: string;
  icon: string;
};
function InfoTag({ title, text, icon }: Props) {
  return (
    <div className="flex items-center text-sm font-normal ">
      <div className="w-60">
        <i className={concat('mr-2', icon)} />
        {title}
      </div>
      {text}
    </div>
  );
}

export default InfoTag;
