import React, {memo, useCallback, useState, useReducer, useMemo} from 'react';
import PropTypes from 'prop-types';
import "./Bottom.css";
import classnames from 'classnames';

import Slider from './Slider.jsx'
import { ORDER_DEPART } from './constant';

function checkedReduer(state, action) {
    const {type, payload} = action;
    switch(type) {
        case 'toggle':
            const newState = {...state};
            if (payload in newState) {
                delete newState[payload];
            } else {
                newState[payload] = true;
            }
            return newState;
        case 'reset':
            return {};
        default:
    }
    return state;
}

const Filter = memo(function Filter(props) {
    const {
        name,
        checked,
        value,
        dispatch,
    } = props;

    return (
        <li className={classnames({ checked })} onClick={() => dispatch({payload: value, type: 'toggle'})}>
            { name }
        </li>
    );
});

Filter.propTypes = {
    name: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
};

const Option = memo(function Option(props) {
    const {
        title,
        options,
        checkedMap,
        dispatch,
    } = props;

    return (
        <div className="option">
            <h3>{ title }</h3>
            <ul>
            {
                options.map(option => {
                    return (
                        <Filter
                            key={option.value}
                            {...option}
                            checked={option.value in checkedMap}
                            dispatch={dispatch}/>
                    );
                })
            }
            </ul>
        </div>
    );
});

Option.propTypes = {
    title: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    checkedMap: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
};

const BottomModal = memo(function BottomModal(props) {
    const {
        ticketTypes,
        trainTypes,
        departStations,
        arriveStations,
        checkedTicketTypes,
        checkedTrainTypes,
        checkedDepartStations,
        checkedArriveStations,
        departTimeStart,
        departTimeEnd,
        arriveTimeStart,
        arriveTimeEnd,
        setCheckedTicketTypes,
        setCheckedTrainTypes,
        setCheckedDepartStations,
        setCheckedArriveStations,
        setDepartTimeStart,
        setDepartTimeEnd,
        setArriveTimeStart,
        setArriveTimeEnd,
        toggleIsFiltersVisible,
    } = props;

    const [localCheckedTicketTypes, localCheckedTicketTypesDispatch] = useReducer(checkedReduer, checkedTicketTypes, () => {
        return {
            ...checkedTicketTypes,
        };
    });

    const [localCheckedTrainTypes, localCheckedTrainTypesDispatch] = useReducer(checkedReduer, checkedTrainTypes, (checkedTrainTypes) => {
        return {
            ...checkedTrainTypes,
        };
    });

    const [localCheckedDepartStations, localCheckedDepartStationsDispatch] = useReducer(checkedReduer, checkedDepartStations, (checkedDepartStations) => {
        return {
            ...checkedDepartStations,
        };
    });

    const [localCheckedArriveStations, localCheckedArriveStationsDispatch] = useReducer(checkedReduer, checkedArriveStations, (checkedArriveStations) => {
        return {
            ...checkedArriveStations,
        };
    });

    const [localDepartTimeStart, setLocalDepartTimeStart] = useState(departTimeStart);
    const [localDepartTimeEnd, setLocalDepartTimeEnd] = useState(departTimeEnd);
    const [localArriveTimeStart, setLocalArriveTimeStart] = useState(arriveTimeStart);
    const [localArriveTimeEnd, setLocalArriveTimeEnd] = useState(arriveTimeEnd);

    const optionGroup = [
        {
            title: 'Ticket Types',
            options: ticketTypes,
            checkedMap: localCheckedTicketTypes,
            dispatch: localCheckedTicketTypesDispatch,
        },
        {
            title: 'Train Types',
            options: trainTypes,
            checkedMap: localCheckedTrainTypes,
            dispatch: localCheckedTrainTypesDispatch,
        },
        {
            title: 'Depart Stations',
            options: departStations,
            checkedMap: localCheckedDepartStations,
            dispatch: localCheckedDepartStationsDispatch
        },
        {
            title: 'Arrive Stations',
            options: arriveStations,
            checkedMap: localCheckedArriveStations,
            dispatch: localCheckedArriveStationsDispatch,
        }
    ];

    const isResetDisabled = useMemo(() => {
        return Object.keys(localCheckedTicketTypes).length === 0
            && Object.keys(localCheckedTrainTypes).length === 0
            && Object.keys(localCheckedDepartStations).length === 0
            && Object.keys(localCheckedArriveStations).length === 0
            && localDepartTimeStart === 0
            && localDepartTimeEnd === 24
            && localArriveTimeStart === 0
            && localArriveTimeEnd === 24
    }, [
        localCheckedTicketTypes,
        localCheckedTrainTypes,
        localCheckedDepartStations,
        localCheckedArriveStations,
        localDepartTimeStart,
        localDepartTimeEnd,
        localArriveTimeStart,
        localArriveTimeEnd,
    ])

    function sure() {
        setCheckedTicketTypes(localCheckedTicketTypes);
        setCheckedTrainTypes(localCheckedTrainTypes)
        setCheckedDepartStations(localCheckedDepartStations);
        setCheckedArriveStations(localCheckedArriveStations);

        setDepartTimeStart(localDepartTimeStart);
        setDepartTimeEnd(localDepartTimeEnd);
        
        setArriveTimeStart(localArriveTimeStart);
        setArriveTimeEnd(localArriveTimeEnd);

        toggleIsFiltersVisible();
    }

    function reset() {
        if (isResetDisabled) {
            return;
        }

        localCheckedTicketTypesDispatch({type: 'reset'});
        localCheckedTrainTypesDispatch({type: 'reset'});
        localCheckedDepartStationsDispatch({type: 'reset'});
        localCheckedArriveStationsDispatch({type: 'reset'});
        setLocalDepartTimeStart(0);
        setLocalDepartTimeEnd(24);
        setLocalArriveTimeStart(0);
        setLocalArriveTimeEnd(24);
    }
    

    return (
        <div className="bottom-modal">
            <div className="bottom-dialog">
                <div className="bottom-dialog-content"> 
                    <div className="title">
                        <span className={classnames('reset', {
                            disabled: isResetDisabled
                        })} onClick={reset}>
                            Reset
                        </span>
                        <span className="ok" onClick={sure}>
                            Done
                        </span>
                    </div>
                    <div className="options">
                    {
                        optionGroup.map(group => <Option {...group} key={group.title}/>)
                    }
                    <Slider
                        title="Start Time"
                        currentStartHours={localDepartTimeStart}
                        currentEndHours={localDepartTimeEnd}
                        onStartChanged={setLocalDepartTimeStart}
                        onEndChanged={setLocalDepartTimeEnd}
                    />
                    <Slider
                        title="End Time"
                        currentStartHours={localArriveTimeStart}
                        currentEndHours={localArriveTimeEnd}
                        onStartChanged={setLocalArriveTimeStart}
                        onEndChanged={setLocalArriveTimeEnd}
                    />
                    </div>
                </div>
            </div>
        </div>
    );
});

BottomModal.propTypes = {
    ticketTypes: PropTypes.array.isRequired,
    trainTypes: PropTypes.array.isRequired,
    departStations: PropTypes.array.isRequired,
    arriveStations: PropTypes.array.isRequired,
    checkedTicketTypes: PropTypes.object.isRequired,
    checkedTrainTypes: PropTypes.object.isRequired,
    checkedDepartStations: PropTypes.object.isRequired,
    checkedArriveStations: PropTypes.object.isRequired,
    departTimeStart: PropTypes.number.isRequired,
    departTimeEnd: PropTypes.number.isRequired,
    arriveTimeStart: PropTypes.number.isRequired,
    arriveTimeEnd: PropTypes.number.isRequired,
    setCheckedTicketTypes: PropTypes.func.isRequired,
    setCheckedTrainTypes: PropTypes.func.isRequired,
    setCheckedDepartStations: PropTypes.func.isRequired,
    setCheckedArriveStations: PropTypes.func.isRequired,
    setDepartTimeStart: PropTypes.func.isRequired,
    setDepartTimeEnd: PropTypes.func.isRequired,
    setArriveTimeStart: PropTypes.func.isRequired,
    setArriveTimeEnd: PropTypes.func.isRequired,
    toggleIsFiltersVisible: PropTypes.func.isRequired,
};

export default function Bottom(props) {
    const {
        toggleOrderType,
        toggleHighSpeed,
        toggleOnlyTickets,
        toggleIsFiltersVisible,
        highSpeed,
        orderType,
        onlyTickets,
        isFiltersVisible,

        ticketTypes,
        trainTypes,
        departStations,
        arriveStations,
        checkedTicketTypes,
        checkedTrainTypes,
        checkedDepartStations,
        checkedArriveStations,
        departTimeStart,
        departTimeEnd,
        arriveTimeStart,
        arriveTimeEnd,

        setCheckedTicketTypes,
        setCheckedTrainTypes,
        setCheckedDepartStations,
        setCheckedArriveStations,
        setDepartTimeStart,
        setDepartTimeEnd,
        setArriveTimeStart,
        setArriveTimeEnd,

    } = props;
    return (
        <div className="bottom">
            <div className="bottom-filters">
                <span className="item" onClick={toggleOrderType}>
                    <i className="icon">&#xf065;</i>
                    { orderType === ORDER_DEPART ? 'Start early→later' : 'Duration short→long' }
                </span>
                <span
                    className={classnames('item', {'item-on': highSpeed})}
                    onClick={toggleHighSpeed}
                >
                    <i className="icon">{ highSpeed ? '\uf43f' : '\uf43e' }</i>
                    High Speed
                </span>
                <span
                    className={classnames('item', {'item-on': onlyTickets})}
                    onClick={toggleOnlyTickets}
                >
                    <i className="icon">{ onlyTickets ? '\uf43d' : '\uf43c' }</i>
                    Only Tickets
                </span>
                <span
                    className={classnames('item', {'item-on': isFiltersVisible})}
                    onClick={toggleIsFiltersVisible}
                >
                    <i className="icon">{ '\uf0f7' }</i>
                    General Filter
                </span>
            </div>
            {
                isFiltersVisible && (
                    <BottomModal
                        ticketTypes={ticketTypes}
                        trainTypes={trainTypes}
                        departStations={departStations}
                        arriveStations={arriveStations}
                        checkedTicketTypes={checkedTicketTypes}
                        checkedTrainTypes={checkedTrainTypes}
                        checkedDepartStations={checkedDepartStations}
                        checkedArriveStations={checkedArriveStations}
                        departTimeStart={departTimeStart}
                        departTimeEnd={departTimeEnd}
                        arriveTimeStart={arriveTimeStart}
                        arriveTimeEnd={arriveTimeEnd}
                        setCheckedTicketTypes={setCheckedTicketTypes}
                        setCheckedTrainTypes={setCheckedTrainTypes}
                        setCheckedDepartStations={setCheckedDepartStations}
                        setCheckedArriveStations={setCheckedArriveStations}
                        setDepartTimeStart={setDepartTimeStart}
                        setDepartTimeEnd={setDepartTimeEnd}
                        setArriveTimeStart={setArriveTimeStart}
                        setArriveTimeEnd={setArriveTimeEnd}
                        toggleIsFiltersVisible={toggleIsFiltersVisible}
                    />
                )
            }
        </div>
    );
}

Bottom.propTypes = {
    toggleOrderType: PropTypes.func.isRequired,
    toggleHighSpeed: PropTypes.func.isRequired,
    toggleOnlyTickets: PropTypes.func.isRequired,
    toggleIsFiltersVisible: PropTypes.func.isRequired,
    highSpeed: PropTypes.bool.isRequired,
    orderType: PropTypes.number.isRequired,
    onlyTickets: PropTypes.bool.isRequired,
    isFiltersVisible: PropTypes.bool.isRequired,

    ticketTypes: PropTypes.array.isRequired,
    trainTypes: PropTypes.array.isRequired,
    departStations: PropTypes.array.isRequired,
    arriveStations: PropTypes.array.isRequired,
    checkedTicketTypes: PropTypes.object.isRequired,
    checkedTrainTypes: PropTypes.object.isRequired,
    checkedDepartStations: PropTypes.object.isRequired,
    checkedArriveStations: PropTypes.object.isRequired,
    departTimeStart: PropTypes.number.isRequired,
    departTimeEnd: PropTypes.number.isRequired,
    arriveTimeStart: PropTypes.number.isRequired,
    arriveTimeEnd: PropTypes.number.isRequired,
    setCheckedTicketTypes: PropTypes.func.isRequired,
    setCheckedTrainTypes: PropTypes.func.isRequired,
    setCheckedDepartStations: PropTypes.func.isRequired,
    setCheckedArriveStations: PropTypes.func.isRequired,
    setDepartTimeStart: PropTypes.func.isRequired,
    setDepartTimeEnd: PropTypes.func.isRequired,
    setArriveTimeStart: PropTypes.func.isRequired,
    setArriveTimeEnd: PropTypes.func.isRequired,
};