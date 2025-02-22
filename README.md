# Solana Crowdfunding

## Build Project

```
anchor build
```

## Run Test Suite

```
anchor test
```

## Deployment

```
solana program deploy <PATH-TO-PROJECT>/solana-crowdfunding/target/deploy/solana_crowdfunding.so --url devnet
```

Retrieve Program ID:

```
solana address -k ./target/deploy/solana_crowdfunding-keypair.json
```

```
anchor build
```

```
anchor deploy
```

Check Solana Explorer for deployed Program: https://explorer.solana.com

