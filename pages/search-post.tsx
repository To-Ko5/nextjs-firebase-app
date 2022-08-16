import React from 'react'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch, SearchBox } from 'react-instantsearch-hooks-web'

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIS_KEY as string,
  process.env.NEXT_PUBLIC_ALGOLIS_SEARCH_KEY as string
)

const SearchPost = () => {
  return (
    <div>
      <h1>検索ページ</h1>
    </div>
  )
}

export default SearchPost
