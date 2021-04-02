<template>
    <div class="add">
        <h2>Purchase:</h2>
        <div class="container">
        <!-- Purchase fields -->
            <form @submit.prevent="addPurchase">
                <div class="form-row">
                    <div class="col">
                        <label>Purchaser</label>
                        <input type="text" v-model="purchaser" placeholder="Purchaser">
                    </div>
                    <div class="col">
                        <label>Description</label>
                        <input type="text" v-model="purchaseDescription" placeholder="Description">
                    </div>
                    <div class="col">
                        <label>Shipping Cost</label>
                        <input type="text" v-model="shipping">
                    </div>
                    <div class="col">
                        <label class="form-check-label">Fulfilled?</label>
                        <br />
                        <input type="checkbox" v-model="fulfilled" class="form-check-input">
                    </div>
                </div>
                <br />
                <button type="submit" class="btn btn-primary">Add Purchase</button>
                <button v-on:click="updatePurchase(findPurchase)" class="btn btn-primary">Update Selected Purchase</button>
            </form>
        </div>

        <hr />
        <!-- Purchase dropdown -->
        <div class="form">
        <input v-model="findDesc" placeholder="Search">
            <div class="suggestions mx-auto" v-if="suggestions.length > 0">
                <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectPurchase(s)">{{s.description}}
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
                        <div class="col">
                            <button v-on:click="deleteLineItem(item)" class="btn btn-primary">Delete</button>
                        </div>
                    </div>
                </div>
                <button v-on:click="deletePurchase(findPurchase)" class="btn btn-primary">Delete Purchase</button>
            <hr />
            <h2>Add line items:</h2>
            <div class="container">
                <form @submit.prevent="addLineItem">
                    <div class="form-row">
                        <div class="col">
                            <label>Name</label>
                            <input type="text" v-model="itemName" placeholder="Name">
                        </div>
                        <div class="col">
                            <label>Description</label>
                            <input type="text" v-model="itemDescription" placeholder="Description">
                        </div>
                        <div class="col">
                            <label>Quantity</label>
                            <input type="number" v-model="quantity">
                        </div>
                        <div class="col">
                            <label>Price</label>
                            <br />
                            <input type="text" v-model="price">
                        </div>
                    </div>
                    <br />
                    <button type="submit" class="btn btn-primary">Add Line Item</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
 import axios from 'axios';
 export default {
     name: 'Add',
     data() {
         return {
             purchases: [],
             findDesc: '',
             findPurchase: null,
             purchaser: '',
             purchaseDescription: '',
             fulfilled: false,
             shipping: '',
             lineItems: [],
             itemName: '',
             itemDescription: '',
             quantity: 0,
             price: '',
         }
     },
     computed: {
         suggestions() {
             let ps = this.purchases.filter(purchase => purchase.description.toLowerCase().startsWith(this.findDesc.toLowerCase()));
             return ps.sort((a, b) => a.description > b.description);
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
        async addPurchase() {
            try {
                await axios.post("/api/purchases", {
                    purchaser: this.purchaser,
                    description: this.purchaseDescription,
                    fulfilled: this.fulfilled,
                    shipping: parseFloat(this.shipping),
                });
                await this.getPurchases();
            } catch (error) {
                console.log(error);
            }
        },
        async updatePurchase() {
            try {
                await axios.put("/api/purchases/" + this.findPurchase._id, {
                    purchaser: this.purchaser,
                    description: this.purchaseDescription,
                    fulfilled: this.fulfilled,
                    shipping: parseFloat(this.shipping),
                });
                await this.getPurchases();
            } catch (error) {
                console.log(error);
            }
        },
        async deletePurchase() {
            try {
                await axios.delete("/api/purchases/" + this.findPurchase._id);
                await this.getPurchases();
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
        async addLineItem() {
            try {
                await axios.post(`/api/purchases/${this.findPurchase._id}/lineItems`, {
                    name: this.itemName,
                    description: this.itemDescription,
                    quantity: this.quantity,
                    price: parseFloat(this.price),
                });
                this.itemName = "";
                this.itemDescription = "";
                this.quantity = 0;
                this.price = 0;
                this.getLineItems();
            } catch (error) {
                console.log(error);
            }
        },
        async editLineItem(lineItem) {
            try {
                axios.put(`/api/purchases/${this.findPurchase._id}/lineItems/${lineItem._id}`, {
                    name: this.itemName,
                    description: this.itemDescription,
                    quantity: this.quantity,
                    price: parseFloat(this.price),
                });
                this.getItems();
            } catch (error) {
                console.log(error);
            }
        },
        async deleteLineItem(lineItem) {
            try {
                await axios.delete(`/api/purchases/${this.findPurchase._id}/lineItems/${lineItem._id}`);
                this.getLineItems();
            } catch (error) {
                console.log(error);
            }
        },
    }
 }
</script>

<style scoped>
/* Suggestions */
.suggestions {
  width: 200px;
  background-color: #ac61b9;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}
</style>
