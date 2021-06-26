import React from 'react'

const Activity = ({activity}) => {
  if (activity.progress) {
    if (activity.progress.includes('-')) {
      return (
        <p key={activity.id}>{activity.status}: {activity.media.title.romaji} episodes: {activity.progress}</p>
      )
    } else {
      return (
        <p key={activity.id}>{activity.status}: {activity.media.title.romaji} episode: {activity.progress}</p>
      )
    }
  } else {
    return (
      <p key={activity.id}>{activity.status}: {activity.media.title.romaji} </p>
    )
  }
}
const Activities = ({activities}) => {
  return (
    <div>
      {activities.map(a => <Activity key={a.id} activity={a} />)}
    </div>
  )
}

export default Activities