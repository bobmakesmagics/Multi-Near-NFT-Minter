/* Talking with a contract often involves transforming data, we recommend you to encapsulate that logic into a class */

export class Nft {
  constructor({ contractId, walletToUse }) {
    this.contractId = contractId;
    this.wallet = walletToUse;    
  }

  async nftSupply(account_id) {
    return await this.wallet.viewMethod({ contractId: this.contractId, method: 'nft_supply_for_owner', args: { account_id: account_id } });
  }

  async nftMint(tokenData) {
    return await this.wallet.callMethod({ contractId: this.contractId, method: 'nft_mint', tokenData: tokenData });
  }
}