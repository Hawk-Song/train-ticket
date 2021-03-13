import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import './Passengers.css';

const Passenger = memo(function Passenger(props) {
    const {
    } = props;

    return (
        <li className="passenger">
            {props.id}
        </li>
    );
});

Passenger.propTypes = {
    id: PropTypes.number.isRequired,
};

const Passengers = memo(function Passengers(props) {
    const {
        passengers,
    } = props;


    return (
        <div className="passengers">
            <ul>
                {passengers.map(passenger => {
                    return (
                        <Passenger
                            {...passenger}
                            key={passenger.id}
                        />
                    );
                })}
            </ul>
            <section className="add">
                <div className="adult" >
                    Add Adult
                </div>
                <div className="child">
                    Add Children
                </div>
            </section>
        </div>
    );
});

Passengers.propTypes = {
    passengers: PropTypes.array.isRequired,
};

export default Passengers;
