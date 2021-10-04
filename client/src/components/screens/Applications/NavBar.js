import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
// import IconButton from '@material-ui/core/IconButton';

const style = makeStyles({
    logoutButton: {
        float: "right",
        display: "inline-block",
    },
    appBar: {
        maxHeight: "70px",
    },
    usernameDisplay: {
        paddingLeft: "200px"
    }
})

const NavBar = (props) => {
    const classes = style();

    const username = localStorage.getItem("username");

    const displayNavbar = (props) => {
        const { logoutHandler } = props;
        // const { logoutHandler } = props;

        return (
            <Box style={{ flexGrow: 1, display: "flex" }}>
                <AppBar position="static" className={classes.appBar} elevation={0}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            float="right"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className={classes.usernameDisplay}>
                            Welcome, {username}
                        </Typography>
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

