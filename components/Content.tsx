import { blurred } from '_lib/sanity-utils';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';

type ImageBlock = {
  asset: string;
  alt: string;
};

type ContentProps = {
  content: any;
};

const myPortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      const { asset } = value;
      if (asset) {
        return (
          <div className="py-8">
            <Image
              src={asset.url}
              width={500}
              height={248.43}
              quality={90}
              className="rounded-lg shadow-md shadow-gray-500"
              alt={asset.alt || 'Image'}
            />
          </div>
        );
      }
      return null;
    },
  },
};

export const Content: React.FC<ContentProps> = ({ content }) => {
  return (
    <div className="">
      <PortableText value={content} components={myPortableTextComponents} />
    </div>
  );
};
