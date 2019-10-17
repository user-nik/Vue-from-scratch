<template>
    <v-dialog width="400px" v-model="modal" >
        <template slot="activator" slot-scope="{ on }">
            <v-btn class="primary" text v-on="on">Buy</v-btn>
        </template>
        <v-card>
            <v-container>
                <v-layout row>
                    <v-flex xs12>
                        <v-card-title>
                            <h3 class="text--primary">Do you want to buy it?</h3>
                        </v-card-title>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <v-card-text>
                            <v-text-field
                                label="Name"
                                name="name"
                                type="text"
                                v-model="name"
                            >
                            </v-text-field>
                            <v-textarea
                                label="phone"
                                name="phone"
                                type="text"
                                v-model="phone"
                            >
                            </v-textarea>
                        </v-card-text>
                    </v-flex>
                </v-layout>

                <v-layout row>
                    <v-flex xs12>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn 
                            class="" 
                            text 
                            @click="onCancel"
                            :disabled="localLoading"
                            >Close</v-btn>

                            <v-btn 
                            class="success" 
                            text 
                            @click="onSave"
                            :disabled="localLoading"
                            :loading="localLoading"
                            >Buy</v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ["ad"],
    data(){
        return {
            modal: false,
            name: '',
            phone: '',
            localLoading: false
        }
    },
    methods: {
        onCancel() {
            this.name = ''
            this.phone = ''

            this.modal = false
            
        },
        onSave() {
            if(this.name !== '' && this.phone !== ''){
                this.localLoading = true
                this.$store.dispatch('createOrder',{
                    name: this.name,
                    phone: this.phone,
                    adId: this.ad.id,
                    ownerId: this.ad.owner
                })
                .finally(()=>{
                    this.name = ''
                    this.phone = ''
                    this.localLoading = false
                    this.modal = false
                })
                
                
            }
        }
    },
}
</script>

<style>

</style>