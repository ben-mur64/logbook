<template>
  <div class="my-purchases">
    <Menu :user="user" />
    <PurchaseView v-if="user" :purchases="purchases" />
    <Login v-else />
  </div>
</template>

<script>
import axios from 'axios';
import Login from '@/components/Login.vue'
import Menu from '@/components/Menu.vue'
import PurchaseView from '@/components/PurchaseView.vue'

export default {
    name: 'MyPurchases',
    components: {
      Login,
      Menu,
      PurchaseView
    },
    data() {
        return {
            purchases: [],
        }
    },
    created() {
        this.getUser();
        this.getMyPurchases();
    },
    computed: {
        user() {
            return this.$root.$data.user;
        }
    },
     methods: {
         async getUser() {
            try {
                let response = await axios.get('/api/users');
                this.$root.$data.user = response.data.user;
            } catch (error) {
                this.$root.$data.user = null;
            }
         },
        async getMyPurchases() {
            try {
                const response = await axios.get("/api/purchases/user");
                this.purchases = response.data;
            } catch (error) {
                console.log(error);
            }
        },
     }
}
</script>
