<template>
  <div class="lesson-edit">
    <div class="buttons">
      <v-btn color="secondary">Preview</v-btn>
      <v-btn color="secondary">Reader</v-btn>
    </div>
    <div>Pages...</div>
    <div class="editor">
      <textarea :value="input" @input="update"></textarea>
      <div v-html="compiledMarkdown"></div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import lessonEdit from '~/components/lesson-edit'
  import marked from 'marked'

  export default {

    components: {
      'lesson-edit': lessonEdit
    },

    data() {
      return {
        input: ''
      }
    },

    computed: {
      compiledMarkdown() {
        console.log(marked, this.input)
        return this.input
          ? marked(this.input, { sanitize: true })
          : ''
      }
    },

    methods: {
      update: _.debounce(function(e) {
        this.input = e.target.value
      }, 300)
    }

  }
</script>

<style lang="stylus" scoped>
  .lesson-edit {
    display: flex;
    flex-direction: column;

    .editor {
      flex: 1;
      position: relative;
      min-height: 250px;

      textarea {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 50%;
        border: 1px solid #999;
      }

      div {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        width: 50%;
        border: 1px solid #999;
      }
    }
  }
</style>
