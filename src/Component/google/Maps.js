import React, { Component } from 'react';
import {setRoute} from '../../service/routes'
import PropTypes from 'prop-types'
import './main.scss'

export default class Map extends Component {

    static propTypes = {
        points: PropTypes.arrayOf(PropTypes.object),
        deletePoint: PropTypes.func
    };

    render() {
        return <div ref={this.mapMounted} id='rootMap'/>
    }

    componentDidMount() {
        this.initMap();
    }

    componentDidUpdate() {
        const { points } = this.props;

        this.clearMarkers();            //Очистка карты от маркеров, чтобы нарисовать новые
        this.setMarkers(points);

        if(points.length === 0) {
            return;
        }
        const lastPoint = points[points.length - 1];
        this.map.setCenter({lat: lastPoint.lat, lng: lastPoint.lng });

        if(points.length > 1) {         //Построение маршрута, если количество точек больше 1
            setRoute(points, this.directionsDisplay, this.map, this.props.deletePoint);
        }
        else {                          //Иначе, очистка карты от маршрутов
            this.directionsDisplay.setMap(null);
        }
    };

    mapMounted = mapContainer => this.mapContainer = mapContainer;

    initMap = () => {
        this.map = new window.google.maps.Map(this.mapContainer, {
            center: {lat: 56, lng: 92},
            zoom: 8
        });
        this.directionsDisplay = new window.google.maps.DirectionsRenderer();
    };

    setMarkers = (points) => {
        this.markers === undefined && (this.markers = []);
        this.markers = points.map((item) => {
            return new window.google.maps.Marker({
                position: {lat: item.lat, lng: item.lng},
                map: this.map,
                title: item.address
            });
        });
    };

    clearMarkers = () => {
        this.markers === undefined && (this.markers = []);
        const { markers } = this;

        for (let i = 0; i < markers.length; i++ ) {
            markers[i].setMap(null);
        }
        markers.length = 0;
    };
}
