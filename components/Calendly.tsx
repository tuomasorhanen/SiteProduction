import React, { useEffect } from 'react';
import { InlineWidget } from 'react-calendly';
import { BsFillCalendarCheckFill } from 'react-icons/bs';

import { ICalendly } from '../_lib/types';

declare global {
  interface Window {
    Calendly: any;
  }
}

const Calendly = (props: ICalendly) => {
  const { calendlyLink, layout, title } = props;

  const showCalendly = () => {
    window.Calendly.initPopupWidget({ url: calendlyLink });
    return false;
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  switch (layout) {
    case 'calendly-popup':
      return (
        <div key={props._key}>
          <button
            aria-label="Varaa tapaaminen"
            className="z-50 rounded-full border-white bg-accent p-4 text-white shadow-lg hover:scale-110"
            onClick={showCalendly}
            style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
            <BsFillCalendarCheckFill className="inline-block h-6 w-6" />
          </button>
        </div>
      );
    case 'calendly-right':
    default:
      return (
        <div key={props._key}>
          <InlineWidget url={calendlyLink} />
        </div>
      );
  }
};

export default Calendly;
