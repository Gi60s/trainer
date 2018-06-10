<template>
 <div>
   <lesson-edit :store="store"></lesson-edit>
 </div>
</template>

<script>
  import lessonEdit from '~/components/lesson-edit'
  import { site as defaults } from '~~/config';

  export default {

    components: {
      'lesson-edit': lessonEdit
    },

    // overwrite default page title for this page
    pageTitle ({ to, from, previous }) {
      return {
        pre: defaults.pageTitle.main,
        main: 'Create a Lesson'
      }
    },

    // overwrite default page search
    pageSearch ({ to, from, previous }) {
      return null;
    },

    data() {
      return {}
    }

  }
</script>

<style lang="stylus" scoped>

</style>
