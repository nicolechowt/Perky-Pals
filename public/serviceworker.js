// urlB64ToUint8Array is a magic function that will encode the base64 public key
// to Array buffer which is needed by the subscription option
const urlB64ToUint8Array = base64String => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}
const saveSubscription = async subscription => {
  const SERVER_URL = 'https://suspicious-poincare-b31318.netlify.app/.netlify/functions/api/save-subscription'
  const response = await fetch(SERVER_URL, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subscription),
  })
  return response.json()
}
self.addEventListener("activate", async () => {
  console.log('Service Worker - Activate')
  // This will be called only once when the service worker is installed for first time.
  try {
    const applicationServerKey = urlB64ToUint8Array(
      'BN34_hJAjkmgVyIcWJOajEn9dSGnEmRdEMgsYzFZf1RXJOiGR9W3O4RFkUEOlKqmlFU2iX9MRy_1Ycuvgg5LvUE'
    )
    const options = { applicationServerKey, userVisibleOnly: true }
    const subscription = await self.registration.pushManager.subscribe(options)
    console.log('Subscription from Service Worker', subscription);
    const response = await saveSubscription(subscription)
    console.log("Saved Subscription" , response)
  } catch (err) {
    console.log('Error', err)
  }
})
self.addEventListener("push", function(event) {
  console.log('event', event)
  if (event.data) {
    console.log("Push event!! ", event.data.text());
    const options = {
      body: event.data.text(),
      // here you can add more properties like icon, image, vibrate, etc.
    };
    self.registration.showNotification('title', options);
  } else {
    console.log("Push event but no data");
  }
});
