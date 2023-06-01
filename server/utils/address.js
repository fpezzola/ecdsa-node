const { toHex, hexToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

function toEthAddress(pubKey) {
  if (typeof pubKey === "string") {
    pubKey = hexToBytes(pubKey);
    console.log(pubKey);
  }
  const ethereumAddress = toHex(keccak256(pubKey.slice(1)).slice(-20));
  return `0x${ethereumAddress}`;
}

module.exports = { toEthAddress };
