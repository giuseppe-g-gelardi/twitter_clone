import React from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography } from '@material-ui/core'
import Controls from './Controls'
import { Close } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5)
  },
  DialogTitle: {
    paddingRight: '0px'
  },
  text: {
    color: '#bd93f9',
  }
}))

export default function Popup(props) {

  const { children, openPopup, setOpenPopup, text } = props
  const classes = useStyles()

  return (
    <Dialog open={openPopup} maxWidth='md' classes={{ paper: classes.dialogWrapper }}>
      <DialogTitle className={classes.DialogTitle}>
        <div style={{display: 'flex'}}>
          <Typography variant='h6' component='div' className={classes.text} style={{flexGrow: 1}}>
            {text}
          </Typography>
          <Controls.ActionButton
            color='secondary'
            onClick={() => {setOpenPopup(false)}}
          >
            <Close />
          </Controls.ActionButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        {children}
      </DialogContent>
    </Dialog>
  )
}
