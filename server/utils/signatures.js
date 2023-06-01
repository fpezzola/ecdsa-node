const { secp256k1: secp } = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");

function getSignatureAndPublicKey({ hex: signatureHex, recoveryBit }, message) {
  let signature = secp.Signature.fromCompact(signatureHex);
  signature = signature.addRecoveryBit(recoveryBit);
  const publicKey = signature
    .recoverPublicKey(hashMessage(message))
    .toHex(false);
  return { signature, publicKey };
}

function hashMessage(message) {
  const bytes = utf8ToBytes(message);
  return keccak256(bytes);
}

function isValidSignature(message, pubKey, signature) {
  const hashedMessage = hashMessage(message);
  try {
    return secp.verify(signature, hashedMessage, pubKey);
  } catch (e) {
    console.error(e);
    return false;
  }
}

module.exports = { isValidSignature, getSignatureAndPublicKey };
