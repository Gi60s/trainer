<template>
  <div>
    <v-select v-model="chips" label="Tags" chips tags solo prepend-icon="filter_list" append-icon="" clearable v-on:input="tagsChanged">
      <template slot="selection" slot-scope="data">
        <v-chip :selected="data.selected" close @input="remove(data.item)">{{ data.item }}</v-chip>
      </template>
    </v-select>
  </div>
</template>

<script>

  export default {
    props: {
      tags: {
        type: Array,
        default: []
      }
    },

    data() {
      return {
        chips: this.tags.filter(v => typeof v === 'string')
      }
    },

    methods: {
      remove(name) {
        const index = this.chips.indexOf(name)
        if (index !== -1) {
          this.chips.splice(index, 1)
          this.chips = [... this.chips]
        }
      },

      tagsChanged() {
        this.chips.sort()
        this.$emit('tags-changed', [... this.chips])
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
</style>
