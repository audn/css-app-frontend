import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Form } from '../Form';
import Logo from '../misc/Logo';
import LibrarySelector from './components/LibrarySelector';
import Navigation from './Navigation';

export const Header = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string | undefined>('');
  // const [pendingTimeout, setTimeoutHandle] = useState<number | null>(null);

  const handleSearchOn = () => {
    if (search == undefined || search.length <= 1) {
      setTimeout(() => {}, 1000);
    } else {
      //   useMainState.setState({ searchInput: search });
      void router.push(
        {
          pathname: '',
          query: {
            // ...(router.pathname !== '/packs' && { bots: ['bots'] }),
            ...router.query,
            q: search,
          },
        },
        undefined,
        { shallow: true },
      );
    }
  };
  //   function handleSearch(event: SyntheticEvent) {
  //     event.preventDefault();
  //     if (search && search.length < 1) {
  //       setTimeout(() => {}, 1000);
  //     } else {
  //       if (pendingTimeout != null) {
  //         clearTimeout(pendingTimeout);
  //       }
  //       handleSearchOn();
  //     }
  //   }
  const handleEmptySearchField = () => {
    if (search == undefined || search.length == 0) {
      void router.push({
        query: {},
      });
      return;
    }
  };
  useEffect(() => {
    // @ts-ignore
    return setTimeoutHandle((v) => {
      if (v != null) {
        clearTimeout(v);
      }

      return setTimeout(() => {
        handleEmptySearchField();
        if (search?.length == 1) {
          return;
        }

        handleSearchOn();
      }, 300);
    });
  }, [search]);
  return (
    <header className="fixed top-0 h-[80px] z-50 flex items-center w-full px-6 bg-types-body/20 filter backdrop-blur">
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <Logo />
          <div className="flex items-center ml-5 space-x-3">
            <LibrarySelector />
            <div className="text-lg font-semibold text-white/30">/</div>
            <div className="flex items-center">
              <Form.Input
                onChange={setSearch}
                value={search}
                autoFocus={true}
                id="headerSearch"
                placeholder="Search..."
                inputClassName="bg-transparent focus:bg-types-200/80 hover:bg-types-200/80 "
              />
            </div>
          </div>
        </div>
        <Navigation />
      </div>
    </header>
  );
};
