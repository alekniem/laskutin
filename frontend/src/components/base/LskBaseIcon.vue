<template>
    <v-tooltip bottom>
        <template #activator="{ attrs, on }">
            <v-icon
                @click="clickFunction(parameter)"
                :class="cssClass"
                small
                v-bind="attrs"
                v-on="on"
            >
                {{ iconName }}
            </v-icon>
        </template>
        <span>{{ title | trans }}</span>
    </v-tooltip>
</template>

<script>
export default {
    name: "LskBaseIcon",

    props: {
        clickFunction: { type: Function, required: true },
        cssClass: { type: String, required: false },
        iconName: { type: String, required: true },
        parameter: { type: Object, required: true },
        title: { type: String, required: true },
    },
};
</script>
