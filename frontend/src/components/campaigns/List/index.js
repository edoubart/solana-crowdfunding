// Styles
import './index.css';

function ListCampaigns(props) {
  // Handlers
  function handleListCampaigns() {

    props.handlers.listCampaigns();
  }

  return(
    <div className="ListCampaigns">
    </div>
  );
}

export default ListCampaigns;
