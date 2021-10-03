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
import NavBar from "./NavBar";

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

    const displayAplications = (props) => {
        const { applications } = props;

        if (applications.length > 0) {
            return (
                applications.map((application, index) => {
                    const formattedDate = moment(application.dateApplied).format('MM-DD-YY');

                    return (
                        // <Container>
                        <Box component="span" style={{ display: 'inline-block', marginLeft: '300px' }}>
                            <React.Fragment>
                                {/* <Container> */}
                                <Grid container spacing={1} columns={1}>
                                    <Grid item xs={1} >
                                        <Card variant="outlined" style={{ height: "250px", width: "300px" }}>
                                            <CardHeader
                                                action={
                                                    <IconButton color="primary" >
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
                                {/* </Container> */}
                            </React.Fragment>
                        </Box>
                        // {/* </Container> */}
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
