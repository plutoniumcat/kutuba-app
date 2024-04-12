import type { Config } from 'drizzle-kit';

export default {
  schema: './src/schema/*',
  out: './drizzle',
  driver: 'expo',
  breakpoints: true,
} satisfies Config;