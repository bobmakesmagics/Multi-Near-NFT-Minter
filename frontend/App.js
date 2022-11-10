import 'regenerator-runtime/runtime';
import React from 'react';

import './assets/global.css';

import { SignInPrompt, SignOutButton } from './ui-components';

export default function App({ isSignedIn, nft, wallet }) {
  const [totalSupply, setTotalSupply] = React.useState(0);

  const [uiPleaseWait, setUiPleaseWait] = React.useState(true);

  const multiData = [
    {
      title: "My Testing NFT - 1",
      description: "This is my Testing NFT - 1",
      media: 'https://ipfs.io/ipfs/QmeueVyGRuTH939fPhGcPC8iF6HYhRixGBRmEgiZqFUvEW',
      receiver_id: wallet.accountId,
      price: '0.1',
      amount: 1
    },
    {
      title: "My Testing NFT - 2",
      description: "This is my Testing NFT - 2",
      media: 'https://digidaigaku.com/image/1.png',
      receiver_id: wallet.accountId,
      price: '0.2',
      amount: 1
    },
    {
      title: "My Testing NFT - 3",
      description: "This is my Testing NFT - 3",
      media: 'https://lh3.googleusercontent.com/YgkpiK4LF5YvQDGTTvQQQ7MAGRyra5o3YA1B6S_oiXQkPXreZGNJbk7RCI78_eKGDgrOdO33tHHUFkHISyrxmZXgJIMFzdoAtLeQSg',
      receiver_id: wallet.accountId,
      price: '0.3',
      amount: 1
    },
    {
      title: "My Testing NFT - 4",
      description: "This is my Testing NFT - 4",
      media: 'https://digidaigaku.com/image/79.png',
      receiver_id: wallet.accountId,
      price: '0.4',
      amount: 1
    },
    {
      title: "My Testing NFT - 5",
      description: "This is my Testing NFT - 5",
      media: 'https://digidaigaku.com/heroes/image/92.png',
      receiver_id: wallet.accountId,
      price: '0.5',
      amount: 1
    },
    {
      title: "My Testing NFT - 6",
      description: "This is my Testing NFT - 6",
      media: 'https://lh3.googleusercontent.com/-7nyq9ksuPYvRZ8ZZZk_1wUVVv9dAUTVO3FvoosfOnZM30YWL6U8wTwBtoKQbHLQbtwVOmoJGRJrzX3CrF87qIRz9r1OzW9kOERUhA',
      receiver_id: wallet.accountId,
      price: '0.6',
      amount: 1
    },
    {
      title: "My Testing NFT - 7",
      description: "This is my Testing NFT - 7",
      media: 'https://digidaigaku.com/heroes/image/83.png',
      receiver_id: wallet.accountId,
      price: '0.7',
      amount: 1
    },
    {
      title: "My Testing NFT - 8",
      description: "This is my Testing NFT - 8",
      media: 'https://digidaigaku.com/heroes/image/99.png',
      receiver_id: wallet.accountId,
      price: '0.8',
      amount: 1
    },
    {
      title: "My Testing NFT - 9",
      description: "This is my Testing NFT - 9",
      media: 'https://digidaigaku.com/heroes/image/85.png',
      receiver_id: wallet.accountId,
      price: '0.9',
      amount: 1
    },
    {
      title: "My Testing NFT - 10",
      description: "This is my Testing NFT - 10",
      media: 'https://digidaigaku.com/heroes/image/93.png',
      receiver_id: wallet.accountId,
      price: '1',
      amount: 1
    },
  ]
  // Get blockchian state once on component load
  React.useEffect(() => {
    nft.nftSupply(wallet.accountId)
      .then(setTotalSupply)
      .catch(alert)
      .finally(() => {
        setUiPleaseWait(false);
      });
  }, []);

  if (!isSignedIn) {
    return <SignInPrompt totalSupply={totalSupply} onClick={() => wallet.signIn()} />;
  }

  function multiMint(e) {
    e.preventDefault();
    setUiPleaseWait(true);
    const { amountInput } = e.target.elements;
    const tokenData = multiData.slice(0, amountInput.value).map((token, index) => {
      return {
        token_id: totalSupply + index,
        metadata: {
          title: token.title,
          description: token.description,
          media: token.media,
          extra: token.price,
          copies: token.amount
        },
        receiver_id: token.receiver_id,
        price: token.price,
      }
    })

    nft.nftMint(tokenData)
      .then(async () => { return nft.nftSupply(wallet.accountId); })
      .then(setTotalSupply)
      .finally(() => {
        setUiPleaseWait(false);
      });
  }

  return (
    <>
      <SignOutButton accountId={wallet.accountId} onClick={() => wallet.signOut()} />
      <main className={uiPleaseWait ? 'please-wait' : ''}>
        <h1>
          Total amount of your own NFTs: <span className="greeting">{totalSupply}</span>
        </h1>
        {totalSupply ? (
          <p style={{ textAlign: "center" }}>
            You have an NFT already. You can see it{" "}
            <a target="_blank" href={"https://wallet.testnet.near.org/?tab=collectibles"}>
              here!
            </a>
            :)
          </p>
        ) : null}
        <form onSubmit={multiMint} className="change">
          <label>Input amount to mint:</label>
          <div>
            <input
              autoComplete="off"
              defaultValue={''}
              id="amountInput"
            />
            <button>
              <span>Mint</span>
              <div className="loader"></div>
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
