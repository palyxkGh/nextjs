import {getAllEvents} from './dummy-data';
import {Fragment} from 'react';
import EventList from '../../components/events/event-list';
import EventSearch from '../../components/events/event-search';
import {useRouter} from 'next/router';

function AllEventsPage(props) {
    const router = useRouter();
    const {events} = props;

    function findEventsHandler(year, month) {
        const fullPath = `/events/${year}/${month}`;
        router.push(fullPath);
    }

    return <Fragment>
        <EventSearch onSearch={findEventsHandler}/>
        <EventList items={events}/>
        <h1>All Events Page</h1>
    </Fragment>
}


export async function getStaticProps(){
    const events = await getAllEvents();

    return {
        props: {
            events: events
        }
    }
}

export default AllEventsPage;