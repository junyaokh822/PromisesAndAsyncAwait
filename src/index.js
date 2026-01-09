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

  return {
    id: id,
    name: personalInfo.name,
    username: basicInfo.username,
    email: personalInfo.email,
    address: {
      street: personalInfo.address.street,
      suite: personalInfo.address.suite,
      city: personalInfo.address.city,
      zipcode: personalInfo.address.zipcode,
      geo: {
        lat: personalInfo.address.geo.lat,
        lng: personalInfo.address.geo.lng,
      },
    },
    phone: personalInfo.phone,
    website: basicInfo.website,
    company: {
      name: basicInfo.company.name,
      catchPhrase: basicInfo.company.catchPhrase,
      bs: basicInfo.company.bs,
    },
  };
}

export { getUserData };
