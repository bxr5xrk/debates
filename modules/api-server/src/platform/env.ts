export const ENV = {
  NODE_ENV: process.env.NODE_ENV || "development",
  SERVER: {
    PORT: parseInt(process.env.PORT || "3001"),
    HOST: process.env.HOST || "0.0.0.0",
    CORS_ORIGIN: new RegExp(process.env.CORS_ORIGIN || "http://localhost:3000"),
  },
  PG: {
    CONNECTION_STRING: process.env.PG_CONNECTION_STRING
  }
}