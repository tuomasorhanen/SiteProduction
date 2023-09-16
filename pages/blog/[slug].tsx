import BlogPost from 'components/blog/BlogPost';
import { GetStaticPaths, GetStaticProps } from 'next';
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

  return (
    <>
      <Header items={menu} settings={settings} menuColor="black" />
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

export const getStaticPaths: GetStaticPaths = async () => {
  const query = groq`*[_type == 'post']{ 'slug': slug.current }`;
  const posts = await client.fetch(query);
  const paths = posts.map((post: { slug: string }) => ({ params: { slug: post.slug } }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<IPageProps> = async context => {
  const slug = context.params?.slug;
  if (!slug) {
    return {
      notFound: true,
    };
  }
  const postQuery = groq`*[_type == 'post' && slug.current == '${slug}'][0]{
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
    client.fetch<IPost>(postQuery),
    client.fetch<IMenuItem[]>(menuQuery),
    client.fetch(siteSettingsQuery),
  ]);

  return {
    props: {
      blog,
      menu,
      settings,
    },
    revalidate: 3600,
  };
};

export default Post;
