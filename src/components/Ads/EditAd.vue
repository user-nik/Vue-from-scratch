<template>
    <v-dialog width="400px" v-model="modal" >
        <template slot="activator" slot-scope="{ on }">
            <v-btn class="warning" text v-on="on">Edit</v-btn>
        </template>
        <v-card>
            <v-container>
                <v-layout row>
                    <v-flex xs12>
                        <v-card-title>
                            <h1 class="text--primary">Edit ad</h1>
                        </v-card-title>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <v-card-text>
                            <v-text-field
                                label="Title"
                                name="title"
                                type="text"
                                v-model="editTitle"
                            >
                            </v-text-field>
                            <v-textarea
                                label="Description"
                                name="Description"
                                type="text"
                                v-model="editDescription"
                            >
                            </v-textarea>
                        </v-card-text>
                    </v-flex>
                </v-layout>

                <v-layout row>
                    <v-flex xs12>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn class="" text @click="onCancel">Cancel</v-btn>
                            <v-btn class="success" text @click="onSave">Save</v-btn>
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
            editTitle: this.ad.title,
            editDescription: this.ad.description
        }
    },
    methods: {
        onCancel() {
            this.editDescription = this.ad.description
            this.editTitle = this.ad.title

            this.modal = false
            
        },
        onSave() {
            if(this.editDescription !== '' && this.editTitle !== ''){
                
                this.$store.dispatch('updateAd',{
                    title: this.editTitle,
                    description: this.editDescription,
                    id: this.ad.id
                })
                
                this.modal = false
            }
        }
    },
}
</script>

<style>

</style>