<template>
    <v-toolbar flat>
        <v-toolbar-title :id="titleId">
            <slot />
        </v-toolbar-title>
        <v-spacer />
        <slot name="button" />
    </v-toolbar>
</template>

<script>
export default {
    name: "LskBaseToolbar",

    props: {
        titleId: { type: String, required: true },
    },
};
</script>
