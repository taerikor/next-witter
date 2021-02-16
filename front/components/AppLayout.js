import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { Menu, Input, Row, Col } from 'antd'
import UserProfile from './UserProfile'
import LoginForm from './LoginForm'
import styled from 'styled-components'

const SearchWrapper = styled(Input.Search)`
    vertical-align: middle;
`


const AppLayout = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    return (
        <div>
            <Menu mode='horizontal'>
                <Menu.Item>
                <Link href='/'><a>Home</a></Link>
                </Menu.Item>
                <Menu.Item>
                <Link href='/profile'><a>Profile</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <SearchWrapper></SearchWrapper>
                </Menu.Item>
                <Menu.Item>
                <Link href='/signup'><a>Sign Up</a></Link>
                </Menu.Item>
            </Menu>
            <Row gutter={8}>
                <Col sm={24} md={6}>
                    {isLoggedIn ? <UserProfile setIsLoggedIn={setIsLoggedIn} /> : <LoginForm setIsLoggedIn={setIsLoggedIn} /> }
                </Col>
                <Col sm={24} md={12}>
            {children}
                </Col>
                <Col sm={24} md={6}>
                    <a href='https://github.com/taerikor' target='_blank' rel='noreferrer noopener'>By Taeri</a>
                </Col>
            </Row>
        </div>
    )
}

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
  }

export default AppLayout
