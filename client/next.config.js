module.exports = {
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ignored: ['**/node_modules/'],
        poll: 300,
      };
    }

    return config;
  }
};
