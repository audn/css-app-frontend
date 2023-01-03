function Footer() {
  return (
    <footer className="flex items-center justify-between w-full px-10 py-5 border-t flex-cold border-types-150 bg-types text-white/60 ">
      <p className="max-w-sm text-xs leading-6">
        All content (UI elements) on this site are published under the MIT
        License (Free for personal and commercial use)
      </p>
      <div className="flex items-center mt-2 space-x-2">
        <div className="flex items-center">
          <img src={`/logo1.svg`} className={'w-6 h-6 mr-3'} />{' '}
        </div>
        <div className="flex flex-col">
          <div className="flex items-center space-x-1">
            <h3 className="font-semibold text-white">CSS.app</h3> <div>•</div>
            <span className="text-sm ">
              by{' '}
              <a
                href="https://audun.gg"
                target={'_blank'}
                className="pb-1 border-b border-transparent hover:border-types-250 animate hover:text-white"
              >
                Audun Hilden
              </a>
            </span>
          </div>
          <div className="mt-1 text-xs text-white/50">
            Copyright &copy; {new Date().getFullYear()} CSS.app
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
