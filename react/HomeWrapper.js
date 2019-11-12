import React, { useMemo, Fragment } from 'react'
import PropTypes from 'prop-types'
import { useRuntime, canUseDOM } from 'vtex.render-runtime'
import SearchAction from 'vtex.structured-data/SearchAction'
import useDataPixel from './hooks/useDataPixel'

const HomeWrapper = ({ children }) => {
  const { account, route } = useRuntime()

  const pixelEvents = useMemo(() => {
    if (!canUseDOM) {
      return null
    }

    return [
      {
        event: 'pageInfo',
        eventType: 'homeView',
        accountName: account,
        pageTitle: document.title,
        pageUrl: location.href,
        pageCategory: 'Home',
      },
    ]
  }, [account])

  useDataPixel(pixelEvents, route.routeId)

  return (
    <Fragment>
      <SearchAction />
      {children}
    </Fragment>
  )
}

HomeWrapper.propTypes = {
  children: PropTypes.element,
}

export default HomeWrapper
