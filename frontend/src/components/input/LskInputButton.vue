<template>
    <v-btn :color="color" :disabled="disabled" :id="cid" depressed small>
        {{ buttonText | trans }}
    </v-btn>
</template>

<script>
export default {
    name: "LskInputButton",

    props: {
        buttonText: { type: String, required: true },
        cid: { type: String, required: true },
        color: { type: String, required: false, default: "primary" },
        disabled: { type: Boolean, required: false, default: false },
    },
};
</script>
