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
                <v-toolbar-title>Registration form</v-toolbar-title>
                <div class="flex-grow-1"></div>
                
              </v-toolbar>
              <v-card-text>
                <v-form v-model="valid" ref="form" validation lazy>
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

                  <v-text-field
                    id="repassword"
                    label="Confirm password"
                    name="repassword"
                    type="password"
                    v-model="repassword"
                    :counter="6"
                    :rules="comfirmPasswordRules"
                  ></v-text-field>

                  <v-card-actions>
                        <div class="flex-grow-1"></div>
                        <v-btn 
                        color="primary"
                        @click="onSubmit"
                        :disabled="!valid">Create</v-btn>
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
            repassword: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
            passwordRules:[
                v => !!v || 'Password is required',
                v => v.length >= 6 || 'Name must be greater than 6 characters',
            ],
            comfirmPasswordRules:[
                v => !!v || 'Password is required',
                v => v === this.password || "pass doens't match"
            ]
        }
    },
    methods: {
        onSubmit(){
            if(this.$refs.form.validate()){
                const user = {
                    email: this.email,
                    password: this.password
                }
                console.log(user)
            }
        }
    }
}
</script>

<style>

</style>