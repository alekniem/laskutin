<template>
    <v-list :id="cid" dense>
        <slot />
    </v-list>
</template>

<script>
export default {
    name: "LskBaseList",

    props: {
        cid: { type: String, required: true },
    },
};
</script>
