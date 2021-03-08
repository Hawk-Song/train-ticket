import React, {useMemo} from 'react'
import {h0} from '../common/fp';
import dayjs from 'dayjs';
import PropTypes from 'prop-types'
import './DepartDate.css'


export default function DepartDate(props) {
    const {
        time,
        onClick,
    } = props;

    const h0OfDepart = h0(time);
    const departDate = new Date(h0OfDepart);

    const departDeteString =  useMemo(() => {
        return dayjs(h0OfDepart).format('YYYY-MM-DD')
    }, [h0OfDepart]);

    const isToday = h0OfDepart === h0();

    const weekString = ['Sun', 'Mon', 'Tue', 'Wes', 'Thu', 'Fri', 'Sat'][departDate.getDay()] + (isToday ? '(Today)': '');

    return (
        <div className="depart-date" onClick={onClick}> 
            <input type="hidden" name="date" value={departDeteString} />
            {departDeteString} <span className="depart-week">{weekString}</span>
        </div>
    )
}

DepartDate.propsTypes = {
    time: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
}