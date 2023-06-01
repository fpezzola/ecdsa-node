import server from "./server";
import { secp256k1 } from 'ethereum-cryptography/secp256k1'
import { keccak256 } from 'ethereum-cryptography/keccak'
import { toHex } from 'ethereum-cryptography/utils'

function Wallet({ address, setAddress, balance, setBalance, setPrivateKey,privateKey }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    if (privateKey) {
      const publicKey = secp256k1.getPublicKey(privateKey,false)
      const address = `0x${toHex(keccak256(publicKey.slice(1)).slice(-20))}`
      setAddress(address)
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Your private key
        <input placeholder="Type your private key, for example: 3ce312bac44047a92391c71eb2e295732842bd25941f7b09854b7671012a6a1c" value={privateKey} onChange={onChange}></input>
      </label>

      <label>
        Your address
        <input placeholder="Your address will be derived from your private key." value={address} disabled={true}></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
