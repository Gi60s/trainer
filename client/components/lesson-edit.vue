<template>
  <div class="lesson-edit">

    <div v-if="!$byu.user">
      <p>You must be signed in to use this page</p>
      <p><v-btn color="accent" @click="$byu.auth.login()">Please sign in</v-btn></p>
    </div>

    <v-speed-dial v-model="fab" absolute bottom right direction="top" open-on-hover transition="slide-y-reverse-transition" v-if="$byu.user">

      <v-tooltip left open-on-hover open-delay="0" close-delay="0" transition="none" slot="activator">
        <v-btn slot="activator" v-model="fab" color="accent" fab @click="save()">
          <v-icon>edit</v-icon>
          <v-icon>save</v-icon>
        </v-btn>
        <span>Save</span>
      </v-tooltip>

      <v-tooltip left open-on-hover open-delay="0" close-delay="0" transition="none" v-if="activeTab === 1">
        <v-btn fab small dark color="secondary" slot="activator" @click="addContent('\n\n--\n\n')">
          <v-icon>pause</v-icon>
        </v-btn>
        <span>Add Pause</span>
      </v-tooltip>

      <v-tooltip left open-on-hover open-delay="0" close-delay="0" transition="none" v-if="activeTab === 1">
        <v-btn fab small dark color="secondary" slot="activator" @click="addContent('\n\n==\n\n')">
          <v-icon>insert_drive_file</v-icon>
        </v-btn>
        <span>Add Page</span>
      </v-tooltip>

      <v-tooltip left open-on-hover open-delay="0" close-delay="0" transition="none">
        <v-btn fab small dark color="secondary" slot="activator">
          <v-icon>content_copy</v-icon>
        </v-btn>
        <span>Copy Lesson</span>
      </v-tooltip>

      <v-tooltip left open-on-hover open-delay="0" close-delay="0" transition="none">
        <v-btn fab small dark color="error" slot="activator">
          <v-icon>delete</v-icon>
        </v-btn>
        <span>Delete</span>
      </v-tooltip>
    </v-speed-dial>

    <v-tabs v-model="activeTab" v-if="$byu.user">
      <v-tab key="summary">Summary</v-tab>
      <v-tab-item key="summary">
        <v-card flat>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="title" label="Title" :rules="[rules.required]"></v-text-field>
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
        </v-card>
      </v-tab-item>

      <v-tab key="content">Content</v-tab>
      <v-tab-item key="content">
        <div class="editor">
          <!--<textarea :value="input" @input="update"></textarea>-->
          <ace-editor class="ace-editor" language="markdown" :content="content" v-on:update="update" ref="editor"></ace-editor>
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
      </v-tab-item>
    </v-tabs>
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
        activeTab: 0,
        fab: false,
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
        title: lesson.title,
        rules: {
          required: value => !!value || 'Required'
        }
      }
    },

    computed: {
      ace() {
        return this.$refs.editor.ace
      },

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
      addContent(text) {
        const editor = this.ace
        editor.session.insert(editor.getCursorPosition(), text)
        editor.focus()
      },

      debouncedUpdate: _.debounce(function() {
        this.update(this.content)
      }, 300),

      save() {
        if (!this.title) {
          this.activeTab = 0
          this.$toast('Missing required field: Title', 'error')
        } else {
          this.$store.dispatch('lessons/save', {
            content: this.content,
            description: this.description,
            id: this.id,
            tags: this.tags,
            title: this.title
          });
        }
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
    },

    watch: {
      activeTab: function(val) {
        if (val === 1) {
          setTimeout(() => this.$refs.editor.ace.resize(), 500);
        }
      }
    }

  }
</script>

<style lang="stylus" scoped>
  .lesson-edit {
    position: relative;
    height: 100%;
    padding-bottom: 48px;

    .v-tabs {
      height: 100%;

      > :last-child {
        height: 100%;
      }
    }

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
