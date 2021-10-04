import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import { mergeClasses } from '@material-ui/styles';
import Button from '@material-ui/core/Button';


const drawerWidth = 240;

const useStyles = makeStyles({
    drawer: {
        width: drawerWidth,
        background: "black"
    },
    drawerPaper: {
        width: drawerWidth,
        background: "white"
    },
    logoutButton: {
        position: "absolute",
        bottom: 0,
        // right: 0,
        textAlign: "center"
    }
})

const MainDrawer = (props) => {
    const { logoutHandler } = props;
    const classes = useStyles();

    return (
        <div>
            <Drawer className={classes.drawer} variant="permanent" anchor="left" classes={{ paper: classes.drawerPaper }}>
                <div>
                    <Typography variant="h5">
                        Harmony
                    </Typography>
                </div>
                <Button color="inherit" onClick={logoutHandler} className={classes.logoutButton}>Logout</Button>
            </Drawer>
        </div>
    )
}

export default MainDrawer;
