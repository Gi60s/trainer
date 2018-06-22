<template>
 <div class="fill-area">
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

    mounted() {
      // this.$store.commit('trainer/lessonUpdate', {
      //   title: '',
      //   tags: [],
      //   content: '# Lesson Editor\n\nUse -- to create a section break\n\nUse == to create a page break'
      // })
    },

    data() {
      // perform ajax request to load selected lesson
      console.log(this.$rou)
      return {
        store: ''
      }
    }

  }
</script>

<style lang="stylus" scoped>

</style>
