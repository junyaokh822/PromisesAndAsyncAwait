// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";

async function getUserData(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3,
  };

  if (typeof id !== "number") {
    throw new Error("It has to be a number.");
  }
  if (id < 1 || id > 10) {
    throw new Error("number isn't within range");
  }

  const dbName = await central(id);
  const [basicInfo, personalInfo] = await Promise.all([
    dbs[dbName](id),
    vault(id),
  ]);

  return { id, ...basicInfo, ...personalInfo };
}

getUserData(3).then((result) => {
  console.log(result);
});
