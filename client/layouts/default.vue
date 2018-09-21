<template>
    <div>
        <v-snackbar v-model="toast.visible" top :timeout="toast.duration" :color="toast.color">
            {{ toast.message }}
            <v-btn flat @click="toast.visible = false">Close</v-btn>
        </v-snackbar>

        <byu-header constrain-top-bar>

            <!-- site title -->
            <h1 slot="site-title" v-if="!hasSubtitle">{{pageTitle.main}}</h1>
            <span v-if="hasSubtitle && pageTitle.pre" slot="site-title" class="subtitle">{{pageTitle.pre}}</span>
            <span v-if="hasSubtitle" slot="site-title">{{pageTitle.main}}</span>
            <span v-if="hasSubtitle && pageTitle.post" slot="site-title" class="subtitle">{{pageTitle.post}}</span>

            <!-- site search -->
            <byu-search slot="search" placeholder="Search" v-if="searchEnabled">
                <form method="get" @submit.prevent="searchSubmit">
                    <input type="search" name="search" id="byuSiteSearch" autocomplete="off"
                           :value="searchValue" @input="searchUpdate">
                </form>
            </byu-search>

            <!-- user login / logout -->
            <byu-user-info slot="user" login-url="#login">
                <a slot="login" href="#" @click.prevent="$byu.auth.login()">Sign In</a>
                <a slot="logout" href="#" @click.prevent="$byu.auth.logout()">Sign Out </a>
                <span slot="user-name" v-if="user">{{user.preferredFirstName}}</span>
            </byu-user-info>

            <!-- show navigation if there are links -->
            <byu-menu slot="nav" v-if="hasNavigation">
                <template v-for="link in navigationLinks">
                    <nuxt-link v-if="isLocalLink(link.href)"
                               active-class="active" exact
                               :to="link.href">{{link.title}}</nuxt-link>
                    <a v-else :href="link.href">{{link.title}}</a>
                </template>
            </byu-menu>

        </byu-header>

        <v-app id="page-content">
            <nuxt />
        </v-app>

        <byu-footer></byu-footer>
    </div>
</template>

<script>
  const rxExternalUrl = /https?:\/\//;

  export default {

    data() {
      const data = {
        toast: {
          message: '',
          color: 'default',
          duration: 4000,
          visible: false
        }
      }
      this.$root.$on('toast', payload => {
        if (payload.message) {
          data.toast.message = payload.message
          data.toast.color = payload.color || 'default'
          data.toast.duration = payload.duration || 4000
          data.toast.visible = true
        } else {
          data.toast.visible = false
        }
        console.log(data.toast)
      })
      return data
    },

    computed: {
      hasNavigation () {
        return this.navigationLinks.length > 0;
      },
      hasSubtitle () {
        const title = this.pageTitle;
        return title.pre || title.post || false;
      },
      navigationLinks () {
        return this.$store.state.byu.navigationLinks;
      },
      searchEnabled () {
        return !this.$byu.search.disabled;
      },
      searchValue () {
        return this.$byu.search.value;
      },
      pageTitle () {
        return this.$store.state.byu.pageTitle;
      },
      user () {
        return this.$store.state.wabs.user;
      }
    },
    methods: {
      isLocalLink (value) {
        return !rxExternalUrl.test(value)
      },
      searchSubmit () {
        this.$byu.search.submit(this.searchValue, false);
      },
      searchUpdate (e) {
        this.$byu.search.value = e.target.value;
      }
    }
  }
</script>

<style scoped>

</style>