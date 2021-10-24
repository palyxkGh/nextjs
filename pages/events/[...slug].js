import {useRouter} from 'next/router';
import {getFilteredEvents} from './dummy-data';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/results-title/results-title';
import {Fragment} from 'react';
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/error-alert/error-alert";

function FilteredEventsPage() {
    const router = useRouter();

    const filterData = router.query.slug;

    if (!filterData) {
        return <ErrorAlert><p className='center'>Loading...</p></ErrorAlert>
    }

    const numYear = +filterData[0];
    const numMonth = +filterData[1];

    if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12) {
        return <Fragment>
            <ErrorAlert><p>Invalid filter. Please adjust your values!</p></ErrorAlert>
            <Button link='/events'>Show all events</Button>
        </Fragment>
    }

    const filteredEvents = getFilteredEvents({year: numYear, month: numMonth});
    if (!filteredEvents || filteredEvents.length === 0) {
        return <Fragment>
            <ErrorAlert><p>No events found for the chosen filter</p></ErrorAlert>
            <Button link='/events'>Show all events</Button>
        </Fragment>
    }

    const date = new Date(numYear, numMonth - 1)
    return (
        <Fragment>
            <h1>Filtered Events</h1>
            <ResultsTitle date={date}/>
            <EventList items={filteredEvents}/>
        </Fragment>
    );
}

export default FilteredEventsPage;