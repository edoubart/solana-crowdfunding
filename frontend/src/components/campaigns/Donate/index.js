// Styles
import './index.css';

function DonateCampaign(props) {
  // Handlers
  function handleDonateCampaign() {

    props.handlers.donateCampaign();
  }

  return(
    <div className="DonateCampaign">
    </div>
  );
}

export default DonateCampaign;
