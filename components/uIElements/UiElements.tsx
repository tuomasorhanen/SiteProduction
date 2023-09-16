import React from 'react';

import { IUiElement } from '../../_lib/types';

const UiElement = (props: IUiElement) => {
  const { style } = props;

  switch (style) {
    case 'wave':
      return (
        <section key={props._key} className="relative z-10 bg-transparent" style={{ marginTop: '-20.1%' }}>
          <svg viewBox="0 0 1440 320" style={{ position: 'absolute', top: 0, left: 0 }}>
            <path
              fill="transparent"
              d="M0,288L48,266.7C96,245,192,203,288,197.3C384,192,480,224,576,229.3C672,235,768,213,864,186.7C960,160,1056,128,1152,112C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
          <svg viewBox="0 0 1440 320" style={{ position: 'relative', zIndex: 1 }}>
            <path
              fill="var(--bg-color)"
              d="M0,288L48,266.7C96,245,192,203,288,197.3C384,192,480,224,576,229.3C672,235,768,213,864,186.7C960,160,1056,128,1152,112C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </section>
      );
    case 'wave-two':
      return (
        <div key={props._key} className="relative z-10 bg-transparent" style={{ marginTop: '-8.2%' }}>
          <svg viewBox="0 0 1200 100" style={{ position: 'absolute', top: 0, left: 0 }}>
            <path
              fill="transparent"
              stroke="var(--accent-color)"
              strokeWidth="4"
              d="M0,100 C150,70 250,30 400,20 C550,10 700,40 1200,0"></path>
          </svg>
          <svg viewBox="0 0 1200 100" style={{ position: 'relative', zIndex: 1 }}>
            <path fill="var(--bg-color)" d="M0,100 C150,70 250,30 400,20 C550,10 700,40 1200,0 L1200,100 L0,100"></path>
          </svg>
        </div>
      );

    default:
      return <></>;
  }
};

export default UiElement;
