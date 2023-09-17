import { IHeadingAndTitle, IHero, IService } from '../_lib/types';
import CalendlySection from './calendly/CalendlySection';
import GridSection from './grid/GridSection';
import HeadingAndTitle from './headingandTitle/HeadingAndTitle';
import HeroSection from './hero/HeroSection';
import CustomButton from './landingPage/CustomButton';
import Service from './service/Service';
import Spacer from './Spacer';
import UiElement from './uIElements/UiElements';

type IMapContentProps = {
  content: IHero[] | IHeadingAndTitle[] | IService[];
};

const MapContent = ({ content }: IMapContentProps) => {
  return (
    <div className="mx-auto overflow-hidden">
      {content?.map(item => {
        switch (item._type) {
          case 'hero':
            return <HeroSection key={item._key} {...item} />;
          case 'grid':
            return <GridSection key={item._key} {...item} />;
          case 'headingAndTitle':
            return <HeadingAndTitle key={item._key} {...item} />;
          case 'uiElement':
            return <UiElement key={item._key} {...item} />;
          case 'customButton':
            return <CustomButton key={item._key} {...item} />;
          case 'spacer':
            return <Spacer key={item._key} {...item} />;
          case 'service':
            return <Service key={item._key} {...item} />;
          case 'calendly':
            return <CalendlySection key={item._key} {...item} />;
          default:
            break;
        }
      })}
    </div>
  );
};

export default MapContent;
