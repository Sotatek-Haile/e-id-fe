import CryptoJS from "crypto-js";
/**
 *
 * @param jsonObject
 * @param key
 * @returns
 */
function encrypt(jsonObject: any, key: string) {
  try {
    // Convert the JSON object to a string
    const jsonString = JSON.stringify(jsonObject);
    // Encrypt the JSON string with AES using the provided key
    const encrypted = CryptoJS.AES.encrypt(jsonString, key);
    // The result is an object with a ciphertext property containing the encrypted data
    return encrypted.toString();
  } catch (error) {
    console.error("Encryption error: ", error);
    return null;
  }
}
/**
 *
 * @param encryptedData
 * @param key
 * @returns
 */
function decrypt(encryptedData: string, key: string) {
  try {
    // Decrypt the encrypted data using the provided key
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    // Convert the decrypted data to a string and parse it as JSON
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  } catch (error) {
    console.error("Decryption error: ", error);
    return null;
  }
}

function isNullOrUndefined(value: any) {
  return value === null || value === undefined;
}

function isNullOrUndefinedOrEmpty(value: string) {
  return isNullOrUndefined(value) || value === "";
}

export { encrypt, decrypt, isNullOrUndefined, isNullOrUndefinedOrEmpty };
export * from "./time";
export * from "./string";
