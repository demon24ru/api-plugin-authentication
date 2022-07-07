import { resumeSession } from "./accountServer.js";
import { expandAuthToken } from "./oauth2";

/**
 * Given an Authorization Bearer token and the current context, returns the user document
 * for that token after performing token checks.
 *
 * If the provided token is not associated with any user, this function throws an
 * "access-denied" ReactionError.
 * If the provided token has expired, the function skips the user lookup and proceeds
 * as if no token has been provided in the request
 *
 * @name getUserFromAuthToken
 * @method
 * @memberof GraphQL
 * @summary Looks up a user by token
 * @param {String} loginToken Auth token
 * @returns {Object} The user associated with the token
 */
async function getUserFromAuthToken(loginToken) {
  const authToken = loginToken.replace(/bearer\s/gi, "");

  const tokenInfo = await expandAuthToken(authToken);
  if (!tokenInfo) throw new Error("Invalid access token");
  // eslint-disable-next-line no-console,no-alert
  console.log("tokenInfo", tokenInfo);

  const { active, sub: userId } = tokenInfo;
  if (!active) return null;
  if (!userId) return null;

  return resumeSession(userId);
}

export default getUserFromAuthToken;
