import React from 'react'
import CardItem from './CardItem'

const CardList = ({ applications, deleteApplicationHandler, updateApplicationHandler, setUpdatedComments, setUpdatedStatus, setUpdatedCompany, updatedComments, updatedStatus, updatedCompany }) => {
    return (
        <React.Fragment>
            {applications.map((application) => (
                <CardItem key={application._id}
                    application={application}
                    deleteApplicationHandler={deleteApplicationHandler}
                    updateApplicationHandler={updateApplicationHandler}
                    setUpdatedComments={setUpdatedComments}
                    setUpdatedStatus={setUpdatedStatus}
                    setUpdatedCompany={setUpdatedCompany}
                    updatedComments={updatedComments}
                    updatedStatus={updatedStatus}
                    updatedCompany={updatedCompany}
                />
            ))}
        </React.Fragment>
    )
}

export default CardList
