import React from 'react'
import algoliasearch from 'algoliasearch/lite'
import { debounce } from 'debounce'
import {
  InstantSearch,
  SearchBox,
  Hits,
  HitsProps,
  SearchBoxProps
} from 'react-instantsearch-hooks-web'
import { Post } from '../types/post'

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIS_KEY as string,
  process.env.NEXT_PUBLIC_ALGOLIS_SEARCH_KEY as string
)

const Hit: HitsProps<Post>['hitComponent'] = ({ hit }) => {
  return <div>{hit.title}</div>
}

const SearchPost = () => {
  const search: SearchBoxProps['queryHook'] = (query, hook) => {
    hook(query)
  }
  return (
    <div>
      <h1>検索ページ</h1>
      <InstantSearch indexName="posts" searchClient={searchClient}>
        <SearchBox queryHook={debounce(search, 500)} />
        <Hits<Post> hitComponent={Hit} />
      </InstantSearch>
    </div>
  )
}

export default SearchPost
