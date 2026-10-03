import { configureRatelimit } from "@commandkit/ratelimit";

configureRatelimit({
  defaultLimiter: {
    maxRequests: 1,
    interval: '1m',
    scope: 'user-guild',
    algorithm: 'fixed-window'
  }
})

export const metadata = { ratelimit: true }