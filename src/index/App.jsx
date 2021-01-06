import './App.css'
import React, {useCallback} from "react"
import Header from '../common/Header.jsx'
import DepartDate from './DepartDate.jsx'
import HighSpeed from './HighSpeed.jsx'
import Journey from './Journey.jsx'
import Submit from './Submit.jsx'
import {connect} from 'react-redux'

function App(props) {

    const onBack = useCallback(() => {
        window.history.back();
    },[]);
    return (
        <div>
            <div className="header-wrapper">
                <Header title="Train ticket" onBack={onBack}/>
            </div>
            <Journey />
            <HighSpeed />
            <Submit />
        </div>
    )
}

export default connect(
    function mapStateToProps(state) {return {}},
    function mapDispatchToProps(dispatch) {return {}}
)(App);