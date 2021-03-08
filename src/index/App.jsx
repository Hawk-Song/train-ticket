import './App.css'
import React, {useCallback, useMemo} from "react"
import {bindActionCreators} from 'redux'
import Header from '../common/Header.jsx'
import DepartDate from './DepartDate.jsx'
import HighSpeed from './HighSpeed.jsx'
import Journey from './Journey.jsx'
import Submit from './Submit.jsx'
import {connect} from 'react-redux'

import CitySelector from '../common/CitySelector.jsx'
import DateSelector from '../common/DateSelector.jsx'

import {
    exchangeFromTo,
    showCitySelector,
    hideCitySelector,
    fetchCityData,
    setSelectedCity,
    showDateSelector,
    hideDateSelector,
} from './actions';

function App(props) {
    const {
        from,
        to,
        isCitySelectorVisible,
        isDateSelectorVisible,
        cityData,
        isLoadingCityData,
        dispatch,
        departDate,
    } = props;

    const onBack = useCallback(() => {
        window.history.back();
    },[]);

    const cbs = useMemo(() => {
        return bindActionCreators({
            exchangeFromTo,
            showCitySelector
        }, dispatch)
    }, []);

    const citySelectorCbs = useMemo(() => {
        return bindActionCreators({
            onBack: hideCitySelector,
            fetchCityData,
            onSelect: setSelectedCity,
        }, dispatch)
    }, [])

    const departDateCbs = useMemo(() => {
        return bindActionCreators({
            onClick: showDateSelector,
        }, dispatch);
    });

    const dateSelectorCbs = useMemo(() => {
        return bindActionCreators({
            onBack: hideDateSelector
        }, dispatch);
    }, []);

    return (
        <div>
            <div className="header-wrapper">
                <Header title="Train ticket" onBack={onBack}/>
            </div>
            <form className="form">
                <Journey 
                    from={from} 
                    to={to}
                    {...cbs}
                />
                <DepartDate 
                    time={departDate}
                    {...departDateCbs}
                />
                <HighSpeed />
                <Submit />
            </form>
            <CitySelector 
                show={isCitySelectorVisible}
                cityData={cityData}
                isLoading={isLoadingCityData}
                {...citySelectorCbs}
            />
            <DateSelector
                show={isDateSelectorVisible}
                {...dateSelectorCbs}
            />
        </div>
    )
}

export default connect(
    function mapStateToProps(state) {
        return state
    },
    function mapDispatchToProps(dispatch) {
        return {dispatch}
    }
)(App);