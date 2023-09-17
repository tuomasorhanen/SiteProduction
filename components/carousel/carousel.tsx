import { Swiper, SwiperSlide } from 'swiper/react';
import { Content } from 'components/Content';
import ButtonRenderer from 'components/ButtonRenderer';
import MyImage from 'components/MyImage';

const Carousel = ({ items }) => {
  return (
    <div className="swiper-container">
      <Swiper pagination={{ clickable: true }} navigation>
        {items.map((item, index) => {
          const textColorStyle = { color: item.heroTextColor.hex };
          const bgColorStyle = {
            backgroundColor: item.heroBgColor.hex,
            opacity: item.opacity / 100,
          };
          return (
            <SwiperSlide key={index}>
              <section
                className="relative flex aspect-square max-h-screen w-full items-center justify-center sm:h-[700px]"
                style={bgColorStyle}
              >
                <div className="absolute left-0 top-0 z-10 h-full w-full">
                  {item.image && (
                    <MyImage
                      {...item.image}
                      className="h-full w-full object-cover"
                      alt=""
                      style={{ opacity: item.opacity / 100 }}
                    />
                  )}
                </div>
                <div className="z-30 max-w-3xl px-4 text-center" style={textColorStyle}>
                  <Content content={item.content} />
                  <nav className="mb-2 mt-6 flex h-full flex-wrap items-center justify-center">
                    {item.buttons?.map((btn, btnIndex) => (
                      <ButtonRenderer key={btnIndex} {...btn} />
                    ))}
                  </nav>
                </div>
              </section>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Carousel;
