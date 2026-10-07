import { defineConfig } from 'commandkit/config';
import { ratelimit } from '@commandkit/ratelimit';
import { yangonKit } from 'yangonkit';

export default defineConfig({
  plugins: [ratelimit(), yangonKit()],
  entrypoints: [
    '!src/app/utils/configuration/serverInfo.json',
    'src/app.ts'
  ]
});
