import React from 'react'

const DisplayApplicationsChild = (props) => {

    const displayAplications = (props) => {
        const { applications } = props;

        if (applications.length > 0) {
            return (
                applications.map((application, index) => {
                    console.log(application);
                    return (
                        <div>
                            <h3>{application.company}</h3>
                            <p>{application.position}</p>
                            <p>{application.status}</p>
                        </div>
                    )
                })
            )
        } else {
            return (<h3>No applications yet</h3>)
        }
    }
    return (
        <>
            {displayAplications(props)}
        </>
    )
}

export default DisplayApplicationsChild
