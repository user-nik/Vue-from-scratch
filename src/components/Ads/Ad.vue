<template>
  <v-container>
      <v-layout row>
          <v-flex xs12>
              <v-card v-if="!loading">
                  <v-img 
                  :src="ad.imageSrc"
                  height="300px"
                  ></v-img>
                  <v-card-text>
                      <h1 class="text--primary">{{ad.title}}</h1>
                      <p>{{ad.description}}</p>
                  </v-card-text>
                  <v-card-actions>
                      <v-spacer>
                      </v-spacer>
                      
                        <app-edit-ad :ad="ad" v-if="isOwner"></app-edit-ad>
                        <app-buy-model :ad="ad">
                        </app-buy-model>
                  </v-card-actions>
              </v-card>
              <div v-else class="text-xs-center">
                  <v-progress-circular
                    :size="50"
                    color="primary"
                    indeterminate
                  ></v-progress-circular>
              </div>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import EditAdVue from './EditAd.vue'

export default {
    props:['id'],
    computed:{
        ad(){
            const id = this.id
            return this.$store.getters.adById(id)
        },
        loading(){
            return this.$store.getters.loading
        },
        isOwner(){
            return this.ad.owner === this.$store.getters.user.id
        }
    },
    components: {
        appEditAd: EditAdVue,
    },
}
</script>

<style>

</style>