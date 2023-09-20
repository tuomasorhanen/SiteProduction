import { type } from 'os';
import { PortableTextBlock } from 'sanity';

export type ISiteSettings = {
  accentColor: IColor;
  _id: string;
  title: string;
  description: string;
  logo: any;
  textColor: IColor;
  bgColor: IColor;
  blogPage: boolean;
  blogMenuOrder: number;
};

export type ICarousel = {
  _id: string;
  _key: string;
  _type: string;
  title: string;
  image: any;
  opacity?: number;
  customColor?: boolean;
  carouselTextColor?: IColor;
  carouselBgColor?: IColor;  
  carouselItems: { title: string, description: string }[];
  buttons?: ICallToAction[];
};

export type IColor = {
  alpha: number;
  hex: string;
};

export type IMenuProps = {
  items: IMenuItem[];
  _key?: string;
  heroBgColor?: string;
  settings: ISiteSettings;
};

export type ISpacer = {
  _key: string;
  Size: 'small' | 'medium' | 'large';
};

export type IPage = {
  _id: string;
  _rev: string;
  _type: 'page';
  name: string;
  menuOrder?: number;
  menuColor?: string;
  content: IHeadingAndTitle[] | IHero[] | IGrid[] | IUiElement[] | IService[] | IPost[];
};

export type IService = {
  _key: string;
  _id: string;
  _type: 'service';
  title: string;
  slug: ISlug;
  content: PortableTextBlock[];
  mainImage: any;
};
export type ITestimonial = {
  _key: string;
  _id: string;
  _type: 'service';
  title: string;
  slug: ISlug;
  content: PortableTextBlock[];
  mainImage: any;
};

export type ICallToAction = {
  _key: any;
  _id: string;
  _type: string;
  callToAction: string;
  navigateToPage?: string;
  navigateToUrl?: string;
  linkType: string;
  buttonContent: string;
  image?: any;
  backgroundColor?: string;
  textColor?: string;
  customColor?: boolean;
  chosenCustomColor?: IColor;
  border?: boolean;
  borderColor: string;
};

export type IUiElement = {
  _key: string;
  _type: 'uiElement';
  style: 'wave' | 'wave-two' | 'slice';
};

export type ICustomButton = {
  _id: string;
  _key: string;
  buttons: ICallToAction[];
};

export type IHero = {
  _id: string;
  _key: string;
  _type: string;
  content: PortableTextBlock[];
  image?: any;
  buttons?: ICallToAction[];
  layout: 'image-bg-center' | 'simple-image-right' | 'circle-left' | 'slim-simple';
  opacity?: number;
  heroTextColor?: IColor;
  heroBgColor?: IColor;
};

export type IGrid = {
  _id: string;
  _key: string;
  title: string;
  columns: IColumns;
  items: IService[] | IPost[];
};

export type IMenuItem = {
  name: string;
  slug: ISlug;
  menuOrder: number;
};

export type ICalendly = {
  _key: string;
  _id: string;
  _type: string;
  title: string;
  calendlyLink: string;
  layout: 'calendly-right' | 'calendly-left' | 'calendly-popup';
  content?: any;
  buttons?: ICallToAction[];
};

export type IPageProps = {
  name?: string;
  title?: string;
  description?: string;
  content: IHero[] | IHeadingAndTitle[] | IService[];
  menu: IMenuItem[];
  blogs: IPost[];
  categories: ICategory[];
  settings: ISiteSettings;
  menuColor?: string;
  notFound?: boolean;
};

export type IColumns = {
  small: string;
  medium: string;
  large: string;
  extraLarge: string;
};

export type IHeadingAndTitle = {
  _id: string;
  _type: string;
  _key: string;
  content: PortableTextBlock[];
  style: 'centered' | 'left-aligned';
};

export type IPost = {
  _type: string;
  _key: string;
  title: string;
  slug: ISlug;
  person: IPerson;
  mainImage: any;
  categories: ICategory[];
  excerpt: string;
  publishedAt: string;
  readingTime: string;
  content?: any;
};

export type IPerson = {
  _id: string;
  _type: 'person';
  name: string;
  role: string;
  image: any;
  number?: string;
  email?: string;
};

export type ICategory = {
  _key: string;
  _ref: string;
  _id: string;
  _type: 'category';
  name: string;
  description?: string;
};

export type IReference = {
  _id: string;
  _ref: string;
  _type: string;
};

export type ISlug = {
  current: string;
};
