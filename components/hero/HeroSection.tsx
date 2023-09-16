import { blurred } from '_lib/sanity-utils';
import { Content } from 'components/Content';
import Image from 'next/image';

import { IHero } from '../../_lib/types';
import ButtonRenderer from '../../components/ButtonRenderer';

const HeroSection = (props: IHero) => {
  const { image, buttons, layout, opacity, heroBgColor, heroTextColor, content } = props;

  const textColorStyle = heroTextColor ? { color: heroTextColor.hex } : {};
  const bgColorStyle = heroBgColor ? { backgroundColor: heroBgColor.hex } : {};
  const imageOpacity = opacity ? opacity / 100 : 1;

  switch (layout) {
    case 'image-bg-center':
      return (
        <section
          key={`${props._key}-image-bg-center`}
          className="relative flex aspect-square max-h-screen w-full items-center justify-center sm:h-[700px]"
          style={bgColorStyle}>
          {image && image.asset && image.asset.url && (
            <Image
              src={image?.asset?.url}
              fill={true}
              placeholder="blur"
              blurDataURL={blurred}
              quality={90}
              priority
              alt={image?.alt}
              style={{ opacity: imageOpacity, objectFit: 'cover' }}
            />
          )}
          <div className="z-30 max-w-3xl px-4 text-center" style={textColorStyle}>
            <Content content={content} />
            <nav className="mb-2 mt-6 flex h-full flex-wrap items-center justify-center">
              {buttons?.map((btn, index) => (
                <ButtonRenderer key={index} {...btn} />
              ))}
            </nav>
          </div>
        </section>
      );
    case 'slim-simple':
      return (
        <section
          key={`${props._key}-slim-simple`}
          className="relative flex h-[300px] w-full items-center justify-center bg-accent sm:h-[400px] md:h-[500px]"
          style={bgColorStyle}>
          {image && image.asset && image.asset.url && (
            <Image
              src={image?.asset?.url}
              fill={true}
              placeholder="blur"
              blurDataURL={blurred}
              quality={90}
              priority
              alt={image?.alt}
              style={{ opacity: imageOpacity, objectFit: 'cover' }}
            />
          )}
          <div className="z-30 max-w-3xl px-4 text-center sm:-mt-20" style={textColorStyle}>
            <Content content={content} />
            <nav className="mb-2 mt-4 flex h-full flex-wrap items-center justify-center">
              {buttons?.map((btn, index) => (
                <ButtonRenderer key={`${layout}-${index}`} {...btn} />
              ))}
            </nav>
          </div>
        </section>
      );

    case 'simple-image-right':
      return (
        <section key={props._key} className="relative md:py-16" style={bgColorStyle}>
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-8 md:grid-cols-2 lg:py-16">
            <div
              className="flex flex-col items-center justify-center text-center md:items-start md:text-left"
              style={textColorStyle}>
              <Content content={content} />
              <nav className="mt-6 flex flex-shrink items-center justify-center space-x-4 md:-ml-2 md:justify-start">
                {buttons?.map((btn, index) => (
                  <ButtonRenderer key={`${layout}-${index}`} {...btn} />
                ))}
              </nav>
            </div>
            <div className="mx-8 hidden h-2/5 justify-center md:flex" style={{ opacity: imageOpacity }}>
              {image && image.asset && image.asset.url && (
                <Image
                  src={image?.asset?.url}
                  width={544}
                  height={544}
                  placeholder="blur"
                  blurDataURL={blurred}
                  quality={90}
                  priority
                  alt={image?.alt}
                  style={{ opacity: imageOpacity, objectFit: 'cover' }}
                  className="myShadow h-full w-full rounded-lg"
                />
              )}
            </div>
          </div>
        </section>
      );
    case 'circle-left':
      return (
        <section key={props._key} className="relative md:pb-8" style={bgColorStyle}>
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 md:grid-cols-3 lg:py-16">
            <div className="hidden aspect-square md:block" style={{ opacity: imageOpacity }}>
              {image && image.asset && image.asset.url && (
                <Image
                  src={image?.asset?.url}
                  width={380}
                  height={380}
                  placeholder="blur"
                  blurDataURL={blurred}
                  quality={90}
                  priority
                  alt={image?.alt}
                  style={{ opacity: imageOpacity, objectFit: 'cover' }}
                  className="myShadow h-full w-full rounded-full border-2 border-black"
                />
              )}
            </div>
            <div
              className="col-span-2 flex flex-col items-center justify-center text-center md:items-start md:text-left"
              style={textColorStyle}>
              <Content content={content} />
              <nav className="mt-6 flex flex-shrink items-center justify-center space-x-4 md:-ml-2 md:justify-start">
                {buttons?.map((btn, index) => (
                  <ButtonRenderer key={`${layout}-${index}`} {...btn} />
                ))}
              </nav>
            </div>
          </div>
        </section>
      );

    default:
      return <></>;
  }
};

export default HeroSection;
