import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './DateSelector.css';
import Header from './Header.jsx';
import dayjs from 'dayjs';

function Month(props) {
    const {
        startingTimeInMonth,
        onSelect
    } = props;

    const startDay = new Date(startingTimeInMonth);
    const currentDay = new Date(startingTimeInMonth);

    let days = [];
    while (currentDay.getMonth() === startDay.getMonth()) {
        days.push(currentDay.getTime());
        currentDay.setDate(currentDay.getDate() + 1);
    }

    days = new Array(startDay.getDay() ? startDay.getDay() - 1 : 6)
        .fill(null).concat(days);
    
    const lastDay = new Date(days[days.length - 1]);
    days = days.concat(new Array(lastDay.getDay() ? 7 - lastDay.getDay() : 0).fill(null));

    const weeks = [];
    for (let row = 0; row < days.length / 7; row++) {
        const week = days.slice(row * 7, (row + 1) * 7);
        weeks.push(week);
    }
    return (
        <table className="date-table">
            <thead>
                <tr>
                    <td colSpan="7">
                        <h5>
                            {startDay.getFullYear()} - {startDay.getMonth() + 1}
                        </h5>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr className="date-table-weeks">
                    <th>Mon</th>
                    <th>Tue</th>
                    <th>Wed</th>
                    <th>Thu</th>
                    <th>Fri</th>
                    <th className="weekend">Sat</th>
                    <th className="weekend">Sun</th>
                </tr>
            </tbody>
        </table>
    );
}

Month.propTypes = {
    startingTimeInMonth: PropTypes.number.isRequired,
    onSelect: PropTypes.func.isRequired
}

export default function DateSelector(props) {
    const {
        show,
        onSelect,
        onBack,
    } = props;

    const now = new Date();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);
    now.setDate(1);

    const monthSequence = [now.getTime()];

    now.setMonth(now.getMonth() + 1);
    monthSequence.push(now.getTime());

    now.setMonth(now.getMonth() + 1);
    monthSequence.push(now.getTime());


    return (
        <div className={classnames('date-selector', {hidden: !show})}>
            <Header title="Date Selector" onBack={onBack} />
            <div className="date-selector-tables">
                {
                    monthSequence.map(month => {
                        return (
                            <Month 
                                key={month} 
                                onSelect={onSelect}
                                startingTimeInMonth={month}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

DateSelector.propTypes = {
    show: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
}