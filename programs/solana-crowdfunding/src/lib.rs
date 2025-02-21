use anchor_lang::prelude::*;

declare_id!("GAiTsjthEZq2r35wZ7nV7SsjdJbEwEDEwHx1x9ug8WjG");

#[program]
pub mod solana_crowdfunding {
    use super::*;

    pub fn create(
        context: Context<Create>,
        name: String,
        description: String
    ) -> ProgramResult {
        let campaign = &mut context.accounts.campaign;

        campaign.name = name;
        campaign.description = description;
        campaign.amount_donated = 0;
        campaign.admin = *context.accounts.user.key;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init, payer=user, space=9000, seeds=[b"CAMPAIGN_DEMO".as_ref(), user.key().as_ref()]. bump)]
    pub campaign: Account<'info, Campaign>,

    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>
}
