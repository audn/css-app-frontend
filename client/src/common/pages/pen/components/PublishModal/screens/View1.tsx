import { Form } from '../../../../../components/Form';
import { API } from '../../../../../lib/interfaces';
import concat from '../../../../../utils/helpers/concat';

type Props = {
  update: (key: keyof API.Models.Post, value: string | boolean) => void;
  data: Partial<API.Models.Post>;
  categories?: API.Response<API.Models.Category[]>;
};

function View1({ update, data, categories }: Props) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col w-full">
        <Form.Input
          autoFocus={true}
          label="Title"
          required={true}
          placeholder={data.title}
          value={data.title}
          onChange={(val) => update('title', val)}
          id="name"
          inputClassName="px-4 py-4 bg-types-100/20 border border-types-250"
        />
      </div>
      <div className="flex flex-col w-full">
        <Form.Textarea
          placeholder={data.description}
          label="Description"
          value={data.description}
          onChange={(val) => update('description', val)}
          id="description"
          inputClassName="px-4 py-4 bg-types-100/20 border border-types-250"
        />
      </div>
      <div className="flex flex-col">
        <h2 className="text-[14px] text-white font-medium mb-2">Category</h2>
        <p className="mb-3 text-white/60">
          Pens without a specified category will not be featured on our
          homepage.
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          {categories?.payload?.results.map((x) => (
            <button
              onClick={() => update('category', x.value)}
              className={concat(
                data.category == x.value
                  ? 'bg-brand-primary-150/80 text-white '
                  : 'bg-types-250/70 text-white/80',
                'px-3 py-[0.3rem] text-[15px] rounded-md font-medium',
              )}
            >
              {x.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default View1;
