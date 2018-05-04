process.env = Object.assign(process.env, {
  PORT: process.env.PORT || 2727,
  HOST: process.env.HOST || 'http://localhost:2727',
  SESSION_SECRET: 'hush hush baby',
  ONEAUTH_CLIENT_ID: '11111',
  ONEAUTH_CLIENT_SECRET: '23KHGK23H5G23KJG32KJ423',
  DISCOURSE_SSO_SECRET: 'you cant see me'
})