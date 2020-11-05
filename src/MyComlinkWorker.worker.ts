import { expose } from 'comlink';

export default {} as typeof Worker & { new (): Worker };

console.log('[MyComlinkWorker] Running.');

const api = {
  createMessage: (name: string): string => {
    return `Hello ${name}!`;
  },
};

expose(api);
