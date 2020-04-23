<template>
  <q-page class="flex flex-center">
    {{ userLogged }}
    <q-btn @click="checkUserAccount">check user account</q-btn>
    <q-btn @click="getZombiesByOwner">get zombies by owner</q-btn>
  </q-page>
</template>

<script>
import store from '../store';
// import Web3 from 'web3';
export default {
  name: 'PageIndex',
  methods: {
    checkUserAccount() {
      this.$store.dispatch('contract/checkUserAccount')
    },
    getZombiesByOwner() {
      this.$store.dispatch('contract/getZombiesByOwner')
    },
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
