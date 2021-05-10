<template>
    <v-list-group no-action v-bind="$attrs">
        <template #activator>
            <v-list-item-content
                :id="activatorId"
                class="text-caption blue--text text--darken-2 font-weight-bold"
            >
                {{ title | trans }}
            </v-list-item-content>
        </template>
        <LskBaseListItem
            v-for="(itemData, itemId) in items"
            :itemId="itemId"
            :key="itemId"
            :parentId="parentId"
            :text="itemData.text"
            :value="itemData.value"
        />
    </v-list-group>
</template>

<script>
export default {
    name: "LskBaseListGroup",

    props: {
        activatorId: { type: String, required: true },
        items: { type: Object, required: true },
        parentId: { type: String, required: true },
        title: { type: String, required: true },
    },
};
</script>
