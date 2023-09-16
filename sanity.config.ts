import { defineConfig } from 'sanity';
import { colorInput } from '@sanity/color-input';
import { deskTool } from 'sanity/desk';
import { schema } from './sanity/Schemas/schema';
import { structure } from './sanity/Schemas/types/structure';

export default defineConfig({
  basePath: '/studio',
  dataset: 'production',
  projectId: '0ciqok3x',
  schema,
  plugins: [deskTool({ structure }), colorInput()],
});
