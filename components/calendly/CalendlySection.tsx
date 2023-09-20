import ButtonRenderer from 'components/ButtonRenderer';
import Calendly from 'components/Calendly';
import { Content } from 'components/Content';

import { ICalendly } from '../../_lib/types';

const CalendlySection = (props: ICalendly) => {
  const { buttons, layout, content } = props;

  switch (layout) {
    case 'calendly-popup':
      return (
        <div key={props._key}>
          <Calendly {...props} />
        </div>
      );
    case 'calendly-right':
      return (
        <div key={props._key} className="mx-auto flex max-w-7xl flex-col md:flex-row md:space-x-6 md:py-16">
          <div className="mx-auto max-w-4xl px-8 text-center md:w-1/2 md:place-self-center md:text-left">
            <Content content={content} />
            <div className="mb-4 flex justify-center space-y-2 md:flex md:justify-start md:space-x-2 md:space-y-0">
              {buttons && buttons.map(btn => <ButtonRenderer key={`${layout}-${btn.callToAction}`} {...btn} />)}
            </div>
          </div>
          <div className="p-4 shadow-md shadow-gray-500 md:w-1/2 md:p-8">
            <div>
              <Calendly {...props} />
            </div>
          </div>
        </div>
      );
    default:
      return <></>;
  }
};

export default CalendlySection;
