/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    apiKey: "AIzaSyAIJYUk3pY2Wplh_wgkm3NjuCjBmwyI9T0",
    domain: "todoapp-da7da.firebaseapp.com",
    projectId: "todoapp-da7da",
    bucket: "todoapp-da7da.appspot.com",
    senderId: "329424414271",
    appId: "1:329424414271:web:52af195a26dcac4bcefa8a",
  },
};

module.exports = nextConfig;
