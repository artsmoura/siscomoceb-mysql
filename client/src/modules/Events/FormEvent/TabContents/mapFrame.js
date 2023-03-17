import React from 'react';

const MapFrame = () => {
    return (
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3136.4487381329623!2d-47.884975814758484!3d-15.794411158172009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr!4v1678127258572!5m2!1spt-BR!2sbr"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
        />
    );
};

export default MapFrame;