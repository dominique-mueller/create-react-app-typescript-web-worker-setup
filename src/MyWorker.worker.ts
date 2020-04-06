// Setup
declare const self: Worker;
export default {} as typeof Worker & { new (): Worker };

console.log('MyWorker is running!');

self.addEventListener('message', (event: MessageEvent): void => {
  console.log('Incoming message from main thread:', event.data);
});
