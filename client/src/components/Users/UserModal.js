import React, { Component } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, withStyles } from '@material-ui/core'
import Button from 'reactstrap/lib/Button'

const styles = theme => ({
      dialog: {
        padding:  theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
      },
      dialogContent: {
          textAlign: 'center'
      },
      dialogActions : {
          justifyContent : 'center'
      }
    
  });
  
    // interface props extends WithStyles<typeof styles>{ }

class UserModal extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //   userModal : props.userModal
        // };
      }
      


    render() {

        const { userModal} = this.props
        const { classes } = this.props;

        return (
            <Dialog open={userModal.isOpen} classes={{paper:classes.dialog}}>
                <DialogTitle>
                    
                </DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <Typography variant="h6" >
                        { userModal.title }
                    </Typography>
                    <Typography variant="subtitle2" >
                        { userModal.subtitle }
                    </Typography>
                </DialogContent>
                <DialogActions className={classes.dialogActions}>
                    <Button color="success" onClick={this.props.onDelete}>Yes</Button>
                    {/* <Button onClick= {()=>this.setState({ userModal: {isOpen:false, title:'', subtitle:'' } })} >No</Button> */}
                     
                    <Button onClick={this.props.onClose} >No</Button>


                </DialogActions>

            </Dialog>
            
        )
        
    }
}
export default withStyles(styles, { withTheme: true })(userModal)