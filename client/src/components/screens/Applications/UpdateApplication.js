import * as React from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Modal from "@material-ui/core/Modal";
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from '@material-ui/core/Grid';
import { useState } from "react";
import axios from "axios";

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

const UpdateApplication = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { application } = props;

    const [updatedComments, setUpdatedComments] = useState(application.comments);
    const [updatedStatus, setUpdatedStatus] = useState(application.status);
    const [error, setError] = useState("");


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
                                Update your application for ${application.company}
                            </Typography>


                            <form onSubmit={updateApplicationHandler}>
                                <Grid container item spacing={5} justify="center">
                                    <Grid item xs={5}>
                                        <TextField required id="standard-basic" label="Status" variant="standard" onChange={(e) => setUpdatedStatus(e.target.value)} value={updatedStatus} />
                                    </Grid>
                                    <Grid item xs={5}>
                                        <TextField required id="standard-basic" label="Comments" variant="standard" onChange={(e) => setUpdatedComments(e.target.value)} value={updatedComments} />
                                    </Grid>
                                </Grid>
                                <Button variant="outlined" color="primary" type="submit" style={{ marginTop: "30px" }}>Update Application</Button>
                            </form>
                        </Box>
                    </Grid>
                </div>
            </Fade>
        </Modal>
    )
}

export default UpdateApplication
