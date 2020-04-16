import Web3 from 'web3';
import axios from 'axios';

export const enableEthereum = ({ commit, dispatch }) => {
  let web3Instance
  if (typeof web3 !== 'undefined') {
    web3Instance = new Web3(web3.currentProvider);
  } else {
    const provider = new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/cbf946aba73046d8ab55e4575a60da04");
    web3Instance = new Web3(provider);
  }
  commit('setWeb3', web3Instance)
  ethereum.enable()
  dispatch('getContractInstance')
}

export const getContractInstance = async ({ commit, getters }) => {
  const web3 = await getters['web3']
  const cryptoZombiesContractAddress = '0x18fcb305819C3Bb938226cA19519cD4fa1cf6EF7';
  const etherscanApiKey = 'I3P8MTTDGN26R7HQIWTRTEDRGM3RZNUGHF'
  const etherscanEndpoint = `https://api-ropsten.etherscan.io/api?module=contract&action=getabi&address=${cryptoZombiesContractAddress}&apikey=${etherscanApiKey}`

  const etherscanResponse = await axios.get(etherscanEndpoint)
  const contractABI = await JSON.parse(etherscanResponse.data.result);
  const contractInstance = new web3.eth.Contract(contractABI, cryptoZombiesContractAddress)
  commit('setContractInstance', contractInstance)
}

export const checkUserAccount = async ({ commit, getters, state }) => {
  setInterval(() => {
    const userAccount = state['userAccount'];
    const providerAccount = getters['providerAccount'];
    console.log('userAccount', userAccount)
    console.log('providerAccount', providerAccount)
    if (providerAccount !== userAccount) commit('setUserAccount', providerAccount)
  }, 1000)
}

export const getZombiesByOwner = async ({ commit, getters, state }) => {
  const contractInstance = await getters['contractInstance']
  const userAccount = state['userAccount'];
  const zombiesByOwner = await contractInstance.methods.getZombiesByOwner(userAccount).call()
  console.log('zombiesByOwner', zombiesByOwner)
  console.log('zombiesByOwner', contractInstance.methods)
  const zombieDetails = await contractInstance.methods.zombies(zombiesByOwner[0]).call()
  console.log('zombieDetails', zombieDetails)
}
