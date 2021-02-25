import React, { useEffect } from 'react'
import { List, Card, Button } from 'antd'
import { StopOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { REMOVE_FOLLOWER_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user'

const FollowList = ({ header, data, onClickMore, loading }) => {
    const dispatch = useDispatch()

    const onCancel = (id) => () => {
        if(header === 'Following'){
            dispatch({
                type:UNFOLLOW_REQUEST,
                data:id
            })
        }else{
            dispatch({
                type:REMOVE_FOLLOWER_REQUEST,
                data:id
            })
        }
    }

    return (
        <List
        style={{ marginBottom: 20}}
        grid={{ gutter: 4, xs: 2, md: 3}}
        size='small'
        header={<div>{header}</div>}
        loadMore={<div style={{ textAlign: 'center', margin:'10px 0'}}>
            <Button onClick={onClickMore} loading={loading}>Load More</Button>
            </div>}
        bordered
        dataSource={data}
        renderItem={(item) => (
            <List.Item style={{ marginTop: 20}}>
                <Card actions={[<StopOutlined key='stop' onClick={onCancel(item.id)} />]}>
                    <Card.Meta description={item.nickname} />
                </Card>
            </List.Item>
        )}
        />
    )
}

FollowList.propTypes = {
    header: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    onClickMore: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
}

export default FollowList
