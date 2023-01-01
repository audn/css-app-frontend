import Modal from '../layout/Modal';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
function SelectCreateType({ isOpen, onClose }: Props) {
  return (
    <Modal onClose={() => onClose()} open={isOpen}>
      <h1 className="justify-center text-xl font-bold text-center text-white">
        Select Category
      </h1>
      <h4 className="max-w-xs mx-auto mt-2 text-base text-center">
        What kind of component are you going to create?
      </h4>
      <div className="flex flex-col w-full mt-5">
        <button className="flex items-center p-2 text-left group bg-types-50/20 hover:bg-brand-primary-100/20 rounded-xl animate text-on-50 hover:text-white/60">
          <div className="flex items-start justify-start flex-shrink-0 p-4 mr-4 rounded-lg bg-types-50/40">
            <img src="/component.svg" className="flex-shrink-0 w-12 h-12" />
          </div>
          <div>
            <h2 className="font-medium text-white">Single Component</h2>
            <p className="mt-1 text-sm">
              Eg. Button, Input, Checkbox, Modal, Header, Footer etc.
            </p>
          </div>
        </button>{' '}
        <button className="flex items-center p-2 mt-3 text-left group bg-types-50/20 hover:bg-brand-primary-100/20 rounded-xl animate text-on-50 hover:text-white/60">
          <div className="flex justify-start items-end overflow-hidden h-[80px] w-[80px] flex-shrink-0 px-2 mr-4 rounded-lg bg-types-50/40">
            <img
              src="/section.svg"
              className="!w-[108px] rounded-t-md !max-w-[fit-content]"
            />
          </div>
          <div>
            <h2 className="font-medium text-white">Page</h2>
            <p className="mt-1 text-sm">Eg. Landing page, Pricing page etc.</p>
          </div>
        </button>
      </div>
    </Modal>
  );
}

export default SelectCreateType;
