<template>
  <q-page class="flex flex-center">
    {{ userLogged }}
    <div v-if="userLogged">
      you're logged !!
    </div>
    <div v-else>Please use log using metamast</div>
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-full.svg"
    >
    <q-btn @click="getZombiesByOwner">get zombies by owner</q-btn>
  </q-page>
</template>

<script>
import store from '../store';
// import Web3 from 'web3';
export default {
  name: 'PageIndex',
  created() {
    // if (typeof web3 !== 'undefined') {
    //   web3 = new Web3(web3.currentProvider);
    //   ethereum.enable()
    //   console.log('vc tem provider')
    // } else {
    //   console.log('vc nao tem provider')
    //   const provider = new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/cbf946aba73046d8ab55e4575a60da04");
    //   web3 = new Web3(provider);
    // }
    // this.startApp()
  },
  // > contract must be vdata
  methods: {
    getZombiesByOwner() {
      this.$store.dispatch('contract/getZombiesByOwner')
    },
    async startApp() {
      var cryptoZombiesAddress = "0x18fcb305819C3Bb938226cA19519cD4fa1cf6EF7";

      web3.eth.net.isListening()
        .then(() => console.log('web3 is connected'))
        .catch(e => console.log('Wow. Something went wrong'));
      this.$axios
        .get('https://api-ropsten.etherscan.io/api?module=contract&action=getabi&address=0x18fcb305819C3Bb938226cA19519cD4fa1cf6EF7&apikey=I3P8MTTDGN26R7HQIWTRTEDRGM3RZNUGHF')
        .then(res => {
          var contractABI = "";
          contractABI = JSON.parse(res.data.result);
          if (contractABI) {
            var cryptoZombies = new web3.eth.Contract(contractABI);
            console.log(cryptoZombies)
          } else console.error(contractABI)
        })
      const userAccount = web3.eth.currentProvider.selectedAddress;
      if (userAccount) {
        console.log(userAccount)
        getZombiesByOwner(userAccount)
            .then(displayZombies);
      } else console.error(userAccount)
    },
    // getZombiesByOwner(owner) {
    //   return cryptoZombies.methods.getZombiesByOwner(owner).call()
    // },
    displayZombies(ids) {
      $("#zombies").empty();
      for (id of ids) {
        // Look up zombie details from our contract. Returns a `zombie` object
        getZombieDetails(id)
        .then(function(zombie) {
          // Using ES6's "template literals" to inject variables into the HTML.
          // Append each one to our #zombies div
          $("#zombies").append(`<div class="zombie">
            <ul>
              <li>Name: ${zombie.name}</li>
              <li>DNA: ${zombie.dna}</li>
              <li>Level: ${zombie.level}</li>
              <li>Wins: ${zombie.winCount}</li>
              <li>Losses: ${zombie.lossCount}</li>
              <li>Ready Time: ${zombie.readyTime}</li>
            </ul>
          </div>`);
        });
      }
    },
    getZombieDetails(id) {
      return cryptoZombies.methods.zombies(id).call()
    },
  },
  computed: {
    userLogged() {
      return this.$store.state.contract['userAccount']
    }
  }
}
</script>
