import { fetchPageProps } from '_lib/sanity-utils';
import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import MapContent from 'components/MapContent';
import Head from 'next/head';

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

export const getServerSideProps = async context => {
  return await fetchPageProps(context);
};

export default IndexPage;
