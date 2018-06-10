<template>
  <section>
    <p>
      <v-btn color="primary" @click="edit('')">
        <v-icon>add_circle</v-icon>
        Create a Course
      </v-btn>
    </p>
  </section>
</template>

<script>
  import courseEdit from '~/components/course-edit'
  import { site as defaults } from '~~/config'

  export default {

    components: {
      'course-edit': courseEdit
    },

    // overwrite default page title for this page
    pageTitle ({ to, from, previous }) {
      return {
        pre: defaults.pageTitle.main,
        main: 'Courses'
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
