export const web3 = (state) => state.web3;

export const web3IsListening = state => state.web3.eth.net.isListening();

export const contractInstance = state => state.contractInstance;

export const providerAccount = state => { if (state.web3) return state.web3.eth.currentProvider.selectedAddress; else return 'nao' };
