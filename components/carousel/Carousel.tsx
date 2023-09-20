import { ICarousel } from '_lib/types';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { blurred } from '_lib/sanity-utils';
import ButtonRenderer from 'components/ButtonRenderer';

const CarouselComponent = (props: ICarousel) => {
  const [autoPlayActive, setAutoPlayActive] = useState(true);
  const nextBtnRef = useRef<HTMLButtonElement | null>(null);
  const { carouselItems, opacity, image, carouselBgColor, carouselTextColor, buttons } = props;
  const textStyle = carouselTextColor ? { color: carouselTextColor.hex } : {};
  const bgColorStyle = carouselBgColor ? { backgroundColor: carouselBgColor.hex } : {};
  const imageOpacity = opacity ? opacity / 100 : 1;
  const [progress, setProgress] = useState(0);

  // Resetting progress and autoPlayActive
  const resetTimer = () => {
    setProgress(0);
    setAutoPlayActive(true);
  };

  const handleUserInteract = () => {
    setAutoPlayActive(false);
    setProgress(0);
  };

  useEffect(() => {
    let timer;
    let progressTimer;

    if (autoPlayActive && nextBtnRef.current) {
      timer = setInterval(() => {
        nextBtnRef.current?.click();
        resetTimer();
      }, 5000);

      progressTimer = setInterval(() => {
        setProgress(prev => (prev >= 100 ? 0 : prev + 2));
      }, 100);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
      if (progressTimer) {
        clearInterval(progressTimer);
      }
    };
  }, [autoPlayActive]);

  const renderArrowPrev = (onClickHandler, hasPrev, label) =>
    hasPrev && (
      <div className="hidden sm:block">
        <button
          type="button"
          onClick={() => {
            onClickHandler();
            handleUserInteract();
          }}
          title={label}
          className="absolute left-0 top-1/2 z-10 -mt-5 ml-3 p-2 transition-all duration-300 ease-in-out hover:rounded-full hover:bg-accent hover:text-white lg:ml-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
            style={textStyle}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
    );

  const renderArrowNext = (onClickHandler, hasNext, label) =>
    hasNext && (
      <div className="hidden sm:block">
        <button
          ref={nextBtnRef}
          type="button"
          onClick={() => {
            onClickHandler();
            handleUserInteract();
          }}
          title={label}
          className="absolute right-0 top-1/2 z-10 -mt-5 mr-3 p-2 transition-all duration-300 ease-in-out hover:rounded-full hover:bg-accent hover:text-white lg:mr-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
            style={textStyle}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    );

  return (
    <div className="relative z-0 flex min-h-screen items-center justify-center" style={bgColorStyle}>
      {image && image.asset && image.asset.url && (
        <Image
          src={image.asset.url}
          fill={true}
          quality={90}
          placeholder="blur"
          blurDataURL={blurred}
          alt={image.alt}
          style={{ opacity: imageOpacity, objectFit: 'cover' }}
        />
      )}

      <div className="absolute left-0 top-0 h-full w-full">
        <Carousel
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          onSwipeStart={handleUserInteract}
          onClickItem={handleUserInteract}
          onClickThumb={handleUserInteract}
          infiniteLoop={true}
          renderArrowPrev={renderArrowPrev}
          renderArrowNext={renderArrowNext}
          className="flex h-screen w-full items-center justify-center">
          {carouselItems.map((item: { title: string; description: string }, index: number) => (
            <div key={index} className="mx-auto flex h-full w-full max-w-3xl items-center justify-center px-4">
              <div className="z-10 text-center">
                <h1 className="" style={textStyle}>
                  {item.title}
                </h1>
                <h4 className="" style={textStyle}>
                  {item.description}
                </h4>
                <nav className="mb-2 mt-6 flex h-full flex-wrap items-center justify-center">
                  {buttons?.map((btn, index) => (
                    <ButtonRenderer key={index} {...btn} />
                  ))}
                </nav>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      <div className="absolute top-0 left-0 h-2 w-full bg-transparent sm:top-auto sm:bottom-0">
  <div
    className="h-2 bg-accent"
    style={{
      width: `${progress}%`,
      transition: 'width 0.1s ease',
    }}
  ></div>
</div>

    </div>
  );
};

export default CarouselComponent;
