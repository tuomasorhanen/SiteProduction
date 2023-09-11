import { Content } from 'components/Content';
import { IService } from '../../_lib/types';
import Image from 'next/image';
const Service = (props: IService) => {
  const { title, duration, mainImage, price, _key, specification, content } = props;
  return (
    <>
     <div
          key={`${props._key}-image-bg-center`}
          className="relative flex aspect-square max-h-screen w-full items-center justify-center sm:h-[700px]">
          <div className="absolute left-0 top-0 z-10 h-full w-full bg-black">
          {mainImage && <Image src={mainImage.asset.url} fill={true} quality={90} placeholder='blur' blurDataURL={mainImage.asset.url} className="h-full w-full object-cover opacity-50" alt="" />}
          </div>
          <div className="absolute left-0 top-0 z-20 h-full w-full "></div>
          <div className="z-30 max-w-3xl px-4 pb-2 font-heading text-3xl sm:text-4xl md:text-5xl text-center text-white">{title}
          </div>
        </div>
        <div key={props._key} className="relative z-10 bg-transparent" style={{ marginTop: '-20.1%' }}>
          <svg viewBox="0 0 1440 320" style={{ position: 'absolute', top: 0, left: 0 }}>
            <path
              fill="transparent"
              d="M0,288L48,266.7C96,245,192,203,288,197.3C384,192,480,224,576,229.3C672,235,768,213,864,186.7C960,160,1056,128,1152,112C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
          <svg viewBox="0 0 1440 320" style={{ position: 'relative', zIndex: 1 }}>
            <path fill="var(--bg-color)" d="M0,288L48,266.7C96,245,192,203,288,197.3C384,192,480,224,576,229.3C672,235,768,213,864,186.7C960,160,1056,128,1152,112C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
    <div key={props._key} className="max-w-4xl mx-auto">
    <div className="pb-4 flex justify-center gap-4 font-extrabold ">
      {Array.isArray(price) && Array.isArray(duration) && price.map((p, index) => (
          <div key={_key && index} className="p-2 rounded-lg bg-white opacity-70">
            {specification && <p className='text-sm font-light'>{specification[index]}</p>}
            <div>{duration[index]} min</div>
            <div>{p} €</div>
          </div>
        ))}
        </div>

      <div className="p-4 pb-16">
      <Content content={content} />

      </div>
    </div>
    </>
  );
};

export default Service;
