![image](https://user-images.githubusercontent.com/65929678/232244423-20b3e899-92b7-4b3e-8fbe-3c31ba2b5055.png)

# Jury DAO Back-end

> This is the buidle of [ETHGlobal Tokyo 2023](https://ethglobal.com/events/tokyo).

> We are still working on it!

## What is Jury DAO?

[Checkout the information](https://github.com/catze-labs/jury-dao-info)

JuryDAO is a decentralized autonomous organization (DAO) that aims to provide a decentralized dispute resolution system on the blockchain. It allows users to create and vote on cases, stake tokens as collateral, and engage in a transparent and decentralized decision-making process.


## Main Features

- Case creation: Users can create new dispute resolution cases by submitting a title, description, and stake amount.
- Case voting: Users can vote on cases by staking their JRY tokens and indicating their decision.
- Jury selection: The DAO selects a randomly chosen jury from the community members to vote on each case.
- Transparent decision-making: All decisions and votes are recorded on the blockchain and can be audited for transparency.
- Reward system: Users who participate in the dispute resolution process as jurors are rewarded with JRY tokens as an incentive.
- Staking and unstaking: Users can stake and unstake their JRY tokens as collateral for cases, and the tokens are locked during the resolution process.


## Project Detail

### 1. Library

- Nest.js : 13.2.4
- prisma

### 2. Structures

Feature based file system with concerns of serverless paradigm.

```bash
src/
├─ auth/  # control authentication
├─ decorators/  # util function for user
├─ routes/ # controller
├─ services/ # main business logics
```
