import { defineConfig } from 'commandkit/config';

export default defineConfig({
  entrypoints: [
    '!src/app/utils/configuration/serverInfo.json',
    'src/app.ts'
  ]
});
