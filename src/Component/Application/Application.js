import React from 'react'
import Point from '../Point'
import Map from '../google/Maps'
import SearchInput from '../google/SearchInput'
import PropTypes from 'prop-types'
import './main.scss'

export default class Application extends React.Component{
    static propTypes = {
        points: PropTypes.arrayOf(PropTypes.object),
        addPoint: PropTypes.func,
        deletePoint: PropTypes.func
    };

    constructor() {
        super();
        this.dragEnteredPoint = {};
    }

    render() {
        const points = this.props.points
            .map((item, index) =>
                <Point point={item}
                       key={index}
                       deletePoint={this.props.deletePoint}
                       setDragEnteredPoint={this.setDragEnteredPoint}
                       swapPoints={this.swapPoints}
                />
            );

        return (
            <>
                <div className="container">
                    <div className="left">
                        <SearchInput addPoint={this.props.addPoint}/>
                        {points}
                    </div>
                    <div className="right">
                        <Map points={this.props.points} deletePoint={this.deletePoint}/>
                    </div>
                </div>
            </>
        );
    }

    setDragEnteredPoint = (point) => {
        this.dragEnteredPoint = point;
    };

    swapPoints = (point) => {
        this.props.swapPoints(point, this.dragEnteredPoint)
    }
}