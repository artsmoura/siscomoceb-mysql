import React from "react";
import { useSelector } from "react-redux";

export const EventDetails = () => {

    const event = useSelector((state) => state.eventState.event);

    return (
        <>
            <h1>{event.nomeEvento}</h1>
            <p>EVENTO</p>
        </>
    );
};

export default EventDetails;