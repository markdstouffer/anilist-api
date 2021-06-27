import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { GET_USERINFO, GET_ACTIVITY } from '../queries'
import { useDispatch } from 'react-redux'
import { addFollowing } from '../reducers/followingReducer'
//components
import Activities from './Activities'

const User = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')

  const [user, setUser] = useState(null)
  const [activity, setActivity] = useState(null)

  const [ getUserInfo, { loading: userLoading, data: userData } ] = useLazyQuery(GET_USERINFO,
    { pollInterval: 10000 })
  const [ getActivity, { loading: activityLoading, data: activityData } ] = useLazyQuery(GET_ACTIVITY,
    { pollInterval: 10000 })

  const findUser = (nameSubmitted) => {
    getUserInfo({ 
      variables: { name: nameSubmitted }
    })
  }

  const findActivity = (idSubmitted) => {
    getActivity({ 
      variables: { userId: idSubmitted }
    })
  }
  
  useEffect(() => {
    if (userData) {
      setUser(userData.User)
    }
  }, [userData])

  useEffect(() => {
    if (user) {
      findActivity(user.id)
      setActivity(activityData)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, activityData])

  if (userLoading || activityLoading) {
    return <div>loading...</div>
  }

  if (user && activity) {
    const activities = activity.Page.activities
    const userWithActivity = {
      user: user,
      activity: activities
    }
    return (
      <div>
        <h1><a href={user.siteUrl}>{user.name}</a></h1>
        <img src={user.avatar.large} alt="profile pic" />
        <p>{user.name} has watched <strong>{user.statistics.anime.count}</strong> anime, 
          totalling <em>{user.statistics.anime.minutesWatched}</em> minutes of anime watched!</p>
        <Activities activities={activities} />
        <button onClick={() => {dispatch(addFollowing(userWithActivity))}}>follow</button>
        <button onClick={() => {
          setName('')
          setUser(null)
          }}>
          cancel
        </button>
      </div>
    )
  }

  return (
    <div>
      <form>
        <input
          type="text"
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
        <button 
          type='submit'
          onClick={(e) => {
            e.preventDefault()
            findUser(name)
          }}>submit</button>
      </form>
    </div>
  )
}

export default User
