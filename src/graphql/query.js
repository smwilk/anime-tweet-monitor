export const animeQuery = `
query ($id: Int, $page: Int, $perPage: Int, $search: String) {
  Page (page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media (id: $id, search: $search, sort: POPULARITY_DESC, isAdult: false, countryOfOrigin:JP, source: MANGA) {
      id
      title {
        romaji
        native
      }
      coverImage {
        large
      }
    }
  }
}
`