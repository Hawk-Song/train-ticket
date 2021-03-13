import React from 'react';
import './App.css'
import Detail from '../common/Detail.jsx';
import Candidate from './Candidate.jsx';

import {connect} from 'react-redux'

function App(props) {
    const {
        departDate,
        arriveDate,
        departTimeStr,
        arriveTimeStr,
        departStation,
        arriveStation,
        trainNumber,
        durationStr,
        tickets,
        isScheduleVisible,
        searchParsed,

        dispatch,
    } = props;

    return (
        <div>"tick page"</div>
    )

}

export default connect(
    function mapStateToProps(state) {
        return state;
    },
    function mapDispatchToProps(dispatch) {
        return {dispatch}
    }
)(App);