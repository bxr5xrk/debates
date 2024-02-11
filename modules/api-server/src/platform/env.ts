export const ENV = {
  NODE_ENV: process.env.NODE_ENV || "development",
  SERVER: {
    PORT: parseInt(process.env.PORT || "3001"),
    HOST: process.env.HOST || "127.0.0.1",
    CORS_ORIGIN: new RegExp(process.env.CORS_ORIGIN || "http://127.0.0.1:3000"),
  },
  PG: {
    CONNECTION_STRING: process.env.PG_CONNECTION_STRING
  }
}