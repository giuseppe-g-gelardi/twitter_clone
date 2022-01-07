import React from 'react'
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

      </div>
    </div>
  )
}

export default Widgets
