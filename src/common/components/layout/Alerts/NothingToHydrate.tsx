import Image from 'next/image';
import { Alert } from '../../../lib/interfaces';
import { Button } from '../../Buttons';
import H2 from '../headings/H2';
import Text from '../headings/Text';

function NothingToHydrate({ title, label, onClick, isLoading }: Alert.Base) {
  return (
    <div className="flex flex-col items-center p-4 mx-auto rounded-md">
      <Image src="/sad.svg" width={48} height={48} />
      <H2 className="mt-2 !text-lg">{title ? title : 'No results'}</H2>
      <Text className="mt-1 mb-5 !text-base text-center text-on-100">
        {label}
        Select other filters or view all available items
      </Text>
      <Button.White
        className="w-auto"
        title="Clear filters"
        onClick={onClick}
        isLoading={isLoading}
      />
    </div>
  );
}

export default NothingToHydrate;
