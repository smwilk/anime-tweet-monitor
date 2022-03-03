<template>
  <div class="tweet-list-container">
    <div class="sub-text">
      {{ $t("message.pre-tweet-header") }}
    </div>
    <h1>{{ animeTitle }}</h1>
    <div class="sub-text">
      {{ $t("message.post-tweet-header") }}
    </div>
    <!--If Tweets were found, show the list of Tweets-->
    <div
      v-if="tweetsFound"
    >
      <rotate-loader
        :loading="isLoading"
        :color="spinnerColor"
        :size="spinnerSize"
        class="spinner"
      />
      <div
        class="tweet-list"
      >
        <div
          v-for="tweet in tweetList"
          :key="tweet.id"
          class="tweet-list"
        >
          <blockquote
            :data-lang="lang"
            data-cards="hidden"
            data-conversation="none"
            data-width="330"
            data
            class="twitter-tweet"
          >
            <a :href="`https://twitter.com/x/status/${tweet.id}`" />
          </blockquote>
        </div>
      </div>
    </div>
    <!--If no Tweets were found, show the message to notify that no Tweets were found-->
    <h3 v-else>
      There are no Tweets to show with for this anime.
    </h3>
  </div>
</template>

<script>
import RotateLoader from "vue-spinner/src/RotateLoader.vue"

export default {
  components: {
    RotateLoader
  },
  props: {
    tweetList: {
      type: Array,
      // Set default Tweet to show in case there are no Tweets to show
      default: () => [{id: "20"}],
    },
    animeTitle: {
      type: String,
      default: ""
    },
    isLoading: {
      type: Boolean,
      default: true
    },
    tweetsFound: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      // Spinner setting
      spinnerColor: "#00acee",
      spinnerSize: "20px",
      lang: this.$i18n.locale
    }
  }
}
</script>

<style scoped>
.tweet-list-container {
  padding-bottom: 40px;
}

.tweet-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(330px, auto));
  grid-gap: 10px;
  padding-bottom: 40px;
  justify-content: center;
}

.spinner {
  padding: 40px;
}

.sub-text {
  margin: 3px 0;
}

h1 {
  margin: 10px 0;
}
</style>
