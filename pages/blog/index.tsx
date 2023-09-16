import { getStaticBlogProps } from '_lib/sanity-utils';
import CategoryFilter from 'components/blog/CategoryFilter';
import CalendlySection from 'components/calendly/CalendlySection';
import Header from 'components/header/Header';
import { GetServerSideProps } from 'next';
import { useState } from 'react';

import { IPageProps } from '../../_lib/types';
import BlogSection from '../../components/blog/BlogSection';
import MyFooter from '../../components/footer/Footer';

const Blogs = (props: IPageProps) => {
  const { blogs, menu, categories, settings, menuColor } = props;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredBlogs = selectedCategory
    ? blogs?.filter(blog => blog.categories.some(cat => cat.name === selectedCategory))
    : blogs;

  return (
    <>
      <Header items={menu} settings={settings} menuColor={menuColor} />
      <div className="py-16">
        {categories && (
          <CategoryFilter
            categories={categories}
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
        )}
        {filteredBlogs?.map(post => (
          <BlogSection key={post._key} post={post} categories={categories || []} />
        ))}
        <CalendlySection
          _key={'123456'}
          _id={''}
          _type={''}
          title={'Varaa tapaaminen'}
          calendlyLink={'https://calendly.com/pekka-j/online-coaching'}
          layout={'calendly-popup'}
        />
      </div>
      <MyFooter items={menu} />
      <style jsx global>{`
        :root {
          --bg-color: ${settings.bgColor.hex};
          --text-color: ${settings.textColor.hex};
          --accent-color: ${settings.accentColor.hex};
        }
      `}</style>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<IPageProps> = async context => {
  const {
    props: { blogs, categories, menu, settings, content, menuColor },
  } = await getStaticBlogProps();

  return {
    props: {
      blogs,
      categories,
      menu,
      settings,
      content,
      menuColor,
    },
  };
};

export default Blogs;
