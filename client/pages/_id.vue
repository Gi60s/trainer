<template>
    <section class="container">
        <h1>{{$route.params.id}} Page</h1>
    </section>
</template>

<script>
    import { site as defaults } from '~~/config';

    export default {

        // overwrite default page title for this page
        pageTitle ({ to, from, previous }) {
            return {
                pre: defaults.pageTitle.main,
                main: to.params.id
            }
        },

        // overwrite default page search
        pageSearch ({ to, from, previous }) {
            return null;
        },

        // overwrite page navigation for this page
        navigationMenu ({ to, from, previous }) {
            const items = [];
            items.push({ href: '/', title: 'Home' });
            items.push({ href: '/' + to.params.id, title: to.params.id })
            return items;
        }


    }
</script>

<style lang="stylus" scoped>

</style>
