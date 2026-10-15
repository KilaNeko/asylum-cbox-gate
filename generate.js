javascript
const crypto = require('crypto');
const fs = require('fs');

// Fetch the hidden Cbox secret from GitHub environment variables
const secret = process.env.ASYLUM_CBOX_SECRET;
if (!secret) {
  console.error("Error: ASYLUM_CBOX_SECRET is not set!");
  process.exit(1);
}

const boxid = 3468733;
const boxtag = '326db1';

// We use a wildcard path configuration for dynamic name passing via ProBoards
const path = `/box/?boxid=${boxid}&boxtag=${boxtag}`;

// Generate a secure HMAC SHA256 signature matching Cbox requirements
const sig = crypto.createHmac('sha256', secret)
                  .update(path)
                  .digest('base64');

// Wrap everything into a clean JSON layout file for ProBoards to read
const outputData = {
  boxid: boxid,
  boxtag: boxtag,
  signature: sig
};

fs.writeFileSync('cbox-config.json', JSON.stringify(outputData, null, 2));
console.log("Successfully generated secure Cbox configuration token!");
