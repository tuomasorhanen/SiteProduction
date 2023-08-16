import Link from 'next/link';
import { IService } from '../../_lib/types';
import Image from '../../components/Image';

const ServiceReferenceSection = (props: IService) => {
  const { description, title, slug, duration, mainImage, _type, price, _key, _id } = props;

  return (
    <div key={props._key} className="borderstyle rounded-lg shadow-lg overflow-hidden relative">
      <Image {...mainImage} alt="" className="h-48 w-full object-cover" />
      <div className="absolute top-0 right-0 p-2 font-extrabold flex flex-col gap-2">
        {Array.isArray(price) && Array.isArray(duration) && price.map((p, index) => (
          <div key={index} className="p-2 rounded-lg bg-white opacity-70">
                        <p>{duration[index]} min</p>

            <p>{p} €</p>
          </div>
        ))}
      </div>
      <div className="px-6 py-4">
        <Link href={`/${slug.current}`}>
          <div className="flex justify-center items-center">
            <h2 className="text-center text-2xl font-bold">{title}</h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ServiceReferenceSection;
