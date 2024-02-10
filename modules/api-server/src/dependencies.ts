import { db } from "connectors/db";

export async function initDependencies(): Promise<void> {
  db.initialize()
    .then(() => {
      console.log("Data Source has been initialized!")
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err)
    })
}
