import * as React from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import Loading from './Loading';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import BusinessIcon from '@material-ui/icons/Business';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';

const DisplayApplicationsChild = (props) => {

    const companyLogos = "https://logo.clearbit.com/pinterest.com";

    const displayAplications = (props) => {
        const { applications } = props;

        if (applications.length > 0) {
            return (
                applications.map((application, index) => {
                    const formattedDate = moment(application.dateApplied).format('MM-DD-YY');

                    return (
                        <Box component="span" style={{ display: 'inline-block', transform: 'scale(0.8)', minWidth: 275, padding: '20px' }} >
                            <React.Fragment>
                                <Card variant="outlined" style={{ height: "250px", width: "300px" }}>
                                    <CardHeader
                                        action={
                                            <IconButton color="primary" >
                                                <MoreVertIcon fontSize="large" />
                                            </IconButton>
                                        }
                                        avatar={
                                            <Avatar src={companyLogos} aria-label={`company-logo`} style={{ width: "55px", height: "55px" }} />
                                        }
                                        title={application.company}
                                        subheader={`Applied on: ${formattedDate}`}
                                    />
                                    <CardContent>
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
                            </React.Fragment>
                        </Box>
                    )
                })
            )
        } else {
            // return (<h3>No applications yet</h3>)
            <Loading size={10} />
        }
    }
    return (
        <>
            {displayAplications(props)}
        </>
    )
}


export default DisplayApplicationsChild;
