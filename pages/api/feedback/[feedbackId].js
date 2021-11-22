import {buildFeedbackPath, extractFeedback} from "./feedback";

function handler(req, res) {
    const {feedbackId} = req.query;
    const filePath = buildFeedbackPath();
    const feedbackData = extractFeedback(filePath);

    const selectedFeedBack = feedbackData.find(
        feedback => feedback.id === feedbackId
    );
    res.status(200).json({feedBack: selectedFeedBack});

}

export default handler;