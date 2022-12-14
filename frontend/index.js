// React
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// NEAR
import { Nft } from './near-interface';
import { Wallet } from './near-wallet';

// When creating the wallet you can optionally ask to create an access key
// Having the key enables to call non-payable methods without interrupting the user to sign
const wallet = new Wallet({ createAccessKeyFor: process.env.CONTRACT_NAME })

// Abstract the logic of interacting with the contract to simplify your flow
const nft = new Nft({ contractId: process.env.CONTRACT_NAME, walletToUse: wallet });

// Setup on page load
window.onload = async () => {
  const isSignedIn = await wallet.startUp()
 
  const container = document.getElementById('root');
  const root = createRoot(container); // createRoot(container!) if you use TypeScript
  root.render(<App isSignedIn={isSignedIn} nft={nft} wallet={wallet} />);
}