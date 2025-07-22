export const coordinates = {
  latitude: 41.258961,
  longitude: -95.854362,
};

export const APIkey = "4cc4fea19f1c3c095f0356b195740445";

export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.wtwr.nard.ca"
    : "http://localhost:3001";
