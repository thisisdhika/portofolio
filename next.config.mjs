import million from 'million/compiler'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
}

const millionConfig = {
  auto: {
    threshold: 0.05, // default: 0.1,
    skip: [], // default []
    // if you're using RSC: auto: { rsc: true },
  },
}

export default million.next(nextConfig, millionConfig)
