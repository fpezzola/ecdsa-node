import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes, toHex } from "ethereum-cryptography/utils";
import { secp256k1 as secp } from "ethereum-cryptography/secp256k1";
function hashMessage(message) {
  const bytes = utf8ToBytes(message);
  return keccak256(bytes);
}

function sign(message, privateKey) {
  return secp.sign(hashMessage(message), privateKey);
}

function recoverPublicKey(signature, message) {
  const hashedMessage = hashMessage(message);
  return signature.recoverPublicKey(toHex(hashedMessage)).toHex(false);
}

export { sign, recoverPublicKey };
