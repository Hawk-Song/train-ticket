import React, {useMemo, memo} from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import "./Nav.css";

 const Nav = memo(function Nav(props) {
    const {
        date,
        prev,
        next,
        isPrevDisabled,
        isNextDisabled,
    } = props;

    const currentString = useMemo(() => {
        const d = dayjs(date);
        return d.format('MMM DD, ') + d.locale('en').format('ddd');
    }, [date]);

    return (
        <div className="nav">
            <span
                onClick={prev}
                className={classnames('nav-prev', {
                    'nav-disabled': isPrevDisabled,               
                })}
            >
                Prev
            </span>
            <span className="nav-current">{currentString}</span>
            <span
                onClick={next}
                className={classnames('nav-next', {
                    'nav-disabled': isNextDisabled,               
                })}
            >
                Next
            </span>
        </div>
    );
});

export default Nav;

Nav.propTypes = {
    date: PropTypes.number.isRequired,
    prev: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired,
    isPrevDisabled: PropTypes.bool.isRequired,
    isNextDisabled: PropTypes.bool.isRequired,
};