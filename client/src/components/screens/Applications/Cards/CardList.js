import React from 'react'
import CardItem from './CardItem'

const CardList = ({ applications, deleteApplicationHandler, updateApplicationHandler, setUpdatedComments, setUpdatedStatus, updatedComments, updatedStatus }) => {
    return (
        <React.Fragment>
            {applications.map((application) => (
                <CardItem key={application._id}
                    application={application}
                    deleteApplicationHandler={deleteApplicationHandler}
                    updateApplicationHandler={updateApplicationHandler}
                    setUpdatedComments={setUpdatedComments}
                    setUpdatedStatus={setUpdatedStatus}
                    updatedComments={updatedComments}
                    updatedStatus={updatedStatus}
                />
            ))}
        </React.Fragment>
    )
}

export default CardList
