import '../Layout.css'
import Sidebar from './Sidebar'
import SuggestedUsers from './SuggestedUsers'

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
        <SuggestedUsers />
      </div>
    </div>
  )
}
