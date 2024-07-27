import React, { useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/feedback_result.css';
import { SmallTitle } from '../../components/title';
import { AIChat, UserChat, AIFeedback, ScoreBox } from '../practice/practice';
import { getMyFeedback } from '../../api/mypage_api';

export default function FeedbackResult() {
    const { topic, id, question } = useParams();
    const navigate = useNavigate();
    const [myFeedback, setMyFeedback] = useState([]);

    useEffect(() => {
        const fetchMyFeedback = async () => {
            const response = await getMyFeedback({ topic, id });
            if (response.status === 200) {
                setMyFeedback(response.data);
            }
        };
        fetchMyFeedback();
    }, [topic]);

    return (
        <div className="feedbackresult-container">
            <img
                className="feedbackresult-back"
                src={process.env.PUBLIC_URL + '/img/arrow.png'}
                onClick={() => navigate('/mypage/feedback')} />
            <div className="feedbackresult-navbar">
                <SmallTitle />
            </div>
            <div className="feedbackresult-main">
                <h4>피드백 모아보기</h4>
                <p>{topic}</p>
                <h4>Q. {question}?</h4>
            </div>

            {/* <div className="feedbackresult-index">
                여러 개의 대화를 페이지네이션으로 ?
            </div> */}

            <div className="feedbackresult-box">
                {
                    myFeedback.map((element) => {
                        return (
                            <>
                                <AIChat question={element.question} />
                                <UserChat index={0} answers={element.answer} />
                                <AIFeedback index={0} feedback={element.feedback} />
                            </>
                        )
                    })
                }
            </div>

            <div className="result-box-gradient">
                <p></p>
            </div>
            <div className="result-box-under">
                <p></p>
            </div>
        </div>
    )
}