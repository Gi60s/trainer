<template>
  <div class="lesson-edit">
    <div class="buttons">
      <v-dialog v-model="dialog">
        <v-btn color="secondary" slot="activator"><v-icon>settings</v-icon> Settings</v-btn>
        <v-card>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="title" label="Title" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="description" label="Description"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <tags-input :tags="tags" v-on:tags-changed="updateTags"></tags-input>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary" @click.native="dialog = false">Edit Content</v-btn>
            <v-btn color="accent" :disabled="!modified" @click="save(); dialog=false"><v-icon>save</v-icon> Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-btn color="accent" :disabled="!modified" @click="save()"><v-icon>save</v-icon> Save</v-btn>
    </div>
    <div class="editor">
      <!--<textarea :value="input" @input="update"></textarea>-->
      <ace-editor class="ace-editor" language="markdown" :content="content" v-on:update="update"></ace-editor>
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
  import marked from 'marked'
  import tagsInput from './tags-input'
  import { parseLessonContent } from '~/assets/js/util'

  const sectionBreak = `<div style='border-bottom: 1px solid #333; text-align: center; height: 1px; margin: 10px 0;'>
    <div style="display: inline-block; background: #FFF; transform: translateY(-50%); padding: 0 10px;">Section Break</div>
  </div>`

  export default {

    components: {
      'ace-editor': aceEditor,
      'tags-input': tagsInput
    },

    data() {
      const lesson = this.$store.state.lessons.current
      return {
        content: lesson.content,
        description: lesson.description,
        dialog: false,
        id: lesson.id,
        init: {
          content: lesson.content,
          description: lesson.description,
          tags: lesson.tags.join(','),
          title: lesson.title
        },
        pages: [],
        pageIndex: 0,
        tags: lesson.tags,
        title: lesson.title
      }
    },

    computed: {

      compiledMarkdown() {
        if (this.pages.length && this.content) {
          const page = this.pages[this.pageIndex]
          const v = page.sections.map(s => marked(s, { sanitize: false }))
            .join(sectionBreak)
          return v
        } else {
          return ''
        }
      },

      modified() {
        const init = this.init
        return init.content !== this.content ||
          init.description !== this.description ||
          init.title !== this.title ||
          init.tags !== this.tags.join(',')
      }
    },

    mounted() {
      this.update(this.$store.state.lessons.current.content)
    },

    methods: {
      debouncedUpdate: _.debounce(function() {
        this.update(this.content)
      }, 300),

      save() {
        this.$store.dispatch('lessons/save', {
          content: this.content,
          description: this.description,
          id: this.id,
          tags: this.tags,
          title: this.title
        });
      },

      update(value) {
        const data = parseLessonContent(value)
        this.content = value
        this.pages = data.pages
        this.pageTitles = data.titles

        // make sure the current page is not outside the number of pages
        const length = this.pages.length
        if (this.pageIndex >= length) {
          this.pageIndex = length ? length - 1 : 0
        }
      },

      updateTags(tags) {
        this.tags = tags
      }
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
