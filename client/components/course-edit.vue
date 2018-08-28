<template>
  <v-form v-model="valid">
    <v-speed-dial v-model="fab" absolute bottom right direction="top" open-on-hover transition="slide-y-reverse-transition">

      <v-tooltip left open-on-hover open-delay="0" close-delay="0" transition="none" slot="activator">
        <v-btn slot="activator" v-model="fab" color="accent" fab>
          <v-icon>edit</v-icon>
          <v-icon>save</v-icon>
        </v-btn>
        <span>Save</span>
      </v-tooltip>

      <v-tooltip left open-on-hover open-delay="0" close-delay="0" transition="none">
        <v-btn fab small dark color="secondary" slot="activator">
          <v-icon>content_copy</v-icon>
        </v-btn>
        <span>Copy Course</span>
      </v-tooltip>

      <v-tooltip left open-on-hover open-delay="0" close-delay="0" transition="none">
        <v-btn fab small dark color="error" slot="activator">
          <v-icon>delete</v-icon>
        </v-btn>
        <span>Delete</span>
      </v-tooltip>
    </v-speed-dial>

    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs12>
          <v-text-field v-model="data.title" :rules="titleRules" label="Title" required></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
          <v-radio-group v-model="data.discoverability" label="Discoverability">
            <v-radio label="Private" key="private" value="private"></v-radio>
            <v-radio label="Sharable Link" key="link" value="link"></v-radio>
            <v-radio label="Public" key="public" value="public"></v-radio>
          </v-radio-group>
        </v-flex>
        <v-flex xs12 sm6>
          <v-radio-group v-model="data.guided" label="Instruction">
            <v-radio label="Self Taught" key="private" value="self"></v-radio>
            <v-radio label="Instructor Led" key="link" value="instructor"></v-radio>
            <v-radio label="Self Taught or Instructor Led" key="public" value="both"></v-radio>
          </v-radio-group>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs12>
          <tags-input :tags="data.tags" v-on:tags-changed="updateTags"></tags-input>
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex xs12>
          <v-subheader class="section-label">Material</v-subheader>
          <div>
            <v-btn color="secondary" class="action-button">
              <v-icon>add_circle</v-icon>
              Add a Lesson
            </v-btn>
            <v-btn color="secondary" class="action-button">
              <v-icon>add_circle</v-icon>
              Add a Project
            </v-btn>
            <v-btn color="secondary" class="action-button">
              <v-icon>add_circle</v-icon>
              Add a Quiz
            </v-btn>
          </div>
          <v-list two-line>
            <draggable model="data.materials" class="draggable-list">
              <template v-for="(item, index) in data.materials">
                <v-list-tile :key="item.id">
                  <v-list-tile-avatar :color="item.color">{{item.type}}</v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>{{item.title}}</v-list-tile-title>
                    <v-list-tile-sub-title>{{item.description}}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
            </draggable>
          </v-list>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
  import { deepCopy } from '~/assets/js/util'
  import draggable from 'vuedraggable'
  import tagsInput from '~/components/tags-input'

  export default {

    components: {
      draggable,
      'tags-input': tagsInput
    },

    props: {
      courseId: {
        type: String
      }
    },

    data() {
      const course = this.$store.state.courses.active

      const result = {
        valid: false,

        fab: false,

        data: course ? deepCopy(course) : this.getEmptyCourse(),

        titleRules: [
          v => !!v || 'Title is required'
        ]
      }

      result.data.materials = result.data.materials.map(v => this.getMaterial(v))

      return result
    },

    methods: {
      getEmptyCourse() {
        return {
          id: '',
          title: '',
          discoverability: 'private',
          guided: 'both',
          materials: [],
          tags: []
        }
      },

      getMaterial(item) {
        console.log(item);
        const store = this.$store.state.trainer[item.store]

        if (store && store[item.id]) {
          const value = store[item.id]
          const type = item.store[0].toUpperCase()
          let color = 'error'
          switch (type) {
            case 'L':
              color = 'success'
              break
            case 'P':
              color = 'accent'
              break
            case 'Q':
              color = 'warning'
              break
          }
          return Object.assign({ type, color }, value)
        } else {
          return { title: '** NOT FOUND **', type: '!', description: '', color: 'error' }
        }
      },

      updateTags(tags) {
        this.data.tags = tags
      }
    }

  }
</script>

<style lang="stylus" scoped>
  .avatar {
    cursor: move;
  }

  .draggable-list > * {
    border-bottom: 1px solid rgba(0, 0, 0, .12);

    &:first-child {
      border-top: 1px solid rgba(0, 0, 0, .12);
    }
  }

  .section-label {
    padding: 0;
    font-size: 16px;
  }

  .v-speed-dial--bottom {
    bottom: 0;
  }
</style>
