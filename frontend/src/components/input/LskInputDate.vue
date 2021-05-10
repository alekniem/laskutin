<template>
    <ValidationProvider
        :customMessages="{ regex: trans('Invalid date') }"
        :rules="{ regex: /^\d{1,2}\.\d{1,2}\.\d{4}$/ }"
        :vid="vid"
        ref="provider"
        tag="div"
        #default="{ errors, valid }"
    >
        <v-text-field
            :error-messages="errors"
            :id="cid"
            :label="trans(label)"
            :success="valid"
            v-model="textFieldValue"
        />
    </ValidationProvider>
</template>

<script>
import { ValidationProvider } from "vee-validate";

export default {
    name: "LskInputDate",

    components: {
        ValidationProvider,
    },

    props: {
        cid: { type: String, required: true },
        label: { type: String, required: true },
        value: { type: String, required: true },
        vid: { type: String, required: true },
    },

    data() {
        return {
            textFieldValue: null,
        };
    },

    watch: {
        textFieldValue() {
            if (/^\d{1,2}\.\d{1,2}\.\d{4}$/.test(this.textFieldValue)) {
                let parts = this.textFieldValue.split(".");
                let date = new Date(parts[2], parts[1] - 1, parts[0]);
                let result = this.formatDate(date, "YYYY-MM-DD");
                this.$emit("input", result);
            }
        },
    },

    mounted() {
        if (/^\d{4}-\d{2}-\d{2}$/.test(this.value)) {
            this.textFieldValue = this.formatDate(this.value, "D.M.YYYY");
        } else {
            this.textFieldValue = this.value;
        }
    },
};
</script>
