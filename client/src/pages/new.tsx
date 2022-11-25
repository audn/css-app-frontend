import { useState } from 'react';
import { Form } from '../common/components/Form';
import { DefaultLayout } from '../common/layouts/Default';
import { API } from '../common/lib/interfaces';

function NewComponent() {
  const [data, setData] = useState<Partial<API.Models.Post>>({});

  const update = (key: keyof API.Models.Post, value: string | boolean) => {
    setData((d) => ({
      ...d,
      [key]: value,
    }));
  };

  return (
    <DefaultLayout>
      <Form.Wrapper className="flex">
        <Form.Input
          label="Title"
          value={data.title}
          onChange={(val: string) => update('title', val)}
          id="title"
          placeholder="ss"
        />
        <Form.Textarea
          label="Description"
          value={data.description}
          onChange={(val: string) => update('description', val)}
          id="description"
          placeholder="ss"
        />
      </Form.Wrapper>
    </DefaultLayout>
  );
}

export default NewComponent;
