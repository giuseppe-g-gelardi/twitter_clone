import React, { useState } from 'react'
import { Button, Container } from '@material-ui/core'

import RegisterForm from '../components/forms/RegisterForm'
import Controls from '../components/controls/Controls'

export default function RegisterPage() {

  const [openPopup, setOpenPopup] = useState(false)

  return (
    <Container>

      <Button
        onClick={() => setOpenPopup(true)}
      >
        Register
      </Button>

      <Controls.Popup
        text='Register Account'
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <RegisterForm setOpenPopup={setOpenPopup} />
      </Controls.Popup>
      
    </Container>
  )
}
