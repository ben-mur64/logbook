<template>
  <div class="home">
    <div class="purchases">
      <h2>Purchases So Far:</h2>
      <br />
        <div class="container purchase" v-for="purchase in purchases" :key="purchase._id" @click="selectPurchase(purchase)">
            <div class="row">
                <div class="col">
                    <p><em>Purchaser:</em> {{purchase.purchaser}}</p>
                </div>
                <div class="col">
                    <p><em>Description:</em> {{purchase.description}}</p>
                </div>
                <div class="col">
                    <p><em>Shipping Cost:</em> {{purchase.shipping}}</p>
                </div>
                <div class="col">
                    <p><em>Fulfilled:</em> {{purchase.fulfilled}}</p>
                </div>
            </div>
        </div>

        <div class="lineItems" v-if="findPurchase">
            <hr />
            <h2>Purchase Info: </h2>
            <br />
            <div class="container">
                <div class="row">
                    <div class="col">
                        <p><em>Purchaser:</em> {{findPurchase.purchaser}}</p>
                    </div>
                    <div class="col">
                        <p><em>Description:</em> {{findPurchase.description}}</p>
                    </div>
                    <div class="col">
                        <p><em>Shipping Cost:</em> {{findPurchase.shipping}}</p>
                    </div>
                    <div class="col">
                        <p><em>Fulfilled:</em> {{findPurchase.fulfilled}}</p>
                    </div>
                </div>
            </div>
            <br />
            <h3> Items: </h3>
            <div class="container" v-for="item in lineItems" :key="item._id">
                <div class="row">
                    <div class="col">
                        <p><em>Item:</em> {{item.name}}</p>
                    </div>
                    <div class="col">
                        <p><em>Description:</em> {{item.description}}</p>
                    </div>
                    <div class="col">
                        <p><em>Quantity:</em> {{item.quantity}}</p>
                    </div>
                    <div class="col">
                        <p><em>Price:</em> {{item.price}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Home',
    data() {
        return {
            purchases: [],
            lineItems: [],
            totalPrice: 0,
            findPurchase: null
        }
    },
    created() {
        this.getPurchases();
    },
     methods: {
        async getPurchases() {
            try {
                const response = await axios.get("/api/purchases");
                this.purchases = response.data;
            } catch (error) {
                console.log(error);
            }
        },
        selectPurchase(purchase) {
            this.findPurchase = purchase;
            this.getLineItems();
        },
        async getLineItems() {
            try {
                const response = await axios.get(`/api/purchases/${this.findPurchase._id}/lineItems`);
                this.lineItems = response.data;
            } catch (error) {
                console.log(error);
            }
        },
     }
}
</script>

<style scoped>
 .purchase {
     background-color: #ffffff;
     border: 1px solid #000000;
 }
 .purchase:hover {
     background-color: #ac51b9;
     color: #ffffff;
 }
</style>
