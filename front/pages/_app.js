import React from 'react'
import PropTypes from 'prop-types'
import 'antd/dist/antd.css'
import Head from 'next/head'

const App = ({ Component }) => {
    return (
        <>
    <Head>
        <title>NexTwitter</title>
    </Head>
    < Component />
    </>
    )
}

App.propTypes = {
    Component: PropTypes.elementType.isRequired
}

export default App;