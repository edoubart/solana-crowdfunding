// Styles
import './index.css';

function DonateCampaign(props) {
  // Handlers
  function handleDonateCampaign() {
    let amountInSol = 2;

    props.handlers.donateCampaign(amountInSol);
  }

  return(
    <div className="DonateCampaign">
      <button onClick={handleDonateCampaign}>
        Donate to campaign
      </button>
    </div>
  );
}

export default DonateCampaign;
