require("dotenv").config();

module.exports = {
  env: {
    apiKeyCms: process.env.API_KEY,
    write_Api: process.env.X_WRITE_API_KEY,
    blogEndPoint: "https://next-ts.microcms.io/api/v1/blog",
    tagsEndPoint: "https://next-ts.microcms.io/api/v1/tags",
    userEndPoint: "https://next-ts.microcms.io/api/v1/user",
    infoEndPoint: "https://next-ts.microcms.io/api/v1/information",
    portfolioEndPoint: "https://next-ts.microcms.io/api/v1/portfolio",
    contactEndPoint: "https://next-ts.microcms.io/api/v1/contacts",
  },
  images: {
    domains: ["images.microcms-assets.io"],
  },
};
