<template>
    <ValidationProvider
        :customMessages="{ integer: trans('Invalid biller id') }"
        :vid="vid"
        ref="provider"
        rules="integer"
        tag="div"
        #default="{ errors, valid }"
    >
        <v-select
            @change="$emit('input', $event)"
            :error-messages="errors"
            :id="cid"
            :items="items"
            :label="trans(label)"
            :success="valid"
            :value="value"
        />
    </ValidationProvider>
</template>

<script>
import lsk_api from "@/plugins/lsk_api";
import { ValidationProvider } from "vee-validate";

export default {
    name: "LskInputSelectBiller",

    components: {
        ValidationProvider,
    },

    props: {
        cid: { type: String, required: true },
        label: { type: String, required: true },
        value: { type: [String, Number], required: true },
        vid: { type: String, required: true },
    },

    data() {
        return {
            items: [],
        };
    },

    mounted() {
        lsk_api
            .query("billerIndex", null, null)
            .then((response) => this.parseResponse(response.data))
            .catch(() => (this.items = []));
    },

    methods: {
        parseResponse(data) {
            this.items = data.map((line) => ({
                value: line.id,
                text:
                    line.id +
                    ". " +
                    line.name +
                    ", " +
                    line.address_line_one +
                    ", " +
                    line.address_line_two,
            }));
        },
    },
};
</script>
