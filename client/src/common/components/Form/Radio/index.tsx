import { Form } from '../../../lib/interfaces';
import concat from '../../../utils/helpers/concat';

function Radio({ active, name, className, onClick, id }: Form.Radio) {
  return (
    <div className="flex">
      <label
        htmlFor={id}
        onClick={() => onClick()}
        className={concat(className ? className : '', 'flex flex-col relative')}
      >
        <div
          className={concat(
            'flex items-center justify-center p-[10px] m-[-10px] bg-opacity-0 rounded-full group-hover:bg-opacity-5 animate bg-brand-primary-150',
          )}
        >
          <input
            type="radio"
            checked={active}
            id={id}
            name={name}
            className={
              'w-[15px] h-[15px] rounded-full checked:border-brand-primary-150 checked:bg-brand-primary-150 relative group-hover:border-brand-primary-150 appearance-none border-2 box-content border-types-250 cursor-pointer outline-none transition-all duration-150 ease-out'
            }
          />
          {active && (
            <div className="absolute pointer-events-none" aria-hidden="true">
              <i className={'fa-duotone fa-check text-sm text-types-body '} />
            </div>
          )}
        </div>
      </label>
    </div>
  );
}

export default Radio;
