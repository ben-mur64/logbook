<template>
  <div class="home">
    <h1>Joe's Logbook</h1>
    <div class="purchases">
      <h2>Purchases So Far:</h2>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data() {
      return {
          purchases: [],
          lineItems: [],
          purchase: null
      }
  },
  created() {
      this.getPurchases();
  },

}
</script>
