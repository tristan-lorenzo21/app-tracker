import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const style = makeStyles({
    logoutButton: {
        // float: "right",
        marginLeft: "auto",
        marginRight: -12
        // display: "inline-block",
        // marginLeft: "15in"
        // flex: 1
    },
    appBar: {
        maxHeight: "70px",
    },
    usernameDisplay: {
        // paddingLeft: "250px"
    },
    grid: {
        justify: "space-between",
        spacing: 24
    }
})

const NavBar = (props) => {
    const classes = style();

    const username = localStorage.getItem("username");

    const { logoutHandler } = props;

    const displayNavbar = (props) => {

        return (
            <Box style={{ flexGrow: 1, display: "flex" }}>
                <AppBar position="static" className={classes.appBar} elevation={0}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className={classes.usernameDisplay}>
                            Welcome, {username}
                        </Typography>

                        <Button color="inherit" onClick={logoutHandler} className={classes.logoutButton}>Logout</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        )
    }

    return (
        <>
            {displayNavbar(props)}
        </>
    )
}

export default NavBar

