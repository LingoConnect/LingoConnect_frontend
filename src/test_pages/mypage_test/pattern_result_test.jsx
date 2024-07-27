import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/pattern_result.css';
import { SmallTitle } from '../../components/title';
import { test_mypage_pattern } from '../data_test';


export default function PatternResultTest() {
    const navigate = useNavigate();
    const { topic } = useParams();    
    const [index, setIndex] = useState(0);    
    
    return (
        <div className="PatternResult-container">
            <img
                className="PatternResult-back"
                src={process.env.PUBLIC_URL + '/img/arrow.png'}
                onClick={()=>navigate('/mypage/pattern')}/>
            <div className="PatternResult-navbar">
                <SmallTitle />
            </div>

            <div className="PatternResult-main">
                <h4>자주 하는 실수(패턴) 분석</h4>
                <p>{topic}</p>
            </div>

            <div className="PatternResult-index">
                <p>{index+1}/{test_mypage_pattern[1].length}</p>
            </div>
            <div className="PatternResult-card">
                <ResultCard index={index} setIndex={setIndex} />
            </div>
            
            <div className="PatternResult-img">
                <img src={process.env.PUBLIC_URL + '/img/mummy.png'} />
            </div>

        </div>
    )
}

function ResultCard({index, setIndex}) {
    return (
        <div className="resultcard-container">

            <div className="resultcard-left">
                {
                    (index != 0) &&
                    <h4 onClick={(e)=>{
                            if (index>0) {
                                setIndex(index-1);
                            }
                            e.stopPropagation();                
                    }}>&lt;</h4>
                }
            </div>
            <div className="resultcard-card">
                <img src={process.env.PUBLIC_URL + '/img/light.png'} />
                <h4>{test_mypage_pattern[1][index]}</h4>
            </div>
            <div className="resultcard-right">
                {
                    (index != (test_mypage_pattern[1].length-1)) &&
                    <h4 onClick={(e)=>{
                            if (index<100) {
                                setIndex(index+1);
                            }
                            e.stopPropagation();                
                    }}>&gt;</h4>
                }    
            </div>
        </div>
    )
}