<template>
 <div>
   TODO: put lesson ui logic here
   This will be for students following an active presentation
 </div>
</template>

<script>
  import { site as defaults } from '~~/config';

  export default {

    // overwrite default page title for this page
    pageTitle ({ to, from, previous }) {
      return {
        pre: defaults.pageTitle.main,
        main: 'Lesson Title Here' // TODO: actual lesson title
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
