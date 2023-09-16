import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import MapContent from 'components/MapContent';
import Head from 'next/head';

import { fetchMenuItems, fetchPageData, fetchSiteSettings } from '../_lib/sanity-utils';
import { IPageProps } from '../_lib/types';

const IndexPage = (props: IPageProps) => {
  const { content, menu, settings, description, title, menuColor } = props;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <Header items={menu} settings={settings} menuColor={menuColor} />
      <MapContent content={content} />
      <Footer items={menu} />
      <style jsx global>{`
        :root {
          --bg-color: ${settings?.bgColor?.hex};
          --text-color: ${settings?.textColor?.hex};
          --accent-color: ${settings?.accentColor?.hex};
        }
      `}</style>
    </>
  );
};

export async function getStaticPaths() {
  const menuItems = await fetchMenuItems();
  const paths = menuItems.map(item => ({
    params: { slug: [item.slug.current] }, // because you are using [...slug]
  }));
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const slug = params.slug ? params.slug.join('/') : 'etusivu';
  const pageData = await fetchPageData(slug);
  const menuItems = await fetchMenuItems();
  const siteSettings = await fetchSiteSettings();

  if (!pageData) {
    return { notFound: true };
  }

  return {
    props: {
      ...pageData,
      menu: menuItems,
      settings: siteSettings,
    },
    revalidate: 3600,
  };
}

export default IndexPage;
