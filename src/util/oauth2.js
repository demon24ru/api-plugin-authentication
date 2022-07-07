import { URL } from "url";
import fetch from "node-fetch";
import config from "../config.js";

const {
  MOCK_TLS_TERMINATION,
  OAUTH2_ADMIN_URL
} = config;

let mockTlsTermination = {};
if (MOCK_TLS_TERMINATION) {
  mockTlsTermination = {
    "X-Forwarded-Proto": "https"
  };
}

const makeAbsolute = (relativeUrl, baseUrl) => {
  const url = new URL(relativeUrl, baseUrl);
  return url.href;
};


/**
 * @summary Given an Authorization bearer token it returns a JSON object with user
 *   properties and claims found
 * @param {String} token Auth token
 * @returns {Object} JSON object
 */
export async function expandAuthToken(token) {
  const response = await fetch(makeAbsolute("/oauth2/introspect", OAUTH2_ADMIN_URL), {
    headers: { "Content-Type": "application/x-www-form-urlencoded", ...mockTlsTermination },
    method: "POST",
    body: `token=${encodeURIComponent(token)}`
  });

  if (!response.ok) {
    throw new Error("access-denied: Error introspecting token");
  }

  return response.json();
}
