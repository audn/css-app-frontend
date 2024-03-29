import { Form } from '../../../lib/interfaces';
import concat from '../../../utils/helpers/concat';
import { validateRegex } from '../../../utils/helpers/regex/validator';
import FormError from '../components/FormError';
import FormLabel from '../components/FormLabel';

function Input({
  value,
  type,
  label,
  onChange,
  autoFocus,
  id,
  disabled,
  placeholder,
  error,
  inputClassName,
  description,
  onFocus,
  onBlur,
  regex,
  required,
}: Form.Input) {
  const getErrors = () => {
    if (error) {
      return error;
    } else return validateRegex({ value, regex }) as string;
  };

  return (
    <div>
      <FormLabel
        id={id}
        required={required}
        description={description}
        disabled={disabled}
        label={label}
      />
      <input
        placeholder={placeholder}
        id={id}
        autoFocus={autoFocus}
        type={type}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={concat(
          inputClassName ? inputClassName : '',
          disabled
            ? 'bg-opacity-50 cursor-not-allowed text-on-200 after:!text-on-150'
            : 'focus:bg-types-150/50',
          'focus:text-white w-full px-4 py-3 transition duration-150 ease-out rounded-lg outline-none scrollbar-none border border-types-150 bg-types-100/50 input-field',
        )}
      />
      <FormError label={getErrors()} />
    </div>
  );
}

export default Input;
