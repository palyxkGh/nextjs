import {useRouter} from 'next/router';
import {getEventById} from './dummy-data';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from "../../components/event-detail/event-content";
import {Fragment} from 'react';

function EventDetailPage() {
    const router = useRouter();
    const eventId = router.query.eventId;
    const event = getEventById(eventId);

    if(!event){
      return <p>No event found!</p>
    }
    return <div>
        <Fragment>
            <EventSummary title={event.title}/>
            <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title}/>
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
            <EventSummary/>
        </Fragment>
    </div>
}

export default EventDetailPage;