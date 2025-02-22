// Styles
import './index.css';

function WithdrawCampaign(props) {
  // Handlers
  function handleWithdrawCampaign() {

    props.handlers.withdrawCampaign();
  }

  return(
    <div className="WithdrawCampaign">
    </div>
  );
}

export default WithdrawCampaign;
