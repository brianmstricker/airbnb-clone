/** @type {import('next').NextConfig} */
const nextConfig = {
 images: {
  domains: [
   "avatars.githubusercontent.com",
   "airbnb-clone-storage-bucket.s3.amazonaws.com",
   "lh3.googleusercontent.com",
  ],
 },
 webpack: (config, { webpack, isServer, nextRuntime }) => {
  // Avoid AWS SDK Node.js require issue
  if (isServer && nextRuntime === "nodejs")
   config.plugins.push(
    new webpack.IgnorePlugin({
     resourceRegExp: /^(aws-crt|@aws-sdk\/signature-v4-crt)$/,
    })
   );
  return config;
 },
};

module.exports = nextConfig;
