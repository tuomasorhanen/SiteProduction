import { ICategory, IPost } from '_lib/types';
import Image from 'next/image';
import Link from 'next/link';

type BlogSectionProps = {
  post: IPost;
  categories: ICategory[];
};

const BlogSection = (props: BlogSectionProps) => {
  const { post } = props;
  const { excerpt, mainImage, readingTime, title, person, slug } = post;

  return (
    <section key={props.post._key} className="mx-auto grid max-w-7xl grid-cols-12 px-4 py-16 sm:gap-8">
      <div className="col-span-full shadow-md shadow-gray-500 sm:col-span-6 md:col-span-4 lg:col-span-3">
        <Image
          src={mainImage.asset.url}
          width={600}
          height={100}
          alt=""
          className="h-48 w-full  object-cover"
        />
        <div className="px-6 pb-8 pt-4">
          <Link href={`/blog/${slug.current}`}>
            <h2 className="text-2xl font-bold">{title}</h2>
          </Link>
          <p className="mt-2">{excerpt}</p>
          <div className="mt-4 flex">
            <Image
              src={person.image.asset.url}
              width={50}
              height={50}
              alt={person.name}
              className="mr-4 mt-3 h-16 w-16 rounded-full object-cover shadow-md"
            />
            <div className="flex flex-col text-opacity-50">
              <p>{readingTime} min</p>
              <p>{person.name}</p>
              <p>{person.role}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
