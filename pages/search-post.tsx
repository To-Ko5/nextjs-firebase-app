import React, { ReactNode } from 'react'
import algoliasearch from 'algoliasearch/lite'
import { debounce } from 'debounce'
import {
  InstantSearch,
  SearchBox,
  Hits,
  HitsProps,
  SearchBoxProps,
  useInstantSearch
} from 'react-instantsearch-hooks-web'
import { Post } from '../types/post'

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIS_KEY as string,
  process.env.NEXT_PUBLIC_ALGOLIS_SEARCH_KEY as string
)

const Hit: HitsProps<Post>['hitComponent'] = ({ hit }) => {
  return <div>{hit.title}</div>
}

const NoResultsBoundary = ({ children }: { children: ReactNode }) => {
  const { results } = useInstantSearch()

  if (!results.__isArtificial && results.nbHits === 0) {
    return (
      <>
        <div>【{results.query}】検索結果はありませんでした</div>
      </>
    )
  }

  return <>{children}</>
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
        <NoResultsBoundary>
          <Hits<Post> hitComponent={Hit} />
        </NoResultsBoundary>
      </InstantSearch>
    </div>
  )
}

export default SearchPost
