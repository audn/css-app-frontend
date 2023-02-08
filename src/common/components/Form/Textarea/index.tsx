import { Form } from '../../../lib/interfaces';
import concat from '../../../utils/helpers/concat';
import { validateRegex } from '../../../utils/helpers/regex/validator';
import FormError from '../components/FormError';
import FormLabel from '../components/FormLabel';

function Textarea({
  value,
  onChange,
  label,
  id,
  placeholder,
  error,
  inputClassName,
  disabled,
  maxLength,
  minLength,
  description,
  regex,
}: Form.Textarea) {
  const getErrors = () => {
    if (error) {
      return error;
    } else return validateRegex({ value, regex }) as string;
  };
  return (
    <div className="max-w-full min-h-fit">
      <div className="flex items-center justify-between">
        {label && (
          <FormLabel
            id={id}
            description={description}
            disabled={disabled}
            label={label}
          />
        )}
      </div>
      <textarea
        placeholder={placeholder}
        id={id}
        disabled={disabled}
        value={value}
        maxLength={maxLength}
        minLength={minLength}
        cols={3}
        onChange={(event) => onChange(event.target.value)}
        className={concat(
          inputClassName ? inputClassName : '',
          disabled
            ? 'bg-opacity-50 cursor-not-allowed text-on-200 after:!text-on-150'
            : 'focus:bg-types-150/50',
          'focus:text-white w-full h-28 px-4 py-3 transition duration-150 ease-out rounded-lg outline-none scrollbar-none border border-types-150 bg-types-100/50 input-field box-border resize-none',
        )}
      />
      <FormError label={getErrors()} />
    </div>
  );
}

export default Textarea;
