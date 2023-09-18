import { ICarousel } from "_lib/types";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { blurred } from "_lib/sanity-utils";
import ButtonRenderer from "components/ButtonRenderer";

const CarouselComponent = (props: ICarousel) => {
    const [autoPlayActive, setAutoPlayActive] = useState(true);
    const { carouselItems, opacity, image, carouselBgColor, carouselTextColor, buttons } = props;
    const textStyle = carouselTextColor ? { color: carouselTextColor.hex } : {};
    const bgColorStyle = carouselBgColor ? { backgroundColor: carouselBgColor.hex } : {};
    const imageOpacity = opacity ? opacity / 100 : 1;

    const handleUserInteract = () => {
        setAutoPlayActive(false);
      };


  useEffect(() => {
    if (autoPlayActive) {
      // Resume autoPlay after 5 seconds if you want
      const timer = setTimeout(() => setAutoPlayActive(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [autoPlayActive]);

    const renderArrowPrev = (onClickHandler, hasPrev, label) => 
    hasPrev && (
        <div className="hidden sm:block">
        <button 
            type="button" 
            onClick={() => { onClickHandler(); handleUserInteract(); }} 
            title={label} 
            className="absolute z-10 top-1/2 left-0 ml-3 -mt-5 lg:ml-5 hover:bg-accent hover:text-white hover:rounded-full p-2 transition-all duration-300 ease-in-out">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6" style={textStyle}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
        </button>
        </div>
    );

const renderArrowNext = (onClickHandler, hasNext, label) => 
    hasNext && (
        <div className="hidden sm:block">
        <button 
            type="button" 
            onClick={() => { onClickHandler(); handleUserInteract(); }} 
            title={label} 
            className="absolute z-10 top-1/2 right-0 mr-3 -mt-5 lg:mr-5 hover:bg-accent hover:text-white hover:rounded-full p-2 transition-all duration-300 ease-in-out">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6" style={textStyle}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
        </button>
        </div>
    );

    return (
        <div className="flex items-center justify-center z-0 min-h-screen relative" style={bgColorStyle}>
            {image && image.asset && image.asset.url && (
                <Image
                    src={image.asset.url}
                    layout="fill"
                    objectFit="cover"
                    quality={90}
                    placeholder="blur"
                    blurDataURL={blurred}
                    alt={image.alt}
                    style={{ opacity: imageOpacity, objectFit: 'cover' }}
                    />
            )}
    
            <div className="absolute top-0 left-0 w-full h-full">
                <Carousel 
                    showThumbs={false}
                    showStatus={false}
                    showIndicators={false}
                    autoPlay={autoPlayActive}
                    onSwipeStart={handleUserInteract}

                    onClickItem={handleUserInteract}
                    onClickThumb={handleUserInteract}
                    interval={5000}
                    infiniteLoop={true}
                    renderArrowPrev={renderArrowPrev}
                    renderArrowNext={renderArrowNext}
                    className="w-full h-screen flex justify-center items-center"
                >
                    {carouselItems.map((item: { title: string, description: string }, index: number) => (
                        <div key={index} className="flex items-center justify-center h-full w-full max-w-3xl mx-auto px-4">
                            <div className="z-10 text-center">
                                <h1 className="" style={textStyle}>{item.title}</h1>
                                <h4 className="" style={textStyle}>{item.description}</h4>
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
            <div className="absolute bottom-0 left-0 w-full h-2 bg-transparent">
        <div
          className="h-2 bg-accent"
          style={{
            animation: autoPlayActive ? 'lineGrow 5s linear infinite' : 'none',
          }}
        ></div>
      </div>
        </div>
    );
    
};

export default CarouselComponent;
