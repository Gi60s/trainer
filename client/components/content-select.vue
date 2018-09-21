<template>
  <div>
    <h2>Temporary - this will eventually probably show up in another tab or modal or ...</h2>
    <v-container grid-list-md>

      <v-layout row wrap>
        <v-flex xs12>
          <v-text-field label="Search"></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs12>
          <tags-input :tags="tags" v-on:tags-changed="updateTags"></tags-input>
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex xs12 sm4>
          <h3>Lessons</h3>
          <v-list two-line>
            <template v-for="(item, index) in lessons">
              <v-list-tile :key="item.id">
                <v-list-tile-avatar :color="item.color">{{item.type}}</v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{item.title}}</v-list-tile-title>
                  <v-list-tile-sub-title>{{item.description}}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
        </v-flex>

        <v-flex xs12 sm4>
          <h3>Projects</h3>
          <v-list two-line>
            <template v-for="(item, index) in lessons">
              <v-list-tile :key="item.id">
                <v-list-tile-avatar :color="item.color">{{item.type}}</v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{item.title}}</v-list-tile-title>
                  <v-list-tile-sub-title>{{item.description}}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
        </v-flex>

        <v-flex xs12 sm4>
          <h3>Quizzes</h3>
          <v-list two-line>
            <template v-for="(item, index) in lessons">
              <v-list-tile :key="item.id">
                <v-list-tile-avatar :color="item.color">{{item.type}}</v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{item.title}}</v-list-tile-title>
                  <v-list-tile-sub-title>{{item.description}}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import tagsInput from '~/components/tags-input'

  export default {

    components: {
      'tags-input': tagsInput
    },

    data() {
      return {
        tags: [],
        lessons: [],
        projects: [],
        quizzes: []
      }
    },

    methods: {
      updateFilter() {

      },

      updateTags(tags) {
        this.tags = tags
        this.updateFilter()
      }
    }

  }
</script>

<style lang="stylus" scoped>
  .avatar {
    cursor: move;
  }

  .section-label {
    padding: 0;
    font-size: 16px;
  }
</style>
