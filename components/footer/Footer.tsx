import Link from 'next/link';

import { IMenuProps } from '../../_lib/types';

const MyFooter = (props: IMenuProps) => {
  const { items, _key, settings} = props;
  const { blogPage, blogMenuOrder } = settings || {};
  const modifiedMenu = [...(items || [])];

  if (blogPage) {
    modifiedMenu.splice(blogMenuOrder, 0, {
      slug: { current: 'blog' },
      name: 'Blogi',
      menuOrder: 0,
    });
  }

  return (
    <div key={_key} className="mx-auto max-w-7xl px-4 py-8 ">
      <nav className=" flex flex-wrap justify-center space-x-4 text-sm sm:space-x-12">
      {modifiedMenu.map(item => {
              return (
                <ul key={item.slug.current}>
                  <Link href={'/' + item.slug.current} aria-current="page">
                    <span className="text-text hover:text-gray-500">
                      {item.name}
                    </span>
                  </Link>
                </ul>
              );
            })}
      </nav>
      <p className="mt-4  text-center text-xs leading-5 text-gray-500">
        &copy; 2023 ProEnabler Oy | Website by Tuomas Orhanen.
      </p>
    </div>
  );
};

export default MyFooter;
