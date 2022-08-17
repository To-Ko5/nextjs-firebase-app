import React, { ReactNode } from 'react'
import algoliasearch from 'algoliasearch/lite'
import { debounce } from 'debounce'
import {
  InstantSearch,
  SearchBox,
  Hits,
  HitsProps,
  SearchBoxProps,
  useInstantSearch,
  Pagination,
  Configure
} from 'react-instantsearch-hooks-web'
import { Post } from '../types/post'
import { SearchIcon } from '@heroicons/react/solid'

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIS_KEY as string,
  process.env.NEXT_PUBLIC_ALGOLIS_SEARCH_KEY as string
)

const Hit: HitsProps<Post>['hitComponent'] = ({ hit }) => {
  return (
    <div className="rounded-sm shadow p-4">
      <p>{hit.title}</p>
    </div>
  )
}

const NoResultsBoundary = ({ children }: { children: ReactNode }) => {
  const { results } = useInstantSearch()

  if (!results.__isArtificial && results.nbHits === 0) {
    return (
      <>
        <div className="text-sm text-slate-500 my-4">
          【{results.query}】検索結果はありませんでした
        </div>
      </>
    )
  }

  return (
    <div>
      {results.query && (
        <p className="text-sm text-slate-500 my-4">
          {results.query}の検索結果は{results.nbHits}件でした。
        </p>
      )}
      {children}
    </div>
  )
}

const SearchPost = () => {
  const search: SearchBoxProps['queryHook'] = (query, hook) => {
    hook(query)
  }
  return (
    <div className="container">
      <h1 className="mb-4 text-xl">検索ページ</h1>
      <InstantSearch indexName="posts" searchClient={searchClient}>
        <SearchBox
          queryHook={debounce(search, 500)}
          classNames={{
            root: 'relative inline-block',
            input: 'border-slate-400 pr-10',
            submitIcon: 'hidden',
            resetIcon: 'hidden'
          }}
          submitIconComponent={() => (
            <div className="absolute top-1/2 right-0 -translate-y-1/2 p-2 w-10">
              <SearchIcon className="text-slate-500" />
            </div>
          )}
        />
        <Configure hitsPerPage={2} />
        <NoResultsBoundary>
          <Hits<Post>
            hitComponent={Hit}
            classNames={{ list: 'space-y-4 my-4' }}
          />
          <Pagination
            classNames={{
              list: 'flex space-x-3',
              link: 'py-2 px-3 block',
              selectedItem: 'text-blue-400',
              disabledItem: 'text-gray-500 opacity-40'
            }}
          />
        </NoResultsBoundary>
      </InstantSearch>
    </div>
  )
}

export default SearchPost
