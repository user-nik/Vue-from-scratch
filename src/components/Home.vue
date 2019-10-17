<template>
<div class="" v-if="!loading">
  <v-container fluid>
      <v-layout row>
          <v-flex xs12>
              
  <v-carousel>
    <v-carousel-item
     
      
      reverse-transition="fade-transition"
      transition="fade-transition"
      v-for="ad in promoAds"
      :key="ad.id"
      :src="ad.imageSrc"
    >
    <div class="car-link">
        <v-btn class="error" :to="'/ad/'+ad.id">{{ad.title}}</v-btn>
    </div>
    </v-carousel-item>
  </v-carousel>
          </v-flex>
      </v-layout>
  </v-container>

  <v-container grid>
      <v-layout row>
          <v-flex md4
          v-for="ad in ads"
          :key="ad.id">
              <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      :src="ad.imageSrc"
    >
    </v-img>

   
    <v-card-text class="text--primary">
        <div class="pb-0">{{ad.title}}</div>
      <div>{{ad.description}}</div>

    </v-card-text>

    <v-card-actions>
        <v-spacer> </v-spacer>
      <v-btn
        text
        :to="'/ad/'+ad.id"
      >
        Open
      </v-btn>

      <app-buy-model :ad="ad">
      </app-buy-model>
    </v-card-actions>
  </v-card>
          </v-flex>
      </v-layout>
  </v-container>
</div>
<div v-else>
  <v-container>
    <v-layout row>
      <v-flex class="text-xs-center">
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>

<script>
export default {
  computed:{
    promoAds(){
      return this.$store.getters.promoAds
    },
    ads(){
      return this.$store.getters.ads
    },
    loading(){
      return this.$store.getters.loading
    }
  }
}
</script>

<style scoped lang="stylus">
.car-link
    position: absolute;
    bottom:50px;
    left:50%;
    background: rgba(0,0,0,.5);
    transform:translate(-50%,0);
    padding: 5px 15px;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
</style>
