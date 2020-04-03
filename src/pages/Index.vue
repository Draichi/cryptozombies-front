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
    startApp() {
      console.trace('ll')
    },
  },
}
</script>
