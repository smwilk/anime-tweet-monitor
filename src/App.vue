<template>
  <div class="app">
    <!--Language switcher-->
    <div
      :style="{visibility: !showTweets ? 'visible' : 'hidden'}"
      class="language-switcher-container"
    >
      <a
        v-if="$i18n.locale !== 'ja'"
        @click="changeLanguage('ja')"
      >
        日本語
      </a>
      <strong
        v-if="$i18n.locale === 'ja'"
      >
        日本語
      </strong>
      &nbsp;|&nbsp;
      <a
        v-if="$i18n.locale !== 'en'"
        @click="changeLanguage('en')"
      >
        English
      </a>
      <strong
        v-if="$i18n.locale === 'en'"
      >
        English
      </strong>
    </div>
    <!--Twitter logo-->
    <img
      alt="Twitter logo"
      src="./assets/logo.png"
      class="logo"
    >
    <!--App title-->
    <h1>{{ $t("message.app-title") }}</h1>
    <h3 v-if="!showTweets">
      {{ $t("message.app-instruction") }}
    </h3>
    <!--Tweet list (only shown once anime image is clicked)-->
    <div v-if="showTweets">
      <div
        class="return-button"
        @click="resetTweetStatus"
      >
        ⬅︎ {{ $t("message.return-to-list") }}
      </div>
      <TweetList
        :tweet-list="tweetList"
        :anime-title="animeTitle"
        :is-loading="loading"
        :tweets-found="tweetsFound"
      />
    </div>
    <!--Anime list-->
    <div v-else>
      <AnimeList
        :anime-list="animeList"
        :get-tweets="getTweets"
      />
    </div>
  </div>
</template>

<script>
import AnimeList from "./components/AnimeList.vue"
import TweetList from "./components/TweetList.vue"
import { animeQuery } from "./graphql/query"
import axios from "axios"

export default {
  name: "App",
  components: {
    AnimeList,
    TweetList
  },
  data: function () {
    return {
      animeList: [],
      tweetList: [],
      showTweets: false,
      animeTitle: "",
      loading: true,
      tweetsFound: true
    }
  },
  mounted: function() {
    // Load the Twitter widgets script
    let tweetScript = document.createElement("script")
    tweetScript.setAttribute("src", "https://platform.twitter.com/widgets.js")
    document.head.appendChild(tweetScript)
    /**
     * Wait for script to load before binding event listener
     * Arrow functions are necessary here to maintain Vue context in scope
     * This event emits on the render of each tweet widget on the page
     * See: https://developer.twitter.com/en/docs/twitter-for-websites/javascript-api/guides/javascript-api
     */
    tweetScript.onload = () => {
      window.twttr.events.bind(
        "rendered",
        () => {
          this.loading = false
        }
      )
    }
    this.getAnime()
  },

  methods: {
    /**
     * Gets a list of anime from https://graphql.anilist.co using GraphQL
     */
    getAnime() {
      const config = {
        method: "POST",
        url: "https://graphql.anilist.co",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        data: {
          query: animeQuery,
          // Set the number of pages and how many shows to display per page
          variables: {
            page: 1,
            perPage: 10
          }
        }
      }

      axios(config)
        .then((result) => {
          this.animeList = result.data.data.Page.media
        })
        .catch((error) => {
          console.error("Error fetching anime: ", error)
        })
    },
    /**
    * Resets the statuses of data related to Tweets
    */
    resetTweetStatus() {
      this.showTweets = false
      this.tweetsFound = true  
    },
    /**
    * Gets Tweets about the anime selected by the user
    * Sends request to the /anime endpoint, which is defined in server.js
    * @param {String} title - Title of the anime selected
    */
    getTweets(title) {
      this.loading = true
      this.animeTitle = title
      const config = {
        method: "get",
        url: `http://localhost:4112/anime?search=${title}`
      }

      axios(config)
        .then(response => {
          // Render the Tweet elements
          this.tweetList = response.data.data
          this.showTweets = true
          /**
          * Load the Twitter Widgets script to re-embed Tweets
          * See: https://developer.twitter.com/en/docs/twitter-for-websites/javascript-api/guides/scripting-loading-and-initialization
          */
          window.twttr.widgets.load()
          // If no Tweets were found, show "There are no Tweets to show with for this anime."
          if (response.data.length === 0) {
            this.tweetsFound = false
          }
        })
        .catch(error => {
          console.log("Error fetching Tweets: ", error)
        })
    },
    /**
    * Toggles the current language
    * @param {String} lang - Language to switch to, either English or Japanese
    */
    changeLanguage(lang) {
      this.$i18n.locale = lang
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;    
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin: 0 100px;
  height: 480px;
  padding: 10px;
}
a {
  cursor: pointer;
  color: #00acee;
}

.logo {
  width: 3rem;
}

.return-button {
  text-align: left;
  color: #00acee;
  cursor: pointer;
}

.language-switcher-container {
  padding-bottom: 16px;
  height: 21.6px;
}
</style>
