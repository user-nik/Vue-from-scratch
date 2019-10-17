<template>
  <v-container>
      <v-layout row>
          <v-flex class="text-xs-center" v-if="loading">
              <v-progress-circular
                    :size="50"
                    color="primary"
                    indeterminate
                  ></v-progress-circular>
          </v-flex>
          <v-flex v-else-if="!loading && orders.length !==0" xs12 sm6 offset-sm3>
              <h1 class="text--secondary mb-3">Orders</h1>
           </v-flex> 

          <v-flex v-else xs12 sm6 offset-sm3>
              <h1 class="text--secondary mb-3">No orders</h1>
           </v-flex> 
           
<v-list
      subheader
      two-line
      flat
    >
      <v-list-item-group
      >
        <v-list-item v-for="order in orders"
        :key="order.id">
            <v-list-item-action>
              <v-checkbox 
              :input-value="order.done"
              @change="markDone(order)"
              ></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{order.name}}</v-list-item-title>
              <v-list-item-subtitle>{{order.phone}}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
                <v-btn class="primary" :to="'/ad/'+order.id">Open</v-btn>
            </v-list-item-action>

        </v-list-item>

      </v-list-item-group>
    </v-list>

         
      </v-layout>
  </v-container>
</template>

<script>
export default {
    computed: {
        loading() {
            return this.$store.getters.loading 
        },
        orders(){
            return this.$store.getters.orders
        }
    },
    methods:{
        markDone(order){
            this.$store.dispatch('markOrderDone', order.id)
                .then(() =>{
                    order.done = true
                })
                .catch(() => {})
            order.done = true
        }
    },
    created(){
        this.$store.dispatch('fetchOrders')
    }
}
</script>

<style>

</style>