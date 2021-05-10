<template>
    <ValidationProvider
        :customMessages="{ required: trans('Required') }"
        :rules="{ required: { allowFalse: false } }"
        :vid="vid"
        ref="provider"
        tag="div"
        #default="{ errors, valid }"
    >
        <v-checkbox
            @change="$emit('change', $event)"
            :error-messages="errors"
            :id="cid"
            :input-value="checked"
            :label="trans(label)"
            :success="valid"
        />
    </ValidationProvider>
</template>

<script>
import { ValidationProvider } from "vee-validate";

export default {
    name: "LskInputCheckbox",

    components: {
        ValidationProvider,
    },

    model: {
        prop: "checked",
        event: "change",
    },

    props: {
        cid: { type: String, required: true },
        checked: { type: Boolean, required: true },
        label: { type: String, required: true },
        vid: { type: String, required: true },
    },
};
</script>
