import { SchemaTypeDefinition } from 'sanity';
import siteSettings from './Site Settings/siteSettings';
import columns from './types/columns';
import CustomButton from './types/customButton';
import grid from './types/grid';
import lineBreak from './types/lineBreak';
import uiElement from './types/uiElement';
import Hero from './types/Hero';
import spacer from './types/spacer';
import textContent from './types/textContent';
import pricing from './types/pricing';
import service from './Service/service';
import post from './Blog/post';
import category from './Blog/category';
import testimonial from './Testimonial/testimonial';
import Calendly from './types/calendly';
import Page from './Page Builder/Page';
import person from './Blog/Person';
import landingPage from './Page Builder/LandingPage';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    //Documents
    Page,
    siteSettings,
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
    pricing,
    category,
    Calendly,
    person,
    landingPage,
  ],
};
