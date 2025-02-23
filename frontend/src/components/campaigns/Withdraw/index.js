// Styles
import './index.css';

function WithdrawCampaign(props) {
  // Handlers
  function handleWithdrawCampaign() {
    let amountInSol = 0.1;

    props.handlers.withdrawCampaign(amountInSol);
  }

  return(
    <div className="WithdrawCampaign">
      <button onClick={handleWithdrawCampaign}>
        Withdraw from campaign
      </button>
    </div>
  );
}

export default WithdrawCampaign;
