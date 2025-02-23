// NPM Packages
import { useEffect, useState } from 'react';
import { Buffer } from 'buffer';

// Custom Modules
import {
  CreateCampaign,
  ListCampaigns,
} from './../campaigns';
import {
  createCampaign,
  fetchCampaigns,
  donateCampaign,
  withdrawCampaign,
} from './../../actions.js';

// Styles
import './index.css';

// Buffer
window.Buffer = Buffer;

function App() {
  // State
  const [ walletAddress, setWalletAddress ] = useState(null);
  const [ campaigns, setCampaigns ] = useState([]);

  console.log('walletAddress: ', walletAddress);
  console.log('campaigns: ', campaigns);

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

  useEffect(() => {
    async function fetch() {
      let fetchedCampaigns = await fetchCampaigns();

      fetchedCampaigns && setCampaigns(fetchedCampaigns);
    }

    fetch();
  }, [walletAddress]);

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

      <CreateCampaign
        handlers={{
          createCampaign,
        }}
      />

      <ListCampaigns
        data={{
          campaigns,
        }}
        handlers={{
          donateCampaign,
          withdrawCampaign,
        }}
      />
    </div>
  );
}

export default App;
