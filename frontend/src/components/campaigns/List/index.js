// Styles
import './index.css';

function ListCampaigns(props) {
  // Renderers
  function renderCampaign(campaign) {
    return (
      <div key={campaign.publicKey.toString()}>
        <span>{ campaign.name }</span>
        <p>{ campaign.description }</p>
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
