// Styles
import './index.css';

function CreateCampaign(props) {
  // Handlers
  function handleCreateCampaign() {
    let name = "A campaign name ...";
    let description = "A campaign description ...";

    props.handlers.createCampaign(name, description);
  }

  return(
    <div className="CreateCampaign">
      <button onClick={handleCreateCampaign}>Create a campaign ...</button>
    </div>
  );
}

export default CreateCampaign;
