import React, {useEffect, useMemo, useState} from 'react'
import styled from 'styled-components'
import {findNavPath, getNav$} from './helpers'

const IFrame = styled.iframe`
  display: block;
  border: 0;
  width: 100%;
  height: 100%;
`

export function ArticlePreview(props: {documentId: string}) {
  const {documentId} = props
  const [path, setPath] = useState<string[] | null>(null)
  const [loading, setLoading] = useState(true)
  const baseUrl = useMemo(() => {
    if (typeof window === 'undefined') {
      return '/'
    }

    if (location.hostname === 'localhost') {
      return 'http://localhost:3000/'
    }

    return 'https://sanity.io/ui/'
  }, [])

  useEffect(() => {
    const nav$ = getNav$()

    const sub = nav$.subscribe((result) => {
      setPath(findNavPath(result, documentId, []) || null)
      setLoading(false)
    })

    return () => {
      sub.unsubscribe()
    }
  }, [documentId])

  if (loading) {
    return <div>Loading</div>
  }

  if (path === null) {
    return <div>could not find the article in the navigation structure</div>
  }

  return <IFrame src={`${baseUrl}${path.join('/')}`} />
}
