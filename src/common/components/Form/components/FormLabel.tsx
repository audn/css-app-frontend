import { Form } from '../../../lib/interfaces';
import concat from '../../../utils/helpers/concat';

function FormLabel({ disabled, label, required, description, id }: Form.Label) {
  if (label) {
    return (
      <label
        className={concat(
          disabled ? 'text-on-50' : 'text-white',
          'block mb-3 font-semibold text-[14px] text-left',
        )}
        htmlFor={id}
      >
        {label} {required && <span className="text-red-500">*</span>}
        {description && (
          <div className={`!font-normal mt-2 text-on-100`}>{description}</div>
        )}
      </label>
    );
  } else return <></>;
}

export default FormLabel;
