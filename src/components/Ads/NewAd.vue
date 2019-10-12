<template>
  <v-container>
      <v-layout row>
          <v-flex xs12 sm6 offset-sm3>
              <h1 class="text--secondary mb-3">Create new ad</h1>

              <v-form v-model="valid" ref="form" validation class="mb3">
                  <v-text-field
                    label="Ad title"
                    name="title"
                    type="text"
                    v-model="title"
                    required
                    :rules="[v => !!v || 'Title is req']"
                  ></v-text-field>

                  <v-textarea
                    id="description"
                    label="Ad description"
                    name="description"
                    type="text"
                    v-model="description"
                    multi-line 
                    :rules="[v => !!v || 'description is req']"
                  ></v-textarea>
                </v-form>

                <v-layout row class="mb3">
                    <v-flex xs12>
                        <v-btn class="warning"> 
                            Upload
                            <v-icon right dark>mdi-cloud-upload</v-icon>
                        </v-btn>

                    </v-flex>
                </v-layout>

                <v-layout row>
                    <v-flex xs12>
                        <img src="" height="100">
                    </v-flex>
                </v-layout>

                <v-layout row>
                    <v-flex xs12>
                        <v-switch value input-value="true"
                        label="Add to promo?"
                        color="primary"
                        v-model="promo"></v-switch>
                    </v-flex>
                </v-layout>

                <v-layout row>
                    <v-flex xs12>
                        <v-spacer></v-spacer>
                        <v-btn 
                        class="success"
                        :disabled="!valid"
                        @click="createAd"

                        >Create Ad</v-btn>
                    </v-flex>
                </v-layout>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
export default {
    data(){
        return{
            title:'',
            description:'',
            promo:false,
            valid:false
        }
    },
    methods:{
        createAd(){
            if(this.$refs.form.validate()){
                //
                const ad={
                    title: this.title,
                    description: this.description,
                    promo: this.promo
                }
                console.log(ad)
            }
        }
    }
}
</script>

<style>

</style>