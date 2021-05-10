<template>
    <v-card v-bind="$attrs">
        <slot name="header" />
        <v-divider />
        <slot />
    </v-card>
</template>

<script>
export default {
    name: "LskBaseCard",
};
</script>
