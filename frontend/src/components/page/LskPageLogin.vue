<template>
    <v-form>
        <v-row>
            <v-col cols="12">
                <LskBaseCard max-width="700">
                    <template #header>
                        <LskBaseToolbar :titleId="cid + 'Title'">
                            {{ "Login" | trans }}
                        </LskBaseToolbar>
                    </template>
                    <v-card-text>
                        <v-row dense>
                            <v-col>
                                <v-text-field
                                    @keyup.enter="focusPasswordField"
                                    :id="cid + 'UsernameField'"
                                    :label="trans('Username')"
                                    ref="usernameField"
                                    v-model="username"
                                />
                            </v-col>
                            <v-col>
                                <v-text-field
                                    @keyup.enter="processLogin"
                                    :id="cid + 'PasswordField'"
                                    :label="trans('Password')"
                                    ref="passwordField"
                                    type="password"
                                    v-model="password"
                                />
                            </v-col>
                        </v-row>
                        <v-row dense>
                            <v-col>
                                <LskInputButton
                                    @click.native="processLogin"
                                    :cid="cid + 'LoginButton'"
                                    buttonText="Login"
                                />
                            </v-col>
                        </v-row>
                        <v-row dense v-if="error">
                            <v-col>
                                <LskBaseError class="pt-4">
                                    {{ error | trans }}
                                </LskBaseError>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </LskBaseCard>
            </v-col>
        </v-row>
    </v-form>
</template>

<script>
import lsk_auth from "@/plugins/lsk_auth";

export default {
    name: "LskPageLogin",

    data() {
        return {
            cid: "loginPage",
            error: "",
            password: "",
            username: "",
        };
    },

    mounted() {
        this.$refs.usernameField.focus();
    },

    methods: {
        focusPasswordField() {
            this.$refs.passwordField.focus();
        },

        async processLogin() {
            await lsk_auth.login(
                this.username,
                this.password,
                (loggedIn, error) => {
                    this.error = error;
                    if (loggedIn) {
                        this.$router.replace({ name: "indexInvoice" });
                    }
                }
            );
        },
    },
};
</script>
