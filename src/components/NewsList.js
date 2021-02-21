import React from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from 'axios';
import usePromise from '../lib/usePromise';

const NewsListBlock=styled.div`
    box-sizing: border-box;
    padding-bottom: 3rem;
    width: 768px;
    margin: 0 auto;
    margin-top: 2rem;
    @media screen and (max-width:768px){
        width:100%;
        padding-left: 1rem;
        padding-right: 1rem;
    }
`;

const NewsList=({category})=>{
    const [loading, response, error]=usePromise(()=>{
        const query=category==='all'?'':`&category=${category}`;
        return axios.get(
            `http://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=`
        );
        /* const [articles, setArticles]=useState(null);
    const [loading, setLoading]=useState(true); //API요청이 대기 중인지 판별. 대기중일땐 true, 요청이 끝나면 false

    useEffect(()=>{//useEffect를 사용하여 컴포넌트가 처음 렌더링되는 시점에 API를 요청한다.
        //async를 사용하는 함수 따로 선언(useEffect에서 반환해야 하는 값은 뒷정리 함수이기 때문에 바로 async를 붙이면 안된다.)
        const fetchData=async ()=>{
            setLoading(true);
            try{
                //category값이 all이면 공백 아니면 "&category=카테고리" 형태의 문자열을 만든다.
                const query=category==='all'?'':`&category=${category}`;
                const response=await axios.get(
                    `http://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=91157ebe11144905a1eace662e7fd9d2`
                );
                setArticles(response.data.articles);
            } catch(e){
                console.log(e);
            }
            setLoading(false);
        };
        fetchData(); */
    }, [category]);  //category값이 바뀔때마다 뉴스를 새로 불러와야 하기 때문에 의존배열에 category를 넣어야한다.
    

    //대기중일때
    if(loading){
        return <NewsListBlock>대기중...</NewsListBlock>;
    }
    if(!response){
        return null;
    }
    //에러 발생했을때
    if(error){
        return <NewsListBlock>에러 발생!</NewsListBlock>;
    }
    /*//아직 articles 값이 설정되지 않았을때
    if(!articles){
        //map함수를 사용하기 전에 꼭 !article을 조회하여 해당값이 null이 아닌지 검사해야한다. 
        //하지 않으면 데이터가 없을때 null에는 map함수가 없기 때문에 렌더링 과정에서 오류가 발생한다
        return null;
    }*/

    //response 값이 유효할때
    const {articles}=response.data;
    return (
        <NewsListBlock>
            {articles.map(article=>(
                <NewsItem key={article.url} article={article}/>
            ))}
        </NewsListBlock>
    );
};

export default NewsList;