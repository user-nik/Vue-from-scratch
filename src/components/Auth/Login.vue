<template>
  <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login form</v-toolbar-title>
                <div class="flex-grow-1"></div>
                
              </v-toolbar>
              <v-card-text>
                <v-form v-model="valid" ref="form" validation>
                  <v-text-field
                    label="Email"
                    name="email"
                    type="text"
                    v-model="email"
                    :rules="emailRules"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    v-model="password"
                    :counter="6"
                    :rules="passwordRules"
                  ></v-text-field>
                  <v-card-actions>
                        <div class="flex-grow-1"></div>
                        <v-btn 
                        color="primary"
                        @click="onSubmit"
                        :loading="loading"
                        :disabled="!valid || loading">Login</v-btn>
                    </v-card-actions>
                </v-form>
              </v-card-text>
              
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
</template>

<script>
export default {
    data(){
        return{
            email: '',
            password: '',
            valid: false,
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
            passwordRules:[
                v => !!v || 'Password is required',
                v => v.length >= 6 || 'Name must be greater than 6 characters',
            ]
        }
    },
    computed: {
      loading() {
        return this.$store.getters.loading
      }
    },
    methods: {
        onSubmit(){
            if(this.$refs.form.validate()){
                const user = {
                    email: this.email,
                    password: this.password
                }
                this.$store.dispatch('loginUser', user)
                .then(() =>{
                  this.$router.push('/')
                }) 
                .catch(err=> {})
            }
        }
    },
    created(){
      if(this.$route.query['loginError']){
        this.$store.dispatch('setError', 'Please login')
      }
    }
}
</script>

<style>

</style>