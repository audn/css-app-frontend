import Link from 'next/link';

function CreatNew() {
// { toggleCreateType }: { toggleCreateType: () => void }
  return (
    <Link
      href="/new?type=Component"
      //   onClick={toggleCreateType}
      className="flex group items-center px-3 py-[0.4rem] text-sm font-medium rounded-full bg-types-150/30 hover:text-white/80 hover:bg-types-150/50 animate"
    >
      Create
      <div className="flex items-center justify-center w-5 h-5 ml-2 rounded-full group-hover:bg-types-250 bg-types-150 ">
        <i className={'text-sm fa-regular fa-plus'} />
      </div>
    </Link>
  );
  //   return (
  //     <button
  //       onClick={toggleCreateType}
  //       className="flex group items-center px-3 py-[0.4rem] text-sm font-medium rounded-full bg-types-150/30 hover:text-white/80 hover:bg-types-150/50 animate"
  //     >
  //       Create
  //       <div className="flex items-center justify-center w-5 h-5 ml-2 rounded-full group-hover:bg-types-250 bg-types-150 ">
  //         <i className={'text-sm fa-regular fa-plus'} />
  //       </div>
  //     </button>
  //   );
}

export default CreatNew;
