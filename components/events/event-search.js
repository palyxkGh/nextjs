import { useRef } from 'react';
import Button from '../ui/button';
import classes from './event-search.module.css';

function EventSearch(props) {

    const yearInputRef = useRef();
    const monthInputRef = useRef();

    function submitHandler(event) {
        event.preventDefault();
        const selectedYear = yearInputRef.current.value;
        const selectedMonth = monthInputRef.current.value;

        props.onSearch(selectedYear, selectedMonth);
    }

    return <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.controls}>
            <div className={classes.control}>
                <label htmlFor='year'>Year</label>
                <select id='year' ref={yearInputRef}>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                </select>
            </div>
            <div className={classes.control}>
                <label htmlFor='month'>Month</label>
                <select id='month' ref={monthInputRef}>
                    {[
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December",
                    ].map((month, index) => {
                        return <option key={month} value={index + 1}>{month}</option>
                    })}
                </select>
            </div>
        </div>
        <Button>Find Events</Button>
    </form>
}

export default EventSearch;