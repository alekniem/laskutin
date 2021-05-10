<template>
    <ValidationProvider
        :customMessages="{ regex: trans('Invalid money amount') }"
        :rules="{ regex: /^-*\d+(,\d{0,2}){0,1}$/ }"
        :vid="vid"
        ref="provider"
        tag="div"
        #default="{ errors, valid }"
    >
        <v-text-field
            @change="$emit('input', $event)"
            :error-messages="errors"
            :id="cid"
            :label="trans(label)"
            :success="valid"
            :value="value"
        />
    </ValidationProvider>
</template>

<script>
import { ValidationProvider } from "vee-validate";

export default {
    name: "LskInputMoney",

    components: {
        ValidationProvider,
    },

    props: {
        cid: { type: String, required: true },
        label: { type: String, required: true },
        value: { type: [String, Number], required: true },
        vid: { type: String, required: true },
    },
};
</script>
