import { useState, useEffect } from "react";
import * as React from "react";
import axios from "axios";
import DisplayApplicationsChild from "./DisplayApplicationsChild";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Modal from "@material-ui/core/Modal";
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import "react-datepicker/dist/react-datepicker.css";
import { Drawer, FormHelperText, Grid } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import {
    DatePicker,
    MuiPickersUtilsProvider
} from '@material-ui/pickers';
import NavBar from "./NavBar";
import Loading from "./Loading";
import MainDrawer from "./MainDrawer";
import BusinessIcon from '@material-ui/icons/Business';

import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
        borderRadius: "5em"
    },
    createApplicationButton: {
        borderRadius: "50%",
        position: "fixed",
        right: "5em",
        bottom: "4em",
        height: "60px",
        widht: "60px",
        fontSize: "30px"
    },
    input: {
        display: "none"
    },
    root: {
        display: "flex"
    }
}));

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

const Dashboard = ({ history }) => {
    // display applications state
    const [error, setError] = useState("");
    const [applications, setApplications] = useState("");

    // styles
    const classes = useStyles();

    // create application state
    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");
    const [stage, setStage] = useState("");
    const [status, setStatus] = useState("");
    const [comments, setComments] = useState("");
    const [dateApplied, setDateApplied] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchApplications = async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            };

            try {
                const { data } = await axios.get("/api/applications/displayApplications", config);

                setApplications(data.userApplications);

                setLoading(true);
            } catch (error) {
                localStorage.removeItem("authToken");
                localStorage.removeItem("username");
                setError("You are not authorized please login");
            }
            console.log(applications);
        };

        fetchApplications();
    }, []);

    const logoutHandler = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("username");
        history.push("/login");
    }

    const createApplicationHandler = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        };

        try {

            const { application } = await axios.post(
                "api/applications/createApplication",
                { company, position, stage, status, comments, dateApplied },
                config
            );

            window.location.reload();

        } catch (error) {
            setError(error.response.data.error);
            // setError("Error");
        }
    }

    // setUsername(applications[0].username);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return error ? (
        <span className="error-message">{error}</span>
        // <Loading size={10} />

    ) : (
        <>
            <NavBar logoutHandler={logoutHandler} />
            {/* <MainDrawer logoutHandler={logoutHandler} /> */}
            {loading ? (<DisplayApplicationsChild applications={applications} />) : (<Loading size={10} />)}
            {loading ? (<Button variant="contained" color="primary" onClick={handleOpen} className={classes.createApplicationButton}>+</Button>) : (<Loading size={10} />)}

            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Fade in={open}>
                    <div style={{ margin: "0px", paddingLeft: "200px" }}>
                        <Grid container spacing={2} style={{ width: "0px", margin: "0px" }}>
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Create a new application
                                </Typography>


                                <form onSubmit={createApplicationHandler}>
                                    <Grid container item spacing={5} justify="center">
                                        <Grid item xs={5}>
                                            <TextField required id="standard-basic" label="Company" variant="standard" onChange={(e) => setCompany(e.target.value)} value={company} />
                                        </Grid>
                                        <Grid item xs={5}>
                                            <TextField required id="standard-basic" label="Position" variant="standard" onChange={(e) => setPosition(e.target.value)} value={position} />
                                        </Grid>
                                    </Grid>
                                    <Grid container item spacing={5} justify="center">
                                        <Grid item xs={5}>
                                            <TextField required id="standard-basic" label="Stage" variant="standard" onChange={(e) => setStage(e.target.value)} value={stage} />
                                        </Grid>
                                        <Grid item xs={5}>
                                            <TextField required id="standard-basic" label="Status" variant="standard" onChange={(e) => setStatus(e.target.value)} value={status} />
                                        </Grid>
                                    </Grid>
                                    <Grid container item spacing={5} justify="center">
                                        <Grid item xs={5}>
                                            <TextField required id="standard-basic" label="Comments" variant="standard" onChange={(e) => setComments(e.target.value)} value={comments} />
                                        </Grid>
                                        <Grid item xs={5} justify="center">
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <DatePicker clearable required label="Date" value={dateApplied} onChange={(dateApplied) => setDateApplied(dateApplied)} />
                                            </MuiPickersUtilsProvider>
                                        </Grid>
                                    </Grid>

                                    <Button variant="outlined" color="primary" type="submit" style={{ marginTop: "30px" }}>Create Application</Button>
                                </form>
                            </Box>
                        </Grid>
                    </div>
                </Fade>
            </Modal>
        </>
    );
};

export default Dashboard;