import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from "@material-ui/core/styles";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import NavBar from "./NavBar";
import axios from 'axios';
import { useState } from 'react';

const useStyles = makeStyles({
    root: {
        minWidth: 300,
        maxWidth: 500,
        margin: "10px 15px 10px 0",
    },
    headerTitle: {
        maxWidth: 300,
        fontWeight: 600,
        fontSize: 25
    },
});

const DisplayApplicationsChild = (props, { history }) => {
    const classes = useStyles();
    const [error, setError] = useState("");
    const [applications, setApplications] = useState("");

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const displayAplications = (props) => {
        const { applications } = props;

        if (applications.length > 0) {
            return (
                applications.map((application, index) => {
                    const formattedDate = moment(application.dateApplied).format('MM-DD-YY');

                    const deleteApplicationHandler = async (id) => {
                        const config = {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                            },
                        };

                        try {
                            axios.delete(
                                `api/applications/deleteApplication/${application._id}`,
                                config
                            );

                            window.location.reload();

                        } catch (error) {
                            setError(error.response.data.error);
                        }
                    }

                    return (
                        <Box component="span" style={{ display: 'inline-block', margin: '20px', padding: '10px', paddingLeft: '30px', paddingTop: '20px' }}>
                            <React.Fragment>
                                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
                                    <Grid item xs={2} sm={4} md={4} >
                                        <Card variant="outlined" style={{ height: "250px", width: "300px" }}>
                                            <CardHeader
                                                action={
                                                    <IconButton color="primary" onClick={handleClick}>
                                                        <MoreVertIcon fontSize="large" />
                                                    </IconButton>
                                                }
                                                avatar={
                                                    <Avatar src={application.companyLogo} aria-label={`company-logo`} style={{ width: "55px", height: "55px" }} />
                                                }
                                                title={application.company}
                                                subheader={`Applied on: ${formattedDate}`}
                                                classes={{
                                                    title: classes.headerTitle
                                                }}
                                            />
                                            <Menu
                                                id="basic-menu"
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleClose}
                                                MenuListProps={{
                                                    'aria-labelledby': 'basic-button',
                                                }}
                                            >
                                                <MenuItem onClick={deleteApplicationHandler}>Delete Application</MenuItem>
                                                <MenuItem onClick={handleClose}>Update Application</MenuItem>
                                                {/* <MenuItem onClick={handleClose}>Logout</MenuItem> */}
                                            </Menu>
                                            <CardContent style={{ paddingTop: 0, paddingLeft: "25px", paddingRight: "25px" }}>
                                                <Typography variant="h5" component="div" style={{ fontColor: "" }}>
                                                    {application.position}
                                                </Typography>
                                                <Typography style={{ mb: 1.5 }} color="text.secondary">
                                                    {application.status}
                                                </Typography>
                                                <Typography variant="body2">
                                                    {application.comments}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </React.Fragment>
                        </Box>
                    )
                })
            )
        } else {
            return (
                <>
                    <h3>No applications yet </h3>
                </>
            )
        }
    }
    return (
        <>
            {displayAplications(props)}
        </>
    )
}


export default DisplayApplicationsChild;
