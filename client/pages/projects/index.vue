<template>
  <section>
    <p>
      <v-btn color="primary">
        <v-icon>add_circle</v-icon>
        Create a Project
      </v-btn>
    </p>
  </section>
</template>

<script>
  import { site as defaults } from '~~/config';

  export default {

    // overwrite default page title for this page
    pageTitle ({ to, from, previous }) {
      return {
        pre: defaults.pageTitle.main,
        main: 'Projects'
      }
    },

    // overwrite default page search
    pageSearch ({ to, from, previous }) {
      return null;
    }


  }
</script>

<style lang="stylus" scoped>

</style>
