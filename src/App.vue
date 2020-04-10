<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    this.$store.dispatch('contract/enableEthereum')
    this.$store.dispatch('contract/checkUserAccount')
  },
  // computed: {
  //   // userAccount() {
  //   //   return this.$store.getters['contract/userAccount'];
  //   // },
  //   providerAccount() {
  //     return this.$store.getters['contract/providerAccount'];
  //   }
  // },
  // watch: {
  //   // userAccount(newValue, oldValue) {
  //   //   console.log('newValue', newValue)
  //   //   console.log('oldValue', oldValue)
  //   // },
  //   providerAccount(newValue, oldValue) {
  //     console.log('newValue', newValue)
  //     console.log('oldValue', oldValue)
  //   }
  // }
}
</script>
