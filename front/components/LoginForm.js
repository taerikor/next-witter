import React, { useCallback, useState } from 'react'
import { Input, Form, Button } from 'antd'
import Link from 'next/link'
import styled from 'styled-components'
import useInput from '../hooks/useInput'
import { useDispatch, useSelector } from 'react-redux'
import { loginRequestAction } from '../reducers/user'

const ButtonWrapper = styled.div`
    margin-top: 10px;
`

const FormWrapper = styled(Form)`
        padding: 10px;    
`

const LoginForm = () => {
    const [id, onIdChange] = useInput('')
    const [password, onPasswordChange] = useInput('')
    const dispatch = useDispatch();
    const {isLoggingIn} = useSelector(state => state.user)

    const onSubmit = useCallback(() => {
        dispatch(loginRequestAction({id,password}))
    }, [id, password])

    return (
        <FormWrapper onFinish={onSubmit}>
            <div>
                <label htmlFor='user-id'>Id</label>
                <br />
                <Input name='user-id' value={id} onChange={onIdChange} required />
            </div> 
            <div>
            <label htmlFor='user-password'>Password</label>
                <br />
                <Input name='user-password' type='password' value={password} onChange={onPasswordChange} required />
            </div>
            <ButtonWrapper>
                <Button type='primary' htmlType='submit' loading={isLoggingIn}>Log in</Button>
                <Link href='/signup'><a><Button>Register</Button></a></Link>
            </ButtonWrapper>
        </FormWrapper>
    )
}

export default LoginForm
