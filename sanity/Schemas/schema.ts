import { SchemaTypeDefinition } from 'sanity';
import siteSettings from './Site Settings/siteSettings';
import service from './Service/service';
import post from './Blog/post';
import category from './Blog/category';
import testimonial from './Testimonial/testimonial';
import Hero from './types/Hero';
import Calendly from './types/calendly';
import columns from './types/columns';
import CustomButton from './types/customButton';
import grid from './types/grid';
import lineBreak from './types/lineBreak';
import spacer from './types/spacer';
import textContent from './types/textContent';
import uiElement from './types/uiElement';
import Person from './Blog/Person';
import Page from './PageBuilder/Page';
import LandingPage from './PageBuilder/LandingPage';
import carousel from './types/carousel';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    //Documents
    siteSettings,
    Page,
    service,
    post,
    testimonial,

    //Objects
    textContent,
    columns,
    CustomButton,
    grid,
    Hero,
    lineBreak,
    uiElement,
    spacer,
    category,
    Calendly,
    Person,
    LandingPage,
    carousel,
  ],
};
