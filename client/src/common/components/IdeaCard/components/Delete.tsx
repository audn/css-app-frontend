import Auth from '../../layout/Auth';

function Delete({ onClick }: { onClick: () => void }) {
  return (
    <Auth.Admin>
      <button
        onClick={onClick}
        className="opacity-0 group-hover:opacity-100 aniamte"
      >
        <i className="text-lg fa-solid fa-trash-alt" />
      </button>
    </Auth.Admin>
  );
}

export default Delete;
