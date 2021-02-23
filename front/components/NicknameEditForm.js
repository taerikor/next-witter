import React, { useCallback, useMemo } from 'react'
import {Form, Input } from 'antd'
import useInput from '../hooks/useInput'
import { useDispatch, useSelector } from 'react-redux'
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user'

function NicknameEditForm() {
    const style = useMemo(()=>({
        marginBottom: '20px', border: '1px solid #d9d9d9', padding: '20px'
    }),[])
    const { user } = useSelector(state => state.user)
    const [nickname,onNicknameChange] = useInput(user?.nickname || '')
    const dispatch = useDispatch();

    const onSubmit = useCallback(() => {
        dispatch({
            type:CHANGE_NICKNAME_REQUEST,
            data: nickname
        })
    },[nickname])
    return (
        <Form style={style}>
            <Input.Search 
            addonBefore='Nickname' 
            enterButton='Edit' 
            value={nickname}
            onChange={onNicknameChange}
            onSearch={onSubmit}
            />
        </Form>
    )
}

export default NicknameEditForm
