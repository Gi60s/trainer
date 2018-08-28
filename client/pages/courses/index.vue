<template>
  <section>

    <v-tabs v-model="activeTab">
      <v-tab key="myCourses">
        My Courses
      </v-tab>
      <v-tab-item key="myCourses">
        <v-card flat>
          <v-card-text>
            <p>You are not currently enrolled in any courses.</p>
            <p>
              <v-btn color="primary" class="action-button" @click="activeTab='1'">
                <v-icon>search</v-icon>
                Join a Course
              </v-btn>
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab key="allCourses">
        All Courses
      </v-tab>
      <v-tab-item key="allCourses">
        <v-card flat>
          <v-card-text>
            <p>
              <v-btn color="primary" class="action-button" @click="edit('')">
                <v-icon>add_circle</v-icon>
                Create a Course
              </v-btn>
            </p>

            <p>There are no courses.</p>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </section>
</template>

<script>
  import courseEdit from '~/components/course-edit'
  import { site as defaults } from '~~/config'

  export default {

    components: {
      'course-edit': courseEdit
    },

    // overwrite default page title for this page
    pageTitle ({ to, from, previous }) {
      return {
        pre: defaults.pageTitle.main,
        main: 'Courses'
      }
    },

    // overwrite default page search
    pageSearch ({ to, from, previous }) {
      return null;
    },

    data () {
      return {
        activeTab: 0
      }
    },

    methods: {
      edit(id) {
        this.$router.push('/courses/edit/' + id)
      }
    }

  }
</script>

<style lang="stylus" scoped>

</style>
