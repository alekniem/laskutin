<template>
    <ValidationProvider
        :customMessages="{ required: trans('Required') }"
        :vid="vid"
        ref="provider"
        rules="required"
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
    name: "LskInputText",

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
