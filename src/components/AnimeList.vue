<template>
  <div class="anime-list-container">
    <div
      v-for="anime in animeList"
      :key="anime.id"
      @click="getTweets(getTitleInSelectedLocale(anime))"
    >
      <img
        :src="anime.coverImage.large"
        :alt="anime.title.romaji + 'cover image'"
        class="cover-image"
      >
      <div v-if="$i18n.locale === 'en'">
        {{ anime.title.romaji }}
      </div>
      <div v-else>
        {{ anime.title.native }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    getTweets: {
      type: Function,
      required: true
    },
    animeList: {
      type: Array,
      required: true
    }
  },
  methods: {
    /**
    * Returns the anime title in the currently selected language
    * @param {String} anime - Title of the anime selected
    */
    getTitleInSelectedLocale(anime) {
      if (this.$i18n.locale === "en") {
        return anime.title.romaji
      } else {
        return anime.title.native
      }
    }
  }
}
</script>

<style>
.anime-list-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  grid-gap: 10px;
  padding-bottom: 40px;
}

.cover-image {
  height: 220px;
  width: 180px;
  cursor: pointer;
  border-radius: 5%
}
</style>
