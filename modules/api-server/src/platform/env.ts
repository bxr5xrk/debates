export const ENV = {
  NODE_ENV: process.env.NODE_ENV || "development",
  SERVER: {
    PORT: parseInt(process.env.PORT || "3001"),
    HOST: process.env.HOST || "127.0.0.1",
    CORS_ORIGIN: new RegExp(process.env.CORS_ORIGIN || "http://127.0.0.1:3000"),
  },
  UPLOAD_IMAGE_API_KEY: process.env.UPLOAD_IMAGE_API_KEY,
  PG: {
    CONNECTION_STRING: process.env.PG_CONNECTION_STRING,
    HOST: process.env.POSTGRESDB_HOST || "localhost",
    PORT: parseInt(process.env.POSTGRESDB_LOCAL_PORT || "5432"),
    USER: process.env.POSTGRESDB_USER,
    PASSWORD: process.env.POSTGRESDB_ROOT_PASSWORD,
    DATABASE: process.env.POSTGRESDB_DATABASE,
  }
}
