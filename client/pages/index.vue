<template>
    <section class="container">
        <h1>Home Page</h1>
        <p v-if="$byu.user">You're logged in</p>
        <p v-else>Not logged in</p>

        <h2>Vuetify</h2>
        <p>This starter also has Vuetify set up with some style modifications to bring it into compliance with the BYU style guide.</p>
        <div>
            <v-btn color="primary" @click="dialog=true">Primary</v-btn>
            <v-btn color="secondary">Secondary</v-btn>
            <v-btn color="accent">Accent</v-btn>
            <v-btn color="success">Success</v-btn>
            <v-btn color="error">Error</v-btn>
            <v-btn color="warning">Warning</v-btn>
            <v-btn color="info">Info</v-btn>
        </div>

        <v-alert :value="true" type="success">Success</v-alert>
        <v-alert :value="true" type="info">Info</v-alert>
        <v-alert :value="true" type="warning">Warning</v-alert>
        <v-alert :value="true" type="error">Error</v-alert>
    </section>
</template>

<script>
    export default {

    }
</script>

<style lang="stylus" scoped>

</style>
