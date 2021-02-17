import React, { useCallback, useState } from 'react'
import AppLayout from '../components/AppLayout'
import { Form, Input, Checkbox, Button } from 'antd'
import useInput from '../hooks/useInput'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { SIGN_UP_REQUEST } from '../reducers/user'

const ErrorMessage = styled.div`
    color: red ;
`

function signup() {
    const dispatch = useDispatch()
    const { signUpLoading } = useSelector(state => state.user)

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
        // setTermError(term !== passwordConfirm)
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

export default signup
