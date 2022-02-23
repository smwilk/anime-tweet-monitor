require("dotenv").config()
const express = require("express")
const cors = require("cors")
const axios = require('axios');

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

const port = 5000

const twitterApiKey = process.env.TWITTER_API_BEARER_TOKEN

// Endpoint to fetch Tweets from Twitter API
app.get("/anime", (req, res) => {
  // Query (anime title) sent from the client
  // Remove colons from the query to stop the request from breaking
  const query = req.query?.search.replace(':', ' ')
  const config = {
    method: 'get',
    url: "https://api.twitter.com/2/tweets/search/recent?query=" + encodeURI(query) + "&tweet.fields=possibly_sensitive",
    headers: { 
      'Authorization': 'Bearer ' + twitterApiKey
    }
  }

  axios(config)
    .then((response) => {
      // Filter out possibly sensitive Tweets
      const filteredTweets = response.data.data
        .filter((item) => {
          return !item.possibly_sensitive
        })
      res.send({data: filteredTweets})
    })
    .catch((error) => {
      res.status(500).send(error)
    })
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})