import ServiceReferenceSection from 'components/service/serviceReference';
import TestimonialReferenceSection from 'components/testimonial/testimonialReference';
import { useEffect, useState } from 'react';

import { IGrid, IPost, IService, ITestimonial } from '../../_lib/types';

interface GridSectionProps extends IGrid {}

const ServiceItem = (item: IService) => {
  return <ServiceReferenceSection {...item} />;
};
const TestimonialItem = (item: ITestimonial) => {
  return <TestimonialReferenceSection {...item} />;
};

const GridSection = (props: GridSectionProps) => {
  const { columns, items } = props;

  const [columnStyles, setColumnStyles] = useState({});

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      let numColumns = 1;

      if (screenWidth >= 1920) {
        numColumns = parseInt(columns.extraLarge);
      } else if (screenWidth >= 1100) {
        numColumns = parseInt(columns.large);
      } else if (screenWidth >= 700) {
        numColumns = parseInt(columns.medium);
      } else {
        numColumns = parseInt(columns.small);
      }

      setColumnStyles({ gridTemplateColumns: `repeat(${numColumns}, 1fr)` });
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [columns]);

  const itemsArray = Array.isArray(items) ? items : [items];

  const renderGridItem = (item: IPost | IService) => {
    if (item._type === 'service') {
      return ServiceItem(item as IService);
    } else if (item._type === 'testimonial') {
      return TestimonialItem(item as unknown as ITestimonial);
    } else {
      return <>Empty grid</>;
    }
  };

  return (
    <section>
      <div key={props._key} className="mx-auto grid max-w-7xl gap-8 px-2 sm:px-4 md:px-8" style={columnStyles}>
        {itemsArray.map((item, index) => (
          <div key={`${item._key}-${index}`}>{renderGridItem(item)}</div>
        ))}
      </div>
    </section>
  );
};

export default GridSection;
