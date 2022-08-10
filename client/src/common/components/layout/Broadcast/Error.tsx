import { Broadcast } from '../../../lib/interfaces';
import { Button } from '../../Buttons';
import Bravo from '../headings/Bravo';
import P from '../headings/P';

function Error({ title, label, onClick }: Broadcast.Base) {
  const error = {
    fetch:
      'An error occoured while trying to retrieve ideas. Please try agian later.',
  };
  return (
    <div className="flex flex-col items-center p-4 mx-auto rounded-md">
      <Bravo>{title ? title : 'Something went wrong..'}</Bravo>
      <P className="text-on-100">
        {label}
        <br /> Please try agian later.
      </P>
      <Button.Primary
        label="Try again"
        className="w-auto mt-8 bg-white text-types-50"
      />
    </div>
  );
}

export default Error;
