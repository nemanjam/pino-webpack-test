const { PinoWebpackPlugin } = require("pino-webpack-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, context) => {
    config.plugins.push(
      new PinoWebpackPlugin({
        transports: ['pino-pretty', `${__dirname}/modules/logger/transport.js`],
      })
    );

    return config;
  },
};

module.exports = nextConfig;
