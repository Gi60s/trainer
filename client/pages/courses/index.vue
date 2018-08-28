<template>
  <section>
    <v-btn v-if="$byu.user" absolute bottom right fab color="accent" @click="edit('')">
      <v-icon>add</v-icon>
    </v-btn>

    <v-tabs v-model="activeTab" v-if="$byu.user">
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

            <p v-if="!courses.length">There are no courses.</p>
            <v-list v-else two-line>
              <v-list-tile v-for="(course, index) in courses">
                <v-list-tile-avatar>
                  <v-icon v-if="course.joined" large color="success">check_circle</v-icon>
                  <v-icon v-else large>add_circle</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title v-html="course.title"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="course.description"></v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>

          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>

    <div v-else>
      <p v-if="!courses.length">There are no courses.</p>
      <v-list v-else two-line>
        <v-list-tile v-for="(course, index) in courses">
          <v-list-tile-content>
            <v-list-tile-title v-html="course.title"></v-list-tile-title>
            <v-list-tile-sub-title v-html="course.description"></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </div>
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

    asyncData () {
      return {
        activeTab: 0,
        courses: [
          {
            title: 'First Course',
            description: 'This is the first course. You should take it if you do not have anything to do.',
            joined: true
          },
          {
            title: 'Second Course',
            description: 'More to do',
            joined: false
          },
          {
            title: 'Third Course',
            description: 'Keep it busy',
            joined: false
          }
        ]
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
