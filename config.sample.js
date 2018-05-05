process.env.PORT =  process.env.PORT || 2727
process.env.HOST =  process.env.HOST || 'localhost'
// process.env.SCHEME = 'https'
process.env.SERVER_URL = process.env.SERVER_URL ||
  `${process.env.SCHEME || 'http'}://` + `${process.env.HOST}:${process.env.PORT}`

process.env.SESSION_SECRET =  'hush hush baby'
process.env.ONEAUTH_CLIENT_ID =  '11111'
process.env.ONEAUTH_CLIENT_SECRET =  '23KHGK23H5G23KJG32KJ423'
process.env.DISCOURSE_SSO_SECRET =  'you cant see me'
process.env.DISCOURSE_SITE_URL = 'https://discuss.codingblocks.com'

console.log(process.env.SERVER_URL)