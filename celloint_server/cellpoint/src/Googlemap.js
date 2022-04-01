import React, { Component } from "react";
import './styles.css';
import { Style } from "google-maps-react";
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
export class MapContainer extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
    };
    
    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };

    //  Styless = {
    //     width: '100%',
    //     height: '100%'
    //   };
    //  LoadingContainer = (props) => (
    //     <div>Fancy loading container!</div>
    //   )
    render() {
        return (
            <Map google={this.props.google}
                initialCenter={{
                    lat: 19.284224,
                    lng: 72.863012
                }}
                // style={Styless}
                zoom={20}
                onClick={this.onMapClicked}>

                <Marker position={{
                    lat: 19.284312,
                    lng: 72.862935
                }} onClick={this.onMarkerClick}
                    name={'Rassaz Mall'} />

                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    <div className="google_info">
                        <h1>{this.state.selectedPlace.name}</h1>
                        <p className="google_p">it is all about cell point</p>
                    </div>
                </InfoWindow>
            </Map>
        )
    }
}
export default GoogleApiWrapper({
    apiKey: ('AIzaSyBNBa6RNNbH8mXmODcUjdF6OzeALsbdVqk')
})(MapContainer)