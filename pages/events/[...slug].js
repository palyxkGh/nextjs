import {useRouter} from 'next/router';
import {getFilteredEvents} from "../../helpers/api-util";
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/results-title/results-title';
import {Fragment, useEffect, useState} from 'react';
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/error-alert/error-alert";
import useSWR from 'swr';

function FilteredEventsPage(props) {
    const [loadedEvents, setLoadedEvents] = useState();
    const router = useRouter();
    const filterData = router.query.slug;

    const {data, error} = useSWR('https://nextjscourse-527e3-default-rtdb.firebaseio.com/events.json');

    useEffect(() => {
        if(data){
        const events = [];
        for(const key in data){
            events.push({
                id: key,
                ...data[key],
            });
        }
            setLoadedEvents(events);
        }
    }, [data]);
    //
    if (!filterData) {
        return <ErrorAlert><p className='center'>Loading...</p></ErrorAlert>
    }

    const numYear = +filterData[0];
    const numMonth = +filterData[1];

    if ((isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12 || error) ) {
        return <Fragment>
            <ErrorAlert><p>Invalid filter. Please adjust your values!</p></ErrorAlert>
            <Button link='/events'>Show all events</Button>
        </Fragment>
    }

    const filteredEvents = loadedEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
    });


    if (!filteredEvents || filteredEvents.length === 0) {
        return <Fragment>
            <ErrorAlert><p>No events found for the chosen filter</p></ErrorAlert>
            <Button link='/events'>Show all events</Button>
        </Fragment>
    }

    const date = new Date(numYear, numMonth - 1);
    return (
        <Fragment>
            <h1>Filtered Events</h1>
            <ResultsTitle date={date}/>
            <EventList items={filteredEvents}/>
        </Fragment>
    );
}

// export async function getServerSideProps(context) {
//     const { params } = context;
//     const filterData = params.slug;
//
//     const numYear = +filterData[0];
//     const numMonth = +filterData[1];
//
//     if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12) {
//         return {
//             props: {
//                 hasError: true
//             },
//             // notFound: true,
//             // redirect: {
//             //     des
//             // }
//         }
//     }
//
//     const filteredEvents = await getFilteredEvents({year: numYear, month: numMonth});
//
//     return {
//         props: {
//             events: filteredEvents,
//             date: {
//                 year: numYear,
//                 month: numMonth
//             }
//         }
//     };
// }

export default FilteredEventsPage;