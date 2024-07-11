import React, { createContext, useState } from 'react';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]);

    const updateEvents = (newEvents) => {
        setEvents(newEvents);
    };

    return (
        <EventContext.Provider value={{ events, updateEvents }}>
            {children}
        </EventContext.Provider>
    );
};
