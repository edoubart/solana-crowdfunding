/***********
 * Imports *
 ***********/
use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;

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

    pub fn withdraw(context: Context<Withdraw>, amount: u64) -> ProgramResult {
        let campaign = &mut context.accounts.campaign;
        let user = &mut context.accounts.user;

        if *user.key != campaign.admin {
            return Err(ProgramError::IncorrectProgramId);
        }

        let rent_balance = Rent::get()?.minimum_balance(campaign.to_account_info().data_len());

        if amount > **campaign.to_account_info().lamports.borrow() - rent_balance {
            return Err(ProgramError::InsufficientFunds);
        }

        **campaign.to_account_info().try_borrow_mut_lamports()? -= amount;
        **user.to_account_info().try_borrow_mut_lamports()? += amount;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init, payer=user, space=9000, seeds=[b"CAMPAIGN_DEMO".as_ref(), user.key().as_ref()], bump)]
    pub campaign: Account<'info, Campaign>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Withdraw<'info> {
    #[account(mut)]
    pub campaign: Account<'info, Campaign>,
    #[account(mut)]
    pub user: Signer<'info>,
}

#[account]
pub struct Campaign {
    pub name: String,
    pub description: String,
    pub amount_donated: u64,
    pub admin: Pubkey,
}
