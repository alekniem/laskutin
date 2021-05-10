<template>
    <v-list-item :id="cid" link>
        <v-list-item-title>
            {{ text | trans }}
        </v-list-item-title>
    </v-list-item>
</template>

<script>
export default {
    name: "LskBaseMenuItem",

    props: {
        cid: { type: String, required: true },
        text: { type: String, required: true },
    },
};
</script>
