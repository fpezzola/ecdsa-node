const express = require("express");
const app = express();
const cors = require("cors");
const signatrues = require("./utils/signatures");
const { toEthAddress } = require("./utils/address");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0x72d12d5ad88ce75a9595763f230d657ae2fba635": 100, //private: f9c233619e13db6fa0d6b7f999cf3032132bd878dad37a634627144100a672bb
  "0x5dd0647f79f584f6c12ad47c083be0d6bc972597": 50, //private: 6737bc6a8f733b3e856c69294ca73438c88e8c41be2c431e99bf32e15750574e
  "0x975b83fa9a84ddf260c82fb190a5170184c4797e": 75, //private: 59fae32a094c0f00aae8bb6c97a8bc2a2f374cdba8997fab10110f1fb54da768
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const {
    tx,
    signature: { hex: signatureHex, recoveryBit },
  } = req.body;

  const message = JSON.stringify(tx);
  const { signature, publicKey } = signatrues.getSignatureAndPublicKey(
    { hex: signatureHex, recoveryBit },
    message
  );

  if (!signatrues.isValidSignature(message, publicKey, signature)) {
    res.status(403).send({ message: "Invalid or empty signature" });
    return;
  }
  const sender = toEthAddress(publicKey);
  const { recipient, amount } = tx;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
