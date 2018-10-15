import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addPointAsync, deletePoint, swapPoints } from "../../store/actions";
import Application from './Application'
import './main.scss'


const mapStateToProps = (state) => {
    return {
        points: state
    }
};

const mapActionsToProps = (dispatch) => {
    return {
        addPoint: bindActionCreators(addPointAsync, dispatch),
        deletePoint: bindActionCreators(deletePoint, dispatch),
        swapPoints: bindActionCreators(swapPoints, dispatch)
    }
};

export default connect(mapStateToProps, mapActionsToProps)(Application);