import React from 'react'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-hooks-web'
import { Post } from '../types/post'
import { HitsProps } from 'react-instantsearch-hooks-web/dist/es/ui/Hits'

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIS_KEY as string,
  process.env.NEXT_PUBLIC_ALGOLIS_SEARCH_KEY as string
)

const Hit: HitsProps<Post>['hitComponent'] = ({ hit }) => {
  return <div>{hit.title}</div>
}

const SearchPost = () => {
  return (
    <div>
      <h1>検索ページ</h1>
      <InstantSearch indexName="posts" searchClient={searchClient}>
        <SearchBox />
        <Hits<Post> hitComponent={Hit} />
      </InstantSearch>
    </div>
  )
}

export default SearchPost
