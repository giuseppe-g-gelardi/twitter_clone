import React from 'react'
// import "./Widgets.css"
// import {
//     TwitterTimelineEmbed,
//     TwitterShareButton, TwitterTweetEmbed
// } from "react-twitter-embed"
import SearchIcon from '@material-ui/icons/Search'

function Widgets () {
  return (
    <div style={{ flex: '0.3' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#f5f8fa',
          padding: '10px',
          borderRadius: '20px',
          marginTop: '10px',
          marginLeft: '20px'
        }}
      >
        <SearchIcon style={{ color: 'grey' }} />
        <input placeholder='Search Twitter' type='text' />
      </div>

      <div
        style={{
          marginTop: '15px',
          marginLeft: '20px',
          padding: '20px',
          backgroundColor: '#f5f8fa',
          borderRadius: '20px'
        }}
      >
        <h2 style={{ fontSize: '18px', fontWeight: '800' }}>What's happening</h2>

        {/* <TwitterTweetEmbed tweetId={"1399787983209996289"} />

            <TwitterTimelineEmbed 
            sourceType="profile"
            screenName="BarackObama"
            options={{height: 400}}
            />

            <TwitterShareButton
            url={"https://twitter.com/BarackObama"}
            options={{text:"#barackObama", via:"barackObama"}} /> */}
      </div>
    </div>
  )
}

export default Widgets
