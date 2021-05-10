<template>
    <v-list-item :id="listItemId">
        <v-list-item-content
            class="text-caption blue--text text--darken-2 font-weight-bold"
        >
            {{ text | trans }}
        </v-list-item-content>
        <v-list-item-content>
            {{ value }}
        </v-list-item-content>
    </v-list-item>
</template>

<script>
import camelCase from "lodash/camelCase";
import upperFirst from "lodash/upperFirst";

export default {
    name: "LskBaseListItem",

    props: {
        itemId: { type: String, required: true },
        parentId: { type: String, required: true },
        text: { type: String, required: true },
        value: { type: [String, Number], required: true },
    },

    computed: {
        listItemId() {
            return (
                this.parentId + upperFirst(camelCase(this.itemId)) + "ListItem"
            );
        },
    },
};
</script>
