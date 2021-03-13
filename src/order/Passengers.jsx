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
        createAdult,
        createChild,
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
                <div className="adult" onClick={() => createAdult()}>
                    Add Adult
                </div>
                <div className="child" onClick={() => createChild()}>
                    Add Children
                </div>
            </section>
        </div>
    );
});

Passengers.propTypes = {
    passengers: PropTypes.array.isRequired,
    createAdult: PropTypes.func.isRequired,
    createChild: PropTypes.func.isRequired,
};

export default Passengers;
