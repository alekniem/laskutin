<template>
    <v-app>
        <v-app-bar app color="primary" dark flat>
            <v-toolbar-title>
                <LskLogo />
            </v-toolbar-title>
            <v-spacer />
            <LskInputButton
                @click.native="processLogout"
                buttonText="Logout"
                cid="logoutButton"
                color="blue darken-4"
                v-if="loggedIn"
            />
            <template #extension>
                <v-tabs v-if="loggedIn">
                    <v-tab :to="{ name: 'indexInvoice' }" id="invoiceTab">
                        {{ "Invoices" | trans }}
                    </v-tab>
                    <v-tab :to="{ name: 'indexCustomer' }" id="customerTab">
                        {{ "Customers" | trans }}
                    </v-tab>
                    <v-tab :to="{ name: 'indexBiller' }" id="billerTab">
                        {{ "Billers" | trans }}
                    </v-tab>
                </v-tabs>
                <v-tabs v-else>
                    <v-tab :to="{ name: 'login' }" id="loginTab">
                        {{ "Login" | trans }}
                    </v-tab>
                </v-tabs>
            </template>
        </v-app-bar>
        <v-main>
            <div class="ma-5">
                <router-view />
            </div>
        </v-main>
    </v-app>
</template>

<script>
import lsk_auth from "@/plugins/lsk_auth";

export default {
    name: "App",

    data() {
        return {
            loggedIn: lsk_auth.loggedIn(),
        };
    },

    created() {
        lsk_auth.onChange = (loggedIn) => {
            this.loggedIn = loggedIn;
        };
    },

    methods: {
        async processLogout() {
            await lsk_auth.logout((loggedIn) => {
                if (!loggedIn) {
                    this.$router.replace({ name: "login" });
                }
            });
        },
    },
};
</script>
