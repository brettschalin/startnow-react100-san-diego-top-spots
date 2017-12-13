import React, {Component} from 'react';

//Should be not publicly accessible for more complicated projects
//It's probably fine for now...
const apikey=`AIzaSyAxSSLPFJyUnVA-T_d45pB8dDh3AW-NsZE`;
var mapsClient = require('@google/maps').createClient({
    key: apikey,
});

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_loc: props.user_loc,
            spot_loc: props.spot_loc,
            directions: null,            
        }
        if (!this.state.user_loc) {
            console.log("Could not retrieve user's location");
            return;
        }
        this.state.directions = mapsClient.directions({
            origin: `${this.state.user_loc.lat},${this.state.user_loc.long}`,
            destination: `${this.state.spot_loc.lat},${this.state.spot_loc.long}`,
            }, (err, directions) => {
                if (!err) {
                    this.setState({directions: directions.json})
                }
                else {
                    console.log(`An error has occurred while retreiving directions:\n${err}`);
                }});
        if (typeof this.state.directions != "undefined") {
            console.log("Could not retreive directions");
        }
    }

    //This would probably work if the google api would let me actually get data back...
    render() {
        return (
            <div className="map">
                <span>Distance from you: {typeof this.state.directions.json != "undefined" ? this.state.directions.json.routes[0].legs[0].distance.text : "Unknown"}</span>
            </div>
        );
    }
}


export default Map;