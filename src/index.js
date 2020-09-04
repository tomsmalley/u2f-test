import TransportU2F from "@ledgerhq/hw-transport-u2f";
import TransportWebHID from "@ledgerhq/hw-transport-webhid";
import TransportWebUSB from "@ledgerhq/hw-transport-webusb";
import TransportWebAuthn from "@ledgerhq/hw-transport-webauthn";
import Ledger from "@ledgerhq/hw-app-avalanche";

async function testLedger(transport) {
  console.log('Creating ledger...');
  const ledger = new Ledger(transport);
  console.log('Getting wallet ID...');
  const device_wallet_id = await ledger.getWalletId().catch(console.error);
  console.log(device_wallet_id.toString("hex"));
  console.log('done');
}

async function testTransport(name, Transport) {
  const supported = await Transport.isSupported();
  if (!supported) {
    console.log(name, "is not supported");
    return;
  }
  console.log(name, "is supported");
  const transport = await Transport.create().catch(console.error);
  if (transport === undefined) {
    console.log("Failed to create transport for", name);
  } else {
    await testLedger(transport);
  }
}

async function test_u2f() {
  await testTransport("U2F", TransportU2F);
}

async function test_webauthn() {
  await testTransport("WebAuthn", TransportWebAuthn);
}

async function test_hid() {
  await testTransport("WebHID", TransportWebHID);
}

async function test_usb() {
  await testTransport("WebUSB", TransportWebUSB);
}

document.querySelector('#u2f').onclick = test_u2f;
document.querySelector('#hid').onclick = test_hid;
document.querySelector('#usb').onclick = test_usb;
document.querySelector('#authn').onclick = test_authn;
