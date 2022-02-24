import { expose } from 'comlink';

export default {} as typeof Worker & { new (): Worker };

console.log('[MyComlinkWorker] Running.');

export const api = {
  createMessage: (name: string): string => {
    return `Hello ${name}!`;
  },
};

expose(api);
