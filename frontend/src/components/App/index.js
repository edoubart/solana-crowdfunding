// NPM Packages
import { useEffect, useState } from 'react';

// Styles
import './index.css';

function App() {
  // State
  const [ walletAddress, setWalletAddress ] = useState(null);

  console.log('walletAddress: ', walletAddress);

  // Hooks
  useEffect(() => {
    async function load() {
      await fetchWalletAddress();
    }

    window.addEventListener('load', load);

    return () => {
      window.removeEventListener('load', load);
    };
  }, []);

  // Helpers
  async function fetchWalletAddress() {
    if(window && window.solana && window.solana.isPhantom) {
      try {
        let response = await window.solana.connect();

        //let response = await window.solana.connect({
        //  onlyIfTrusted: true,
        //});

        if (response && response.publicKey) {
          setWalletAddress(response.publicKey.toString());
        }
        else {
          console.error("Something went wrong fetching wallet address.");
        }
      }
      catch (err) {
        console.error("Something went wrong fetching wallet address: " + err);
      }
    }
    else {
      console.error("Phantom wallet not found; Get the Phantom wallet!");
    }
  }

  return (
    <div className="App">
      Solana Crowdfunding Dapp
    </div>
  );
}

export default App;
