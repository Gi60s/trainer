<template>
 <div>
   <course-edit :course-id="$route.params.courseId"></course-edit>
 </div>
</template>

<script>
  import { site as defaults } from '~~/config';
  import courseEdit from '~/components/course-edit'

  export default {

    components: {
      'course-edit': courseEdit
    },

    // overwrite default page title for this page
    pageTitle ({ to, from, previous }) {
      return {
        pre: defaults.pageTitle.main,
        main: 'Edit Course'
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
