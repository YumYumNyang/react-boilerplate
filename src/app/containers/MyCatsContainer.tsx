import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useQuery } from 'react-query'

const MyCatsContainer = () => {
  // const { isLoading, isError, data: cats, error } = useQuery('cats', fetchCats)
  return (
    <Suspense fallback={<div>loading</div>}>
      <ErrorBoundary fallback={<div>에러 발생</div>}>
        <div>
          <ul>
            {/* {cats.map((cat: any) => (
            <li key={cat.id}>{cat.title}</li>
          ))} */}
          </ul>
        </div>
      </ErrorBoundary>
    </Suspense>
  )
}

export default MyCatsContainer
