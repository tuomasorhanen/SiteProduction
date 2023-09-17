import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import { IMenuProps, ISiteSettings } from '../../_lib/types';

const Header = ({ items, settings, menuColor }: IMenuProps & { settings: ISiteSettings; menuColor?: string }) => {
  const router = useRouter();
  const { blogPage, blogMenuOrder } = settings || {};
  const modifiedMenu = [...(items || [])];
  const [navBackground, setNavBackground] = useState(`bg-transparent ${menuColor === 'black' ? 'text-black' : 'text-white'}`);
  const [navOpen, setNavOpen] = useState(false);
  const [initialLineColor, setInitialLineColor] = useState(menuColor === 'black' ? 'bg-black' : 'bg-white');
  
  useEffect(() => {
    setInitialLineColor(menuColor === 'black' ? 'bg-black' : 'bg-white');
  }, [menuColor]);

  useEffect(() => {
    const handleRouteChange = () => {
      setNavBackground(`bg-transparent ${menuColor === 'black' ? 'text-black' : 'text-white'}`);
    };

    handleRouteChange();  // Initial call

    // Listen to route changes
    router.events.on('routeChangeComplete', handleRouteChange);

    // Cleanup
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [menuColor, router]);

  if (blogPage) {
    modifiedMenu.splice(blogMenuOrder, 0, {
      slug: { current: 'blog' },
      name: 'Blogi',
      menuOrder: 0,
    });
  }

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY > 0;
    const textColor = menuColor === 'black' ? 'text-black' : 'text-white';
    setNavBackground(scrollPosition ? `bg-bg shadow-lg text-text` : `bg-transparent ${textColor}`);
  }, [menuColor]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const renderDesktopNav = () => (
    <nav
      key={settings?._id}
      className={`fixed top-0 z-40 hidden w-full md:block ${navBackground} duration-800 transition delay-300 ease-in-out`}>
      <div className="flex justify-between py-2">
        <Link href="/" className="z-40 flex items-center">
          <Image
            src={settings?.logo.asset.url}
            width={50}
            height={50}
            placeholder="empty"
            priority
            alt={settings?.logo.alt}
            style={{ objectFit: 'contain' }}
            className="mx-10 rounded-full hover:scale-105"
          />
          <span className="-ml-6 text-xl">ProEnabler</span>
        </Link>
        <div className="z-40 hidden md:block" id="navbar-default">
          <ul className="mx-10 my-2 flex">
            {modifiedMenu.map(item => {
              return (
                <li key={item.slug.current}>
                  <Link href={'/' + item.slug.current} aria-current="page">
                    <span className="block px-4 py-2 font-extralight transition-opacity hover:opacity-50">
                      {item.name.toUpperCase()}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );

  const renderMobileNav = () => (
    <nav key={settings?._id} className="nav z-40 md:hidden">
      <div className="nav-container">
        <div className="navbar absolute z-50">
          <Link href="/" className="z-40 flex items-center">
            <Image
              src={settings?.logo.asset.url}
              width={50}
              height={50}
              placeholder="empty"
              priority
              alt={settings?.logo.alt}
              style={{ objectFit: 'contain' }}
              className="rounded-full hover:scale-105"
            />
          </Link>{' '}
          <div className="menu-toggle" onClick={() => setNavOpen(!navOpen)}>
            <div className={navOpen ? 'hamBox hamBoxOpen' : 'hamBox'}>
              <span className={navOpen ? 'lineTop spin bg-bg' : `lineTop ${initialLineColor}`} />
              <span className={navOpen ? 'lineBottom spin bg-bg' : `lineBottom ${initialLineColor}`} />
            </div>
          </div>
        </div>

        <div
          className="nav-overlay absolute z-40 h-full w-full"
          style={{
            top: navOpen ? '0' : '-100%',
            transitionDelay: navOpen ? '0s' : '0s',
          }}>
          <ul className="nav-links">
            {modifiedMenu.map((item, index) => (
              <li className="nav-item" key={item.slug.current}>
                <Link
                  href={'/' + item.slug.current}
                  onClick={() => setNavOpen(!navOpen)}
                  style={{
                    top: navOpen ? '0' : '120px',
                    transitionDelay: navOpen ? `${0.3 + index * 0.1}s` : '0s',
                  }}>
                  {item.name}
                </Link>
                <div className="nav-item-wrapper"></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );

  return (
    <>
      {renderDesktopNav()}
      {renderMobileNav()}
    </>
  );
};

export default Header;
