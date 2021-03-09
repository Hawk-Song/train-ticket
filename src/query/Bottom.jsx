import React from 'react';
import PropTypes from 'prop-types';
import "./Bottom.css";
import classnames from 'classnames';

import { ORDER_DEPART } from './constant';

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
};