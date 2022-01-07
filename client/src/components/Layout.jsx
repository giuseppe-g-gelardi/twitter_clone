import '../Layout.css'
import Sidebar from './Sidebar'
import Widgets from './Widgets'

export default function Layout ({ children }) {
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        maxWidth: '1300px',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '10px'
      }}
    >
      <div className='sidebar-left'>
        <Sidebar />
      </div>
      <div className='main-content'>{children}</div>
      <div className='sidebar-right'>
        {/* 3 random users to follow */}
        {/* search filter for all users */}
        <Widgets />
      </div>
    </div>
  )
}
