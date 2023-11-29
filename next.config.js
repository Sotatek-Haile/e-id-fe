/** @type {import('next').NextConfig} */

const withNextIntl = require("next-intl/plugin")();

const nextConfig = {
  reactStrictMode: false,
  typescript: {},
  webpack: (config) => {
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil",
    });
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

module.exports = withNextIntl(nextConfig);
