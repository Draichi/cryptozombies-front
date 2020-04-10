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
  const web3 = getters['web3']
  const cryptoZombiesAddress = '0x18fcb305819C3Bb938226cA19519cD4fa1cf6EF7';
  const apiKey = 'I3P8MTTDGN26R7HQIWTRTEDRGM3RZNUGHF'
  const url = `https://api-ropsten.etherscan.io/api?module=contract&action=getabi&address=${cryptoZombiesAddress}&apikey=${apiKey}`

  web3.eth.net.isListening()
    .then(() => console.log('web3 is connected'))
    .catch(e => console.log('Wow. Something went wrong'));
  const res = await axios.get(url)
  const contractABI = await JSON.parse(res.data.result);
  console.log(contractABI);
  const cryptoZombies = new web3.eth.Contract(contractABI)
  // > setar o contracto commit
  console.log('>', cryptoZombies)
    // .then(res => {
    //   var contractABI = "";
    //   contractABI = JSON.parse(res.data.result);
    //   if (contractABI) {
    //     var cryptoZombies = new web3.eth.Contract(contractABI);
    //     console.log(cryptoZombies)  
    //   } else console.error(contractABI)
    // })
  const userAccount = web3.eth.currentProvider.selectedAddress;
  if (userAccount) {
    console.log(userAccount)
    // getZombiesByOwner(userAccount)
    //     .then(displayZombies);
  } else console.error(userAccount)
}
