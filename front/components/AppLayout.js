import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { Menu, Input, Row, Col } from 'antd'
import UserProfile from './UserProfile'
import LoginForm from './LoginForm'
import styled,{ createGlobalStyle } from 'styled-components'
import { useSelector } from 'react-redux'

const SearchWrapper = styled(Input.Search)`
    vertical-align: middle;
`

const Global = createGlobalStyle`
  .ant-row {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
  
  .ant-col:first-child {
      padding-left: 0 !important;
  }
  
  .ant-col:last-child {
    padding-right: 0 !important;
  }
`;


const AppLayout = ({ children }) => {
    const {user} = useSelector(state => state.user)

    return (
        <div>
            <Global />
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
                    {user ? <UserProfile  /> : <LoginForm  /> }
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
