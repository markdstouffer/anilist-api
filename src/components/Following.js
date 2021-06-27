import React from 'react'
import { useSelector } from 'react-redux'
import { Activity } from './Activities'

const Following = () => {
  const following = useSelector(state => state.following)
  console.log('following', following)
  if (following !== []) {
    return (
      <div>
        <h2>Here's who you're watching!</h2>
        <ul>
          {following.map(f => 
            <li key={f.user.id}>
              <h3>
                <img src={f.user.avatar.medium} height="50" width="50" alt="avatar" />
                <a href={f.user.siteUrl}>{f.user.name}</a>
              </h3>
              <em>most recent activity: </em> <Activity activity={f.activity[0]} />
            </li>
            )}
        </ul>
      </div>
    )
  }
  return null
}

export default Following