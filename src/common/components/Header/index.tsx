import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { SyntheticEvent, useState } from 'react';
import { fadeInFromTopAndOutTop } from '../../utils/data/animations';
import { Form } from '../Form';
import Animate from '../layout/Animate';
import Logo from '../misc/Logo';
import LibrarySelector from './components/LibrarySelector';
import Navigation from './Navigation';

export const Header = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string | undefined>('');

  const handleSearchOn = () => {
    void router.push(
      {
        pathname: 'search',
        query: {
          ...router.query,
          q: search,
        },
      },
      undefined,
      { shallow: true },
    );
  };

  function handleSearch(e: SyntheticEvent) {
    e.preventDefault();
    handleSearchOn();
  }
  return (
    <header className="sticky top-0 h-[80px] z-50 flex items-center w-full px-6 bg-types-body/20 filter backdrop-blur">
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <Logo />
          <div className="flex items-center ml-5 space-x-3">
            <LibrarySelector />
          </div>
        </div>
        <AnimatePresence>
          {router.pathname == '/search' && (
            <Animate
              variants={fadeInFromTopAndOutTop}
              className="relative flex items-center w-full max-w-sm"
            >
              <span className="absolute text-sm left-5">
                <i className="fa-regular fa-magnifying-glass" />
              </span>
              <form
                onSubmit={(event) => handleSearch(event)}
                className="w-full"
              >
                <Form.Input
                  onChange={setSearch}
                  value={search}
                  autoFocus={false}
                  id="headerSearch"
                  placeholder="Search..."
                  inputClassName="!bg-types-200/80 px-4 !pl-11 border-types-250 py-[0.4rem] border hover:bg-types-150 !rounded-full focus:bg-types-200/80 hover:bg-types-200/80 "
                />
              </form>
            </Animate>
          )}
        </AnimatePresence>
        <Navigation />
      </div>
    </header>
  );
};
