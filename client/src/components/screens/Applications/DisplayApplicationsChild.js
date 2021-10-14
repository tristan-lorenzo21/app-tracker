import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from "@material-ui/core/styles";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import { useState } from 'react';
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import TextField from "@material-ui/core/TextField";

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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    textAlign: "center"
};

const DisplayApplicationsChild = (props, { history }) => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [updatedComments, setUpdatedComments] = useState("");
    const [updatedStatus, setUpdatedStatus] = useState("");
    const [error, setError] = useState("");

    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

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


                    const updateApplicationHandler = async () => {
                        const config = {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                            },
                        };

                        try {
                            axios.put(
                                `api/applications/updateApplication/${application._id}`,
                                { updatedStatus, updatedComments },
                                config
                            );

                            window.location.reload();

                        } catch (error) {
                            setError(error.response.data.error);
                        }
                    }

                    return (
                        <>
                            <Modal
                                style={{ backgroundColor: 'transparent', boxShadow: 'none' }}
                                open={openModal}
                                onClose={handleCloseModal}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                    style: { backgroundColor: 'black', opacity: '0.1' }
                                }}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Fade in={openModal}>
                                    <div style={{ margin: "0px", paddingLeft: "200px" }}>
                                        <Grid container spacing={2} style={{ width: "0px", margin: "0px" }}>
                                            <Box sx={style}>
                                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                                    Update your application for {application.company}
                                                </Typography>

                                                <form onSubmit={updateApplicationHandler}>
                                                    <Grid container item spacing={5} justify="center">
                                                        <Grid item xs={5}>
                                                            <TextField required placeholder={application.status} id="standard-basic" label="Status" variant="standard" onChange={(e) => setUpdatedStatus(e.target.value)} value={updatedStatus} />
                                                        </Grid>
                                                        <Grid item xs={5}>
                                                            <TextField required placeholder={application.comments} id="standard-basic" label="Comments" variant="standard" onChange={(e) => setUpdatedComments(e.target.value)} value={updatedComments} />
                                                        </Grid>
                                                    </Grid>
                                                    <Button variant="outlined" color="primary" type="submit" style={{ marginTop: "30px" }}>Update Application</Button>
                                                </form>
                                            </Box>
                                        </Grid>
                                    </div>
                                </Fade>
                            </Modal>
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
                                                    elevation={1}
                                                    id="basic-menu"
                                                    anchorEl={anchorEl}
                                                    open={open}
                                                    onClose={handleClose}
                                                    style={{ shadows: "none" }}
                                                    MenuListProps={{
                                                        'aria-labelledby': 'basic-button',
                                                    }}
                                                >
                                                    <MenuItem onClick={deleteApplicationHandler}>Delete Application</MenuItem>
                                                    <MenuItem onClick={handleOpenModal}>Update Application</MenuItem>
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
                        </>
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