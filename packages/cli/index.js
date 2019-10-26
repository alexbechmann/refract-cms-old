module.exports = {
  configureCli: config => ({
    ...config,
    path: (config.path || "/").replace(/\/$/, "")
  })
};
