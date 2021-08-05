<template>
  <v-form @submit.prevent="onSearch">
    <v-text-field
      v-model="song_name"
      outlined
      label="Song Name"
      prepend-icon="mdi-magnify"
    ></v-text-field>
  </v-form>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      song_name: "",
    };
  },
  methods: {
    onSearch() {
      this.$emit("song-name", this.song_name);
    },
  },
};
</script>
