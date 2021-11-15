import {useRef, useState} from 'react';

function HomePage() {
    const [feedBackItems, setFeedBackItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const emailInputRef = useRef();
    const feedbackInputRef = useRef();

    function submitFormHandler(event) {
        event.preventDefault();
        const emailData = emailInputRef.current.value;
        const textData = feedbackInputRef.current.value;
        const reqBody = {email: emailData, text: textData};
        fetch('/api/feedback', {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
            .then((data) => console.log(data));
    }

    function loadFeedbackHandler() {
        setIsLoading(true);
        fetch('/api/feedback', {}).then((response) =>
            response.json()
        ).then((data) => {
                console.log("-> data", data);
                setFeedBackItems(data.feedback);
            }).then(() => setIsLoading(false))
    }
  return (
    <div>
      <h1>The Home Page</h1>
        <form onSubmit={submitFormHandler}>
            <div>
            <label htmlFor="email">Your Email Adress</label>
            <input type="email" id="label" ref={emailInputRef}/>
            </div>
            <div>
                <label htmlFor="feedback">Your feedback</label>
                <textarea id="feedback" rows='5' ref={feedbackInputRef}></textarea>
            </div>
            <button type={"submit"}>Send Feedback</button>
        </form>
        <hr/>
        <button onClick={loadFeedbackHandler}>Load Feedback</button>
        <ul>
            {isLoading ? <span>Data is loading...</span> :
                feedBackItems && feedBackItems.map(item =>
                    <li key={item.id}>email: {item.email} item: {item.text} </li>
                )
            }
        </ul>
    </div>
  );
}

export default HomePage;
