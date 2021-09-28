import { useState, useEffect } from "react";
import * as React from "react";
import axios from "axios";
import DisplayApplicationsChild from "./DisplayApplicationsChild";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import "react-datepicker/dist/react-datepicker.css";
import { Grid } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import {
    DatePicker,
    MuiPickersUtilsProvider
} from '@material-ui/pickers';

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
            } catch (error) {
                localStorage.removeItem("authToken");
                setError("You are not authorized please login");
            }
        };

        fetchApplications();
    }, []);

    const logoutHandler = () => {
        localStorage.removeItem("authToken");
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
        }
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return error ? (
        <span className="error-message">{error}</span>
    ) : (
        <>
            <DisplayApplicationsChild applications={applications} />

            <Button variant="outlined" color="secondary" onClick={logoutHandler} className="logout-btn">Logout</Button>
            <Button variant="contained" color="primary" onClick={handleOpen} className={classes.createApplicationButton}>+</Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div style={{ margin: "0px" }}>
                    <Grid container spacing={2}>
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Create a new application
                            </Typography>


                            <form onSubmit={createApplicationHandler}>
                                <Grid container item spacing={5}>
                                    <Grid item xs={5}>
                                        <TextField required id="standard-basic" label="Company" variant="standard" onChange={(e) => setCompany(e.target.value)} value={company} />
                                    </Grid>
                                    <Grid item xs={5}>
                                        <TextField required id="standard-basic" label="Position" variant="standard" onChange={(e) => setPosition(e.target.value)} value={position} />
                                    </Grid>
                                </Grid>
                                <Grid container item spacing={5}>
                                    <Grid item xs={5}>
                                        <TextField required id="standard-basic" label="Stage" variant="standard" onChange={(e) => setStage(e.target.value)} value={stage} />
                                    </Grid>
                                    <Grid item xs={5}>
                                        <TextField required id="standard-basic" label="Status" variant="standard" onChange={(e) => setStatus(e.target.value)} value={status} />
                                    </Grid>
                                </Grid>
                                <Grid container item spacing={5}>
                                    <Grid item xs={5}>
                                        <TextField required id="standard-basic" label="Comments" variant="standard" onChange={(e) => setComments(e.target.value)} value={comments} />
                                    </Grid>
                                    <Grid item xs={5}>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <DatePicker clearable required label="Date" value={dateApplied} onChange={(dateApplied) => setDateApplied(dateApplied)} />
                                        </MuiPickersUtilsProvider>
                                    </Grid>
                                </Grid>

                                <Button variant="outlined" color="primary" type="submit">Create Application</Button>
                            </form>
                        </Box>
                    </Grid>
                </div>
            </Modal>
        </>
    );
};

export default Dashboard;