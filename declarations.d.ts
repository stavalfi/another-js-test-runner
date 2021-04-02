declare module 'object-deep-contain' {
  export default function (bigObject: unknown, smallerObject: unknown): boolean
}

declare module 'redis-url-parse' {
  export default function (redisUrl: string): { host: string; port: number; database: string; password: string }
}
