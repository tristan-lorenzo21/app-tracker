import * as React from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Loading from './Loading';
import moment from 'moment';

const DisplayApplicationsChild = (props) => {

    const displayAplications = (props) => {
        const { applications } = props;

        if (applications.length > 0) {
            return (
                applications.map((application, index) => {
                    // console.log(application);

                    const formattedDate = moment(application.dateApplied).format('MM-DD-YY');

                    return (
                        <Box component="span" style={{ display: 'inline-block', transform: 'scale(0.8)', minWidth: 275, padding: '20px' }} >
                            <React.Fragment>
                                <Card variant="outlined" style={{ height: "250px", width: "300px" }}>
                                    <CardContent>
                                        <Typography style={{ fontSize: 21, fontWeight: 600 }} gutterBottom>
                                            {application.company}
                                        </Typography>
                                        <Typography variant="h5" component="div" style={{ fontColor: "" }}>
                                            {application.position}
                                        </Typography>
                                        <Typography style={{ mb: 1.5 }} color="text.secondary">
                                            {application.status} - Date Applied: {formattedDate}
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


export default DisplayApplicationsChild
