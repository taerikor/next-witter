import React, { useCallback, useEffect } from 'react'
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
    const [email, onEmailChange] = useInput('')
    const [password, onPasswordChange] = useInput('')
    const dispatch = useDispatch();
    const {logInLoading, logInError} = useSelector(state => state.user)

    useEffect(() => {
        if(logInError){
            alert(logInError)
        }
    }, [logInError])

    const onSubmit = useCallback(() => {
        dispatch(loginRequestAction({email,password}))
    }, [email, password])

    return (
        <FormWrapper onFinish={onSubmit}>
            <div>
                <label htmlFor='user-email'>Email</label>
                <br />
                <Input name='user-email' type='email' value={email} onChange={onEmailChange} required />
            </div> 
            <div>
            <label htmlFor='user-password'>Password</label>
                <br />
                <Input name='user-password' type='password' value={password} onChange={onPasswordChange} required />
            </div>
            <ButtonWrapper>
                <Button type='primary' htmlType='submit' loading={logInLoading}>Log in</Button>
                <Link href='/signup'><a><Button>Register</Button></a></Link>
            </ButtonWrapper>
        </FormWrapper>
    )
}

export default LoginForm
