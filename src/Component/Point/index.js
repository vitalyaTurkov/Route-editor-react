import React from 'react'
import PropTypes from 'prop-types'
import './main.scss'

export default class Point extends React.Component{

    static propTypes = {
        point: PropTypes.shape({
            address: PropTypes.string,
            lat: PropTypes.number,
            lng: PropTypes.number
        }),
        deletePoint: PropTypes.func,
        setDragEnteredPoint: PropTypes.func,
        swapPoints: PropTypes.func
    };

    render() {
        return (
            <div className="point"
                 draggable={true}
                 onDragEnter={this.handleDragEnter}
                 onDragEnd={this.handleDragEnd}
            >
                <h3 className="point__name">{this.props.point.address}</h3>
                <div className="btnWrap"><button onClick={this.onDeleteClick} className="point__deleteBtn">X</button></div>
            </div>
        );
    }

    onDeleteClick = () => {
        this.props.deletePoint(this.props.point);
    };

    handleDragEnter = () => {
        this.props.setDragEnteredPoint(this.props.point);
    };

    handleDragEnd = () => {
        this.props.swapPoints(this.props.point);
    };
};