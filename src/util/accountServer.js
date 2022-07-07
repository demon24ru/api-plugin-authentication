import mongoConnectWithRetry from "@reactioncommerce/api-core/src/util/mongoConnectWithRetry.js";
import config from "../config.js";


const { MONGO_URL } = config;
let usersMongo;

// eslint-disable-next-line require-jsdoc
export async function init() {
  if (usersMongo) { return usersMongo; }

  const client = await mongoConnectWithRetry(MONGO_URL);

  usersMongo = client.db().collection("users");

  return usersMongo;
}

// eslint-disable-next-line require-jsdoc
export async function resumeSession(userId) {
  const db = await init();
  let user = await db.findOne({ _id: userId });
  if (!user) {
    user = { _id: userId };
    await db.insertOne(user);
  }
  user.id = user._id.toString();
  return user;
}
