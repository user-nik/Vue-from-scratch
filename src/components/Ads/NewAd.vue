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
                        <v-btn class="warning" @click="triggerUpload"> 
                            Upload
                            <v-icon right dark>mdi-cloud-upload</v-icon>
                            <input ref="fileInput" 
                            type="file" 
                            style="display:none"
                            accept="image/"
                            @change="onFileChange">
                        </v-btn>

                    </v-flex>
                </v-layout>

                <v-layout row>
                    <v-flex xs12>
                        <img :src="imageSrc" v-if="imageSrc" height="100">
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
                        :disabled="!valid || ! image || loading"
                        @click="createAd"
                        :loading="loading"
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
            valid:false,
            image: null,
            imageSrc: ''
        }
    },
    computed: {
        loading() {
            return this.$store.getters.loading
        }
    },
    methods:{
        onFileChange(event){
            const file = event.target.files[0]

            const reader = new FileReader()
            reader.onload = e =>{
                this.imageSrc = reader.result
            }
            reader.readAsDataURL(file)
            this.image = file
        },
        triggerUpload(){
            this.$refs.fileInput.click()
        },
        createAd(){
            if(this.$refs.form.validate() && this.image){
                //
                const ad={
                    title: this.title,
                    description: this.description,
                    promo: this.promo,
                    image: this.image
                }
               this.$store.dispatch('createAd', ad)
               .then(()=>{
                   this.$router.push('/list')
               })
            }
        }
    }
}
</script>

<style>

</style>