<template>
  <div class="ace-editor" ref="editor"></div>
</template>

<script>
  import vue from 'vue'

  export default {

    props: {
      content: {
        type: String,
        default: ''
      },
      theme: {
        type: String,
        default: 'textmate'
      },
      language: {
        type: String,
        default: 'markdown'
      }
    },

    mounted() {
      const editor = vue.ace.edit(this.$refs.editor)
      editor.getSession().setMode('ace/mode/' + this.language)
      editor.setTheme('ace/theme/' + this.theme)
      editor.setValue(this.content)
      editor.resize()
      editor.on('change', () => {
        this.$emit('update', editor.getValue())
      })
    }

  }
</script>

<style lang="stylus" scoped>
  .ace-editor {
    width: 100%;
    height: 100%;
  }
</style>
