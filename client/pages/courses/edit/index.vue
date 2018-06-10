<template>
 <div>
   <course-edit></course-edit>
 </div>
</template>

<script>
  import courseEdit from '~/components/course-edit'
  import { site as defaults } from '~~/config';

  export default {

    components: {
      'course-edit': courseEdit
    },

    // overwrite default page title for this page
    pageTitle ({ to, from, previous }) {
      return {
        pre: defaults.pageTitle.main,
        main: 'Create a Course'
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
