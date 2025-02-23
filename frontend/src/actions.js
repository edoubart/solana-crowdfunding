// NPM Packages
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import {
  Program,
  AnchorProvider,
  web3,
  utils,
  BN,
} from '@coral-xyz/anchor';

// Interface Definition Language (IDL)
import idl from './idl.json';

// Constants
const SOLANA_NETWORK = 'devnet';
const SOLANA_PREFLIGHT_COMMITMENT = 'processed'; // 'finalized'

// Solana
const network = clusterApiUrl(SOLANA_NETWORK);
const opts = {
  preflightCommitment: SOLANA_PREFLIGHT_COMMITMENT,
};
const programId = new PublicKey(idl.address);

function getProvider() {
  let connection = new Connection(network, opts.preflightCommitment);

  let provider = new AnchorProvider(
    connection,
    window.solana,
    opts.preflightCommitment,
  );

  return provider;
}

async function createCampaign(campaign) {
  console.log('campaign: ', campaign);

  try {
    const provider = getProvider();

    const program = new Program(idl, provider);
    //const program = new Program(idl, programId, provider);

    const [ campaignAccount ] = await PublicKey.findProgramAddress(
      [
        utils.bytes.utf8.encode("CAMPAIGN_DEMO"),
        provider.wallet.publicKey.toBuffer(),
      ],
      program.programId
    );

    await program.rpc.create(campaign.name, campaign.description, {
      accounts: {
        campaign: campaignAccount,
        user: provider.wallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
      },
    });

    console.log("The campaign has been created successfully: " + campaign.toString());
  }
  catch (error) {
    console.error("Something went wrong creating campaign:", error);
  }
}

async function fetchCampaigns() {
  const connection = new Connection(network, opts.preflightCommitment);

  const provider = getProvider();

  const program = new Program(idl, provider);

  async function fetchCampaignAcount(programAccount) {
    try {
      let campaignAccount = await program.account.campaign
        .fetch(programAccount.pubkey);

      return {
        ...campaignAccount,
        publicKey: programAccount.pubkey,
      };
    }
    catch (error) {
      console.error("Something went wrong fetching campaign account: " + error);
    }
  }

  async function fetchCampaignAcounts(programId) {
    try {
      let programAccounts = await connection.getProgramAccounts(programId);

      let campaignAccounts = programAccounts
        .map(programAccount => fetchCampaignAcount(programAccount));

      return campaignAccounts;

      //return await connection
      //  .getProgramAccounts(programId)
      //  .map(programAccount => fetchCampaignAcount(programAccount));
    }
    catch (error) {
      console.error("Something went wrong fetching campaigns: " + error);
    }
  }

  try {
    let campaignAccounts = await fetchCampaignAcounts(programId);

    return Promise.all(campaignAccounts);

    //Promise.all(fetchCampaignAcounts(programId));
  }
  catch (error) {
    console.error("Something went wrong fetching campaigns: " + error);
  }
}

async function donateCampaign(campaign, amountInSol) {
  const provider = getProvider();

  const program = new Program(idl, provider);

  let amountInLamports = new BN(amountInSol * web3.LAMPORTS_PER_SOL);

  try {
    await program.rpc.donate(amountInLamports, {
      accounts: {
        campaign: campaign.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
      },
    });
  }
  catch (error) {
    console.error("Something went wrong donating to campaign: " + error);
  }
}

async function withdrawCampaign(campaign, amountInSol) {
  const provider = getProvider();

  const program = new Program(idl, programId, provider);

  let amountInLamports = new BN(amountInSol * web3.LAMPORTS_PER_SOL);

  try {
    await program.rpc.withdraw(amountInLamports, {
      accounts: {
        campaign: campaign.publicKey,
        user: provider.wallet.publicKey,
      },
    });
  }
  catch (error) {
    console.error("Something went wrong withdrawing from campaign: " + error);
  }
}

export {
  createCampaign,
  fetchCampaigns,
  donateCampaign,
  withdrawCampaign,
};
