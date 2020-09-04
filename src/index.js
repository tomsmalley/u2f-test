import _ from 'lodash';
import TransportU2F from "@ledgerhq/hw-transport-u2f";
import Ledger from "@ledgerhq/hw-app-avalanche";

function component() {
  const element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());

async function test_u2f() {
  var U2FSupported = await TransportU2F.isSupported();
  if (!U2FSupported) {
    console.log("U2F is not supported");
    return;
  }
  console.log('U2F is supported');
  console.log('Creating transport...');
  const transport = await TransportU2F.create();
  console.log('Creating ledger...');
  const ledger = new Ledger(transport);
  console.log('Getting wallet ID...');
  const device_wallet_id = await ledger.getWalletId().catch(e => console.error("[Skipped: Couldn't get wallet ID]:", e, e.originalError));
  console.log(device_wallet_id.toString("hex"));
  console.log('done');
}

test_u2f()
