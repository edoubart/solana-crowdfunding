// NPM Packages
import { web3, BN } from '@coral-xyz/anchor';

// Custom Modules
import { DonateCampaign } from './../index.js';

// Styles
import './index.css';

// Constants
const CAMPAIGN_AMOUNT_DONATED_LABEL = "Amount donated";
const CAMPAIGN_NAME_LABEL = "Name";
const CAMPAIGN_DESCRIPTION_LABEL = "Description";
const CAMPAIGN_SOL_LABEL = "SOL";

function ListCampaigns(props) {
  // Renderers
  function renderAmountDonated(amountInLamports) {

    let amountInSol = new BN(amountInLamports / web3.LAMPORTS_PER_SOL);

    return (
      <span>
        {
          CAMPAIGN_AMOUNT_DONATED_LABEL + ': ' + amountInSol + ' '
            + CAMPAIGN_SOL_LABEL
        }
      </span>
    );
  }

  function renderDescription(description) {
    return (
      <p>{ CAMPAIGN_DESCRIPTION_LABEL + ': ' + description }</p>
    );
  }

  function renderName(name) {
    return (
      <span>{ CAMPAIGN_NAME_LABEL + ': ' + name }</span>
    );
  }

  function renderCampaign(campaign) {
    return (
      <div key={campaign.publicKey.toString()}>
        { campaign.name && renderName(campaign.name) }
        { campaign.description && renderDescription(campaign.description) }
        { campaign.amountDonated && renderAmountDonated(campaign.amountDonated) }

        <DonateCampaign
          handlers={{
            donateCampaign: amountInSol => {
              return props.handlers.donateCampaign(campaign, amountInSol);
            },
          }}
        />
      </div>
    );
  }

  function renderCampaigns(campaigns) {
    return campaigns.map(renderCampaign);
  }

  return(
    <div className="ListCampaigns">
      {
        props.data
        && props.data.campaigns
        && renderCampaigns(props.data.campaigns)
      }
    </div>
  );
}

export default ListCampaigns;
