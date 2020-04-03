<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-full.svg"
    >
  </q-page>
</template>

<script>
import Web3 from 'web3';
export default {
  name: 'PageIndex',
  created() {
    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider);
      ethereum.enable()
      console.log('vc tem provider')
    } else {
      console.log('vc nao tem provider')
      const provider = new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/cbf946aba73046d8ab55e4575a60da04");
      web3 = new Web3(provider);
    }
    this.startApp()
  },
  methods: {
    async startApp() {
      var cryptoZombiesAddress = "0x18fcb305819C3Bb938226cA19519cD4fa1cf6EF7";

      web3.eth.net.isListening()
        .then(() => console.log('web3 is connected'))
        .catch(e => console.log('Wow. Something went wrong'));
      // cryptoZombies = new web3.eth.Contract(cryptoZombiesABI, cryptoZombiesAddress);
    },
  },
}
</script>
