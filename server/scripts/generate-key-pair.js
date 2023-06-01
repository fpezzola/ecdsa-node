const { secp256k1: secp } = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { toEthAddress } = require("../utils/address");

const privateKey = secp.utils.randomPrivateKey();
const publicKey = secp.getPublicKey(privateKey, false);

console.log("private key", toHex(privateKey));
console.log("public key", toHex(publicKey));
console.log("ethereum address", toEthAddress(publicKey));
