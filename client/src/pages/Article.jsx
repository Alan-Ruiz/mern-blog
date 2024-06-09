import { useParams } from "react-router-dom";
import articleContent from "./article-content.jsx";
import Articles from "../components/Articles.jsx";
import CommentsList from "../components/CommentsList.jsx";
import AddCommentForm from "../components/AddCommentForm.jsx";
import NotFound from "./NotFound.jsx";
import { useState, useEffect } from "react";

export default function Article() {
  const { name } = useParams();
  const article = articleContent.find((article) => article.name === name);
  const [articleInfo, setArticleInfo] = useState({ comments: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(`/api/articles/${name}`);
        
        if (!result.ok) {
          throw new Error(`HTTP error! status: ${result.status}`);
        }

        // Ensuring the response is not already consumed
        const body = await result.json();
        console.log(body);
        setArticleInfo(body);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchData();
  }, [name]);

  if (!article) return <NotFound />;
  
  const otherArticles = articleContent.filter((article) => article.name !== name);
  
  return (
    <>
      <h1 className="sm:text-4xl text-2xl font-bold my-6 text-gray-900">
        {article.title}
      </h1>
      {article.content.map((content, index) => 
        <p className="mx-auto leading-relaxed text-base mb-4" key={index}>{content}</p>
      )}
      <AddCommentForm articleName={name} setArticleInfo={setArticleInfo}/>
      <CommentsList comments={articleInfo.comments}/>
      <h1 className="sm:text-2xl text-xl font-bold my-4 text-gray-900">
        Other articles
      </h1>
      <div className="flex flex-wrap -m-4">
        <Articles articles={otherArticles}/>
      </div>
    </>
  );
}