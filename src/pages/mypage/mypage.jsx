import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/mypage.css';
import Top from '../../components/top';
import { getTopic } from '../../api/learning_content_api';

export default function MyPage() {
    const navigate = useNavigate();
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        const fetchTopics = async () => {
            const response = await getTopic();
            if (response.status === 200) {
                setTopics(response.data);
            }
        };

        fetchTopics();
    }, []);

    return (
        <div className="mypage-container">
            <div className="mypage-navbar">
                <div className="mypage-top">
                    <Top />
                    <div className="mypage-top-link">
                        <img
                            src={process.env.PUBLIC_URL + '/img/arrow.png'}
                            onClick={() => navigate('/main')} />
                        <h4>마이페이지</h4>
                    </div>
                </div>
                <div className="mypage-profile-box">
                    <div className="mypage-profile-top">
                        <img src={process.env.PUBLIC_URL + '/img/deco.png'} />
                        <p>배지(등급)</p>
                    </div>
                    <div className="mypage-profile-img">
                        <img src={process.env.PUBLIC_URL + '/img/profile.png'} />
                    </div>
                    <div className="mypage-profile-name">
                        <h4>김한솔</h4>
                    </div>
                </div>
                <div className="mypage-profile-dc">
                    <div className="mypage-dcbox">
                        <p>학습성취도</p>
                        <p>60%</p>
                    </div>
                    <div className="mypage-dcbox">
                        <p>내 발음 점수</p>
                        <p>4.3 / 5</p>
                    </div>
                    <div className="mypage-dcbox">
                        <p>획득한</p>
                        <p>배지 모음</p>
                    </div>
                </div>
                <div className="mypage-feedback">
                    <MyFeedbackBox title="피드백 모아보기" navigate_url="/mypage/feedback" topics={topics} />
                    <MyFeedbackBox title="자주 하는 실수(패턴) 분석" navigate_url="/mypage/pattern" topics={topics} />
                </div>
            </div>


        </div>

    )
}

function MyFeedbackBox({ title, navigate_url, topics }) {
    const navigate = useNavigate();

    return (
        <div className="mypage-feedback-container">
            <div className="mypage-feedback-top">
                <p>• {title}</p>
                <img
                    src={process.env.PUBLIC_URL + '/img/plus.png'}
                    onClick={() => navigate(`${navigate_url}`)} />
            </div>
            <div className="mypage-feedback-box">
                {
                    topics.slice(0, 3).map((topic) => {
                        return (
                            <div className="mypage-feedback-topic">
                                <img
                                    src={topic.image_url} />
                                <h4>{topic.topic}</h4>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}