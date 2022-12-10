import Link from '../layout/Link';

function Logo() {
  return (
    <Link href="/" className="text-2xl font-bold text-white whitespace-nowrap">
      {/* css.app */}
      <img src={`logo.svg`} className="w-8 h-8 rounded-full" />
    </Link>
  );
}

export default Logo;
