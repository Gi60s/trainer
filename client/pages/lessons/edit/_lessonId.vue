<template>
 <div>
   <lesson-edit :lesson-id="$route.params.lessonId"></lesson-edit>
 </div>
</template>

<script>
  import { site as defaults } from '~~/config';
  import lessonEdit from '~/components/lesson-edit'

  export default {

    components: {
      'lesson-edit': lessonEdit
    },

    // overwrite default page title for this page
    pageTitle ({ to, from, previous }) {
      return {
        pre: defaults.pageTitle.main,
        main: 'Edit Lesson'
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
