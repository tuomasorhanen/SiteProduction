import React from 'react';

import { IUiElement } from '../../_lib/types';

const UiElement = (props: IUiElement) => {
  const { style } = props;

  const myHexColor = "15375C";

  switch (style) {
    case 'wave':
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
            <path  fill="var(--bg-color)" d="M0,100 C150,70 250,30 400,20 C550,10 700,40 1200,0 L1200,100 L0,100"></path>
          </svg>
        </div>
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
            <path  fill="var(--accent-color)" d="M0,100 C150,70 250,30 400,20 C550,10 700,40 1200,0 L1200,100 L0,100"></path>
          </svg>
        </div>
      );

    default:
      return <></>;
  }
};

export default UiElement;
