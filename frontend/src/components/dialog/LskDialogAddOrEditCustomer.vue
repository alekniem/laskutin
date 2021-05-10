<template>
    <v-dialog max-width="700" persistent v-model="dialogVisible">
        <ValidationObserver #default="{ handleSubmit, invalid }" ref="observer">
            <v-form>
                <v-card>
                    <v-card-title :id="cid + 'Title'">
                        {{ title }}
                    </v-card-title>
                    <v-card-text>
                        <v-row dense>
                            <v-col>
                                <LskInputText
                                    :cid="cid + 'NameInput'"
                                    label="Name"
                                    vid="name"
                                    v-model="inputData.name"
                                />
                            </v-col>
                            <v-col>
                                <LskInputText
                                    :cid="cid + 'AddressLineOneInput'"
                                    label="Address line 1"
                                    vid="address_line_one"
                                    v-model="inputData.address_line_one"
                                />
                            </v-col>
                            <v-col>
                                <LskInputText
                                    :cid="cid + 'AddressLineTwoInput'"
                                    label="Address line 2"
                                    vid="address_line_two"
                                    v-model="inputData.address_line_two"
                                />
                            </v-col>
                        </v-row>
                        <template v-if="otherErrors">
                            <LskBaseError
                                v-for="(error, key) in otherErrors"
                                :key="key"
                            >
                                {{ error | trans }}
                            </LskBaseError>
                        </template>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer />
                        <LskInputButton
                            @click.native="processCancel"
                            :cid="cid + 'CancelButton'"
                            buttonText="Cancel"
                        />
                        <LskInputButton
                            @click.native="handleSubmit(processSave)"
                            :cid="cid + 'SaveButton'"
                            :disabled="invalid || saveButtonDisabled"
                            buttonText="Save"
                        />
                    </v-card-actions>
                </v-card>
            </v-form>
        </ValidationObserver>
    </v-dialog>
</template>

<script>
import LskDialogAddOrEdit from "@/mixins/LskDialogAddOrEdit";

export default {
    name: "LskDialogAddOrEditCustomer",

    mixins: [LskDialogAddOrEdit],

    props: {
        cid: { type: String, required: true },
    },

    data() {
        return {
            fields: ["name", "address_line_one", "address_line_two"],
        };
    },

    computed: {
        apiActionName() {
            return this.id ? "customerUpdate" : "customerStore";
        },

        title() {
            return this.id
                ? this.trans("Edit customer") + " (" + this.id + ")"
                : this.trans("Add new customer");
        },
    },
};
</script>
