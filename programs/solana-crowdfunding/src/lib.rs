use anchor_lang::prelude::*;

declare_id!("GAiTsjthEZq2r35wZ7nV7SsjdJbEwEDEwHx1x9ug8WjG");

#[program]
pub mod solana_crowdfunding {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
