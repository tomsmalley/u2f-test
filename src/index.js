import TransportU2F from "@ledgerhq/hw-transport-u2f";
import TransportWebHID from "@ledgerhq/hw-transport-webhid";
import TransportWebUSB from "@ledgerhq/hw-transport-webusb";
import Ledger from "@ledgerhq/hw-app-avalanche";

async function test_ledger(transport) {
  console.log('Creating ledger...');
  const ledger = new Ledger(transport);
  console.log('Getting wallet ID...');
  const device_wallet_id = await ledger.getWalletId().catch(console.error);
  console.log(device_wallet_id.toString("hex"));
  console.log('done');
}

async function test_u2f() {
  const U2FSupported = await TransportU2F.isSupported();
  if (!U2FSupported) {
    console.log("U2F is not supported");
    return;
  }
  console.log('U2F is supported');
  const transport = await TransportU2F.create();
  await test_ledger(transport);
}

async function test_hid() {
  const WebHIDSupported = await TransportWebHID.isSupported();
  if (!WebHIDSupported) {
    console.log("WebHID is not supported");
    return;
  }
  console.log('WebHID is supported');
  const transport = await TransportWebHID.create();
  await test_ledger(transport);
}

async function test_usb() {
  const WebUSBSupported = await TransportWebUSB.isSupported();
  if (!WebUSBSupported) {
    console.log("WebUSB is not supported");
    return;
  }
  console.log('WebUSB is supported');
  const transport = await TransportWebUSB.create().catch(console.error);
  if (transport === undefined) {
    console.log("Failed to create transport");
    return;
  }
  await test_ledger(transport);
}

document.querySelector('#u2f').onclick = test_u2f;
document.querySelector('#hid').onclick = test_hid;
document.querySelector('#usb').onclick = test_usb;

