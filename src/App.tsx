import React from 'react';
import logo from './logo.svg';
import './App.css';

import MyWorker from './MyWorker.worker';
import MyComlinkWorker from './MyComlinkWorker.worker';
import { wrap } from 'comlink';

// Example: Using workers natively, e.g. by using "postMessage()"
const myWorkerInstance: Worker = new MyWorker();
console.log('[App] MyWorker instance:', myWorkerInstance);
myWorkerInstance.postMessage('This is a message from the main thread!');

// Example: Using workers via Comlink (comparable to remote execution)
const myComlinkWorkerInstance: Worker = new MyComlinkWorker();
const myComlinkWorkerApi: any = wrap(myComlinkWorkerInstance);
console.log('[App] MyComlinkWorker instance:', myComlinkWorkerInstance);
myComlinkWorkerApi.createMessage('John Doe').then((message: string): void => {
  console.log('[App] MyComlinkWorker message:', message);
});

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
