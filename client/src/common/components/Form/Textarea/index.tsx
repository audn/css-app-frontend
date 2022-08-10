import { Form } from '../../../lib/interfaces';

function Textarea({ value, onChange, placeholder, error }: Form.Textarea) {
  return (
    <label className="w-full">
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={3}
        className="w-full px-5 py-4 mb-3 duration-150 ease-out outline-none bg-types-100 rounded-xl ring-offset-2 ring-offset-black focus:ring-2 ring-indigo-500"
      />
      {error}
    </label>
  );
}

export default Textarea;
