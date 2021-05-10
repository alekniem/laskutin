<template>
    <v-menu bottom left>
        <template #activator="{ attrs, on }">
            <v-btn :id="activatorId" icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
        </template>
        <v-list>
            <slot />
        </v-list>
    </v-menu>
</template>

<script>
export default {
    name: "LskBaseMenu",

    props: {
        activatorId: { type: String, required: true },
    },
};
</script>
