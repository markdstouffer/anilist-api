import React from 'react'

export const Activity = ({activity}) => {
  if (activity) {
    if (activity.progress) {
      if (activity.progress.includes('-')) {
        return (
          <div key={activity.id}>{activity.status}: {activity.media.title.romaji} episodes: {activity.progress}</div>
        )
      } else {
        return (
          <div key={activity.id}>{activity.status}: {activity.media.title.romaji} episode: {activity.progress}</div>
        )
      }
    } else {
      return (
        <div key={activity.id}>{activity.status}: {activity.media.title.romaji} </div>
      )
    }
  }
  return <div>no recent activities</div>
}
const Activities = ({activities}) => {
  return (
    <div>
      {activities.map(a => <Activity key={a.id} activity={a} />)}
    </div>
  )
}

export default Activities