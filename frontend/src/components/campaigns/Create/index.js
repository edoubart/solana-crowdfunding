// Styles
import './index.css';

function CreateCampaign(props) {
  // Handlers
  function handleCreateCampaign() {
    let campaign = {
      name: "A campaign name ...",
      description: "A campaign description ...",
    };

    props.handlers.createCampaign(campaign);
  }

  return(
    <div className="CreateCampaign">
      <button onClick={handleCreateCampaign}>
        Create a campaign ...
      </button>
    </div>
  );
}

export default CreateCampaign;
