import lsk_api from "@/plugins/lsk_api";

export default {
    data() {
        return {
            actions: [
                {
                    title: "Show",
                    iconName: "mdi-monitor",
                    clickFunction: this.showItem,
                },
                {
                    title: "Delete",
                    iconName: "mdi-delete",
                    clickFunction: this.deleteItem,
                },
            ],
            apiActionName: "",
            showItemRouteName: "",
            tableData: [],
            errorMessage: null,

            counterAddDialog: 0,
            counterDeleteDialog: 0,

            showAddDialog: false,
            showDeleteDialog: false,

            selectedId: null,
        };
    },

    computed: {
        keyAddDialog() {
            return "add_dialog_" + this.counterAddDialog;
        },

        keyDeleteDialog() {
            return "delete_dialog_" + this.counterDeleteDialog;
        },
    },

    watch: {
        showAddDialog(value) {
            if (!value) this.queryApi();
        },

        showDeleteDialog(value) {
            if (!value) this.queryApi();
        },
    },

    mounted() {
        this.queryApi();
    },

    methods: {
        queryApi() {
            lsk_api
                .query(this.apiActionName, null, null)
                .then((response) => this.parseResponse(response.data))
                .catch((error) => this.parseError(error.response.data));
        },

        parseResponse(data) {
            this.tableData = data;
            this.errorMessage = null;
        },

        parseError(data) {
            this.tableData = [];
            this.errorMessage = data.message || "Failed to get data";
        },

        addItem() {
            this.counterAddDialog++;
            this.showAddDialog = true;
        },

        showItem(item) {
            this.$router.push({
                name: this.showItemRouteName,
                params: { id: item.id },
            });
        },

        deleteItem(item) {
            this.selectedId = item.id;
            this.counterDeleteDialog++;
            this.showDeleteDialog = true;
        },
    },
};
