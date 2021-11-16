import {buildFeedbackPath, extractFeedback} from "./feedback";

function handler(req, res) {
    const {feedBackId} = req.query;
    const filePath = buildFeedbackPath();
    const feedbackData = extractFeedback(filePath);

    const selectedFeedBack = feedbackData.find(
        feedback => feedback.id === feedBackId
    );
    res.status(200).json({feedBack: selectedFeedBack});

}

export default handler;