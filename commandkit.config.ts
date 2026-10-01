import { defineConfig } from 'commandkit/config';
import { ratelimit } from '@commandkit/ratelimit';

export default defineConfig({
  plugins: [ratelimit()],
  entrypoints: [
    '!src/app/utils/configuration/serverInfo.json',
    'src/app.ts'
  ]
});
