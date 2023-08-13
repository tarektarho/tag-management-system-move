/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/en", // default to english page
        permanent: true,
      },
    ]
  },
  experimental: {
    serverActions: true,
    appDir: true,
  },
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ["en-US", "fr", "nl-NL"],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: "en-US",
  },
}

module.exports = nextConfig
