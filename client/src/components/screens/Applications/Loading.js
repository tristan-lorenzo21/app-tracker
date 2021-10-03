import * as React from 'react';
// import CircularProgress from '@material-ui/core/CircularProgress';
import { LinearProgress } from '@material-ui/core';
// import { StylesProvider } from '@material-ui/styles';
import Box from '@material-ui/core/Box';

const Loading = () => {
    return (
        // <Box sx={{ display: 'flex' }}>
        <Box style={{ width: "100%" }}>
            <LinearProgress />
        </Box>
    )
}

export default Loading;

