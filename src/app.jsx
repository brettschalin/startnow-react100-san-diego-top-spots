import React, { Component } from 'react';
import axios from 'axios';
import TopSpot from './topspot';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topspots: [],
      user_location: null,
    };

  }

  componentWillMount() {
    axios.get("https://origin-top-spots-api.herokuapp.com/api/topspots").then(response => response.data).then(topspots => this.setState({ topspots }));
  }

  //Handle geolocation things after everything else is rendered
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        /* Success callback*/
        position => this.setState({user_location: {lat: position.coords.latitude, long: position.coords.longitude}}),
      /*error callback*/ function (error) { 
        switch (error.code){
          case error.PERMISSION_DENIED:
            console.log("User denied location permission");
            return;
          case error.POSITION_UNAVAILABLE:
            console.log("Could not find user's location");
            return;
          case error.TIMEOUT:
            console.log("Timeout occurred while retreiving user location");
            return;
          }
        console.log("An unknown error has occurred");
        return;
      }
    );
    }
  }

  render() {
    return (
      <div className='App'>
        <div className='container'>
          <div id='title'>
            <h2>San Diego Top Spots</h2>
            <p> A list of the top 30 places to see in San Diego, California.</p>
          </div>
        </div>
        {
          this.state.topspots.map(topspot => (
            <TopSpot
              key={topspot.id}
              name={topspot.name}
              description={topspot.description}
              location={topspot.location}
              user_location={this.state.user_location}
            />
          ))
        }
      </div>
    );

  }
}

export default App;
