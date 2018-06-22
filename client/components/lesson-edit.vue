<template>
  <div class="lesson-edit">
    <div class="buttons">
      <v-btn color="secondary" ><v-icon>settings</v-icon> Settings</v-btn>
      <v-btn color="accent" :disabled="!changed" @click="save()"><v-icon>save</v-icon> Save</v-btn>
    </div>
    <div class="editor">
      <!--<textarea :value="input" @input="update"></textarea>-->
      <ace-editor class="ace-editor" language="markdown" v-on:update="update"></ace-editor>
      <div class="preview">
        <div class="preview-nav" v-if="pages.length">
          <v-btn color="secondary" :disabled="pageIndex === 0" @click="pageIndex--"><v-icon>chevron_left</v-icon></v-btn>
          <v-menu offset-y>
            <v-btn slot="activator" color="secondary" class="page-title-button">{{pageTitles[pageIndex]}}</v-btn>
            <v-list>
              <v-list-tile v-for="(title, index) in pageTitles" :key="index" @click="pageIndex = index">
                <v-list-tile-title>{{ title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
          <v-btn color="secondary" :disabled="pageIndex + 1 >= pages.length" @click="pageIndex++"><v-icon>chevron_right</v-icon></v-btn>
        </div>
        <div class="preview-content" v-html="compiledMarkdown"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import aceEditor from './ace-editor'
  import lessonEdit from '~/components/lesson-edit'
  import marked from 'marked'

  const rxPageSplit = /^={2,}$/m
  const rxPageTitle = /^#{1,}\s*(.*)$/m
  const rxSectionSplit = /^-{2,}$/m
  const sectionBreak = `<div style='border-bottom: 1px solid #333; text-align: center; height: 1px; margin: 10px 0;'>
    <div style="display: inline-block; background: #FFF; transform: translateY(-50%); padding: 0 10px;">Section Break</div>
  </div>`

  export default {

    components: {
      'ace-editor': aceEditor,
      'lesson-edit': lessonEdit
    },

    props: {
      content: {
        type: String,
        default: ''
      }
    },

    data() {
      return {
        initial: '',
        input: '',
        pages: [],
        pageIndex: 0,
        section: 0
      }
    },

    computed: {
      changed() {
        return this.initial !== this.input;
      },

      compiledMarkdown() {
        if (this.pages.length && this.input) {
          const page = this.pages[this.pageIndex]
          const v = page.map(s => marked(s, { sanitize: false }))
            .join(sectionBreak)
          return v
        } else {
          return ''
        }
      }
    },

    mounted() {
      this.initial = this.content;
    },

    methods: {
      save() {
        this.$emit('save', this.input)
      },

      update: _.debounce(function(value) {
        const pageTitles = []

        this.input = value

        this.pages = value
          .split(rxPageSplit)
          .map((s, index) => {
            const match = rxPageTitle.exec(s)
            pageTitles.push(match ? match[1] : 'Page ' + (index + 1))

            return s.trim()
              .split(rxSectionSplit)
              .map(v => v.trim())
          })

        this.pageTitles = pageTitles
      }, 300)
    }

  }
</script>

<style lang="stylus" scoped>
  .lesson-edit {
    position: relative;
    height: 100%;

    .buttons {
      position: absolute;
      bottom: 10px;
      right: 15px;
      z-index: 2;
      background: rgba(255,255,255,.75);
      border-radius: 2px;
    }

    .editor {
      height: 100%;

      .ace-editor {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 50%;
        border-right 1px solid #999;
      }

      .preview {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        width: 50%;

        .preview-nav {
          position: absolute;
          top: 0;
          right: 15px;
          z-index: 1;
          background: rgba(255,255,255,.75);
          border-radius: 2px;
        }

        .preview-content {
          position: relative;
          overflow: auto;
          max-height: 100%;
          padding: 50px 10px;
        }
      }
    }
  }
</style>
