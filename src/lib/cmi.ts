import crypto from "crypto";

export const CMI_CONFIG = {
  // These will be replaced by actual credentials from .env later
  client_id: process.env.CMI_CLIENT_ID || "600000000", 
  store_key: process.env.CMI_STORE_KEY || "123456789",
  gateway_url: process.env.CMI_GATEWAY_URL || "https://testpayment.cmi.co.ma/fim/est3Dgate",
};

/**
 * Generates the SHA512 hash required by CMI for the request.
 */
export function generateCmiHash(params: Record<string, string>, storeKey: string): string {
  // 1. Sort the keys alphabetically (case-insensitive usually, but CMI requires specific handling: sort by key name)
  const sortedKeys = Object.keys(params).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  
  // 2. Concatenate values (ignoring hash and encoding parameters)
  let concatenatedString = "";
  for (const key of sortedKeys) {
    if (key !== "hash" && key !== "encoding") {
      const value = params[key];
      if (value !== undefined && value !== null && value !== "") {
        // CMI requires escaping | and \ in values, but for basic standard params it's usually just the value
        let escapedValue = value.replace(/\\/g, "\\\\").replace(/\|/g, "\\|");
        concatenatedString += escapedValue + "|";
      }
    }
  }

  // 3. Append the StoreKey
  concatenatedString += storeKey;

  // 4. Generate Base64 encoded SHA512 hash
  const binaryHash = crypto.createHash("sha512").update(concatenatedString, "utf8").digest();
  return binaryHash.toString("base64");
}

/**
 * Verifies the callback hash from CMI
 */
export function verifyCmiHash(params: Record<string, string>, storeKey: string, receivedHash: string): boolean {
  const calculatedHash = generateCmiHash(params, storeKey);
  return calculatedHash === receivedHash;
}
