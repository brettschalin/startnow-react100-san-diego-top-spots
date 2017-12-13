import React from 'react';
import Map from './map';

export default props => (
    <div className='well'>

        <h4>{props.name}</h4>
        <p>{props.description}</p>

        <a href={`https://maps.google.com/?q=${props.location[0]},${props.location[1]}`}
            className='btn btn-primary'>
            Open in Google Maps</a>
        <br />
        <Map user_loc={props.user_location} spot_loc={{lat: props.location[0], long: props.location[1]}} />

    </div>
);