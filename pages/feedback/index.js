import {buildFeedbackPath, extractFeedback} from '../api/feedback/feedback';
import {Fragment, useState} from 'react';

function FeedbackPage(props) {
    const [feedbackData, setFeedbackData] = useState();

    function loadFeedbackHandler(id) {
        console.log("-> id", id);
    fetch(`/api/feedback/${id}`) // /api/some-feedback-id
        .then(response =>
            response.json()
        )
        .then(data => {
            setFeedbackData(data.feedBack);
        });
    }

    return (
        <Fragment>
            {feedbackData && <p>{feedbackData.email}</p>}
            <ul>
                {props.feedbackItems.map(item => <li id={item.id}>
                    {item.text}
                    <button onClick={loadFeedbackHandler.bind(null, item.id)}>Show Details</button>
                </li>)}
            </ul>
        </Fragment>
    );
}

export async function getStaticProps() {
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    return {
        props: {
            feedbackItems: data
        }
    };
};

export default FeedbackPage;