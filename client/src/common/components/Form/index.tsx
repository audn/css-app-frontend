import { Form as IForm } from '../../lib/interfaces';
import Textarea from './Textarea';

export const Form = {
  Textarea: ({ ...props }: IForm.Textarea) => {
    return <Textarea {...props} />;
  },
};
