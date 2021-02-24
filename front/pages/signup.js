import React, { useCallback, useEffect, useState } from 'react'
import AppLayout from '../components/AppLayout'
import { Form, Input, Checkbox, Button } from 'antd'
import useInput from '../hooks/useInput'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { LOAD_MY_INFO_REQUEST, SIGN_UP_REQUEST } from '../reducers/user'
import Router from 'next/router'
import { END } from 'redux-saga'
import wrapper from '../store/configureStore'
import axios from 'axios'

const ErrorMessage = styled.div`
    color: red ;
`

function signup() {
    const dispatch = useDispatch()
    const { signUpLoading, signUpDone, signUpError, user } = useSelector(state => state.user)

    useEffect(() => {
        if(signUpDone){
            Router.replace('/')
        }
    }, [signUpDone])

    useEffect(() => {
        if(user?.id){
            Router.replace('/')
        }
    }, [user])

    useEffect(() => {
        if(signUpError){
            alert(signUpError)
        }
    }, [signUpError])


    const [email, onEmailChange] = useInput('')
    const [password, onPasswordChange] = useInput('')
    const [nickname, onNicknameChange] = useInput('')

    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const onPasswordConfirmChange = useCallback((e) => {
        setPasswordConfirm(e.target.value)
        setPasswordError(e.target.value !== password)
    }, [password])

    const [term, setTerm] = useState(false)
    const [termError, setTermError] = useState(false)
    const onTermChange = useCallback((e) => {
        setTerm(e.target.checked)
        setTermError(false)
    }, [])



    const onSubmit = useCallback(() => {
        if(password !== passwordConfirm) {
            return setPasswordError(true)
        }
        if(!term){
            return setTermError(true)
        }
        dispatch({
            type: SIGN_UP_REQUEST,
            data: {email, password, nickname}
        })

    }, [email, password, passwordConfirm, term])

    return (
        <AppLayout>
            <Form onFinish={onSubmit}>
            <div>
                <label htmlFor='user-nickname'>Nickname</label>
                <br />
                <Input name='user-nickname' value={nickname} onChange={onNicknameChange} required />
            </div> 
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
            <div>
            <label htmlFor='user-passwordConfirm'>Password Confirm</label>
                <br />
                <Input 
                name='user-passwordConfirm' 
                type='password'
                value={passwordConfirm}
                onChange={onPasswordConfirmChange}
                required />
                {passwordError && <ErrorMessage>Please Check Confirm Password </ErrorMessage>}
            </div>
            <br/>
            <div>
                <Checkbox name='user-term' checked={term} onChange={onTermChange}>Agree</Checkbox>
                {termError && <ErrorMessage>Please Check Agree</ErrorMessage>}
            </div>
            <br />
            <Button type='primary' htmlType='submit' loading={signUpLoading}>Submit</Button>
            </Form>
        </AppLayout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    console.log('getServerSideProps start');
    console.log(context.req.headers);
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch(END);
    console.log('getServerSideProps end');
    await context.store.sagaTask.toPromise();
  });
  

export default signup
