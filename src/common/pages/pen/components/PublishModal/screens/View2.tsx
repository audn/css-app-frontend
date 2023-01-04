import { Form } from '../../../../../components/Form';
import { API } from '../../../../../lib/interfaces';
import concat from '../../../../../utils/helpers/concat';

type Props = {
  update: (key: keyof API.Models.Component, value: string | boolean) => void;
  data: Partial<API.Models.Component>;
};

function View2({ update, data }: Props) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col space-y-3">
        <h3 className="font-medium text-[14px] text-white">Settings</h3>
        <div className="flex space-y-2">
          <button
            className="flex items-center w-full px-4 py-4 border rounded-lg text-start hover:bg-types-200 animate bg-types-100/20 border-types-250"
            onClick={() => update('animated', !data.animated)}
          >
            <h3 className="flex-1 font-medium">Animated</h3>
            <Form.Toggle
              onClick={(val) => update('animated', val)}
              id="what"
              active={data.animated}
            />
          </button>
        </div>
        <button
          className="flex items-center w-full px-4 py-4 border rounded-lg text-start hover:bg-types-200 animate bg-types-100/20 border-types-250"
          onClick={() => update('responsive', !data.responsive)}
        >
          <h3 className="flex-1 font-medium">Responsive</h3>
          <Form.Toggle
            onClick={(val) => update('responsive', val)}
            id="responsive"
            active={data.responsive}
          />
        </button>
      </div>
      <div className="flex flex-col space-y-3">
        <h3 className="font-medium text-[14px] text-white">Apperance</h3>
        <div className="flex space-y-2">
          <div className="flex flex-col items-start w-full px-4 py-4 border rounded-lg bg-types-100/20 border-types-250">
            <h3 className="flex-1 text-sm font-medium text-white">Theme</h3>
            <div className="flex flex-col w-full mt-2 space-y-1">
              <button
                onClick={() => update('theme', 'Light')}
                className={concat(
                  data.theme === 'Light'
                    ? 'bg-types-250/80 text-white'
                    : 'bg-types-250/50',
                  'flex items-center justify-between w-full px-3 py-3 rounded hover:text-white/70 animate ',
                )}
              >
                <div className="flex flex-col items-start">
                  <h4 className="font-medium">Light</h4>
                  {/* <p className="text-sm">My pen is coded with a light theme</p> */}
                </div>
                <Form.Radio
                  onClick={() => update('theme', 'Light')}
                  name="Light"
                  id="theme"
                  active={data.theme == 'Light'}
                />
              </button>
              <button
                onClick={() => update('theme', 'Dark')}
                className={concat(
                  data.theme === 'Dark'
                    ? 'bg-types-250/80 text-white'
                    : 'bg-types-250/50',
                  'flex items-center justify-between w-full px-3 py-3 rounded hover:text-white/70 animate ',
                )}
              >
                <div className="flex flex-col items-start">
                  <h4 className="font-medium">Dark</h4>
                  {/* <p className="text-sm">My pen is coded with a dark theme</p> */}
                </div>
                <Form.Radio
                  name="Dark"
                  onClick={() => update('theme', 'Dark')}
                  id="theme"
                  active={data.theme == 'Dark'}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default View2;
