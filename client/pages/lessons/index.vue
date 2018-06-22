<template>
  <section>
    <p>
      <v-btn color="primary" @click="edit('')">
        <v-icon>add_circle</v-icon>
        Create a Lesson
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
        main: 'Lessons'
      }
    },

    // overwrite default page search
    pageSearch ({ to, from, previous }) {
      return null;
    },

    methods: {
      edit(id) {
        this.$router.push('/lessons/edit/' + id)
      }
    }


  }
</script>

<style lang="stylus" scoped>

</style>
