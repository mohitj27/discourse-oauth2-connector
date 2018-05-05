declare namespace NodeJS {
  interface ProcessEnv {
    DISCOURSE_SITE_URL: string
    ONEAUTH_CLIENT_ID: string
    ONEAUTH_CLIENT_SECRET: string
    SERVER_URL: string
  }
}