import BlogPost from 'components/blog/BlogPost';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { groq } from 'next-sanity';

import { client } from '../../_lib/client';
import { IMenuItem, IPost, ISiteSettings } from '../../_lib/types';
import Header from '../../components/header/Header';

type IPageProps = {
  blog: IPost;
  menu: IMenuItem[];
  settings: ISiteSettings;
};

const Post = (props: IPageProps) => {
  const { blog, menu, settings } = props;
  const { title } = blog;

  return (
    <>
      <Head>
        <title>{`${title} - ProEnabler Blogi`}</title>
      </Head>
      <Header items={menu} settings={settings} />
      <BlogPost {...blog} />
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

export const getServerSideProps: GetServerSideProps<IPageProps> = async context => {
  context.res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=7200');
  const { slug } = context.query;

  const query = groq`*[_type == 'post' && slug.current == '${slug}'][0]{
    ...,
    content[]{
      ...,
      asset->{
        url
      }
    }
  }`;

  const menuQuery = groq`*[_type == 'page' && defined(menuOrder)] {
    name,
    slug,
    menuOrder,
  } | order(menuOrder asc)`;

  const siteSettingsQuery = groq`*[_type == 'siteSettings'][0]{
    ...,
    logo{
      asset->{
        url
      },
      alt
    }
  }`;

  const [blog, menu, settings] = await Promise.all([
    client.fetch<IPost>(query),
    client.fetch<IMenuItem[]>(menuQuery),
    client.fetch(siteSettingsQuery),
  ]);

  return {
    props: {
      blog,
      menu,
      settings,
    },
  };
};

export default Post;