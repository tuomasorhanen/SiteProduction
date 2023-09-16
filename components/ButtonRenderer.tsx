import Image from 'next/image';
import Link from 'next/link';

import { ICallToAction } from '../_lib/types';
const ButtonRenderer = (props: ICallToAction) => {
  const {
    _key,
    callToAction,
    linkType,
    backgroundColor,
    textColor,
    image,
    navigateToPage,
    navigateToUrl,
    customColor,
    chosenCustomColor,
    border,
    borderColor,
  } = props;

  const getCssVar = (color: string) => {
    switch (color) {
      case 'background':
        return 'var(--bg-color)';
      case 'text':
        return 'var(--text-color)';
      case 'accent':
        return 'var(--accent-color)';
      default:
        return color;
    }
  };

  const buttonStyle: any = {
    backgroundColor: customColor && chosenCustomColor ? chosenCustomColor.hex : getCssVar(backgroundColor || ''),
    color: getCssVar(textColor || ''),
  };

  if (border) {
    buttonStyle.border = `1px solid ${getCssVar(borderColor)}`;
  }

  if (linkType === 'internal') {
    return (
      <Link href={navigateToPage || '/etusivu'}>
        {image ? (
          <Image
            src={image.asset.url}
            width={50}
            height={50}
            placeholder="empty"
            alt={image.alt}
            priority
            style={{ objectFit: 'cover' }}
            className={`mx-2 hover:scale-105`}
          />
        ) : (
          <span className={`button`} style={buttonStyle}>
            {callToAction}
          </span>
        )}
      </Link>
    );
  } else if (linkType === 'external') {
    return (
      <a href={navigateToUrl}>
        {image ? (
          <Image
            src={image.asset.url}
            width={50}
            height={50}
            placeholder="empty"
            alt={image.alt}
            priority
            style={{ objectFit: 'cover' }}
            className={`mx-2 hover:scale-105`}
          />
        ) : (
          <span className={`button`} style={buttonStyle}>
            {callToAction}
          </span>
        )}
      </a>
    );
  }
  return null;
};

export default ButtonRenderer;
