import articleContent from './article-content';
// import { Link } from 'react-router-dom';
import Articles from "../components/Articles"

export default function ArticlesList() {
  return(
    <div>
      <h1 className="sm:text-4xl text-2xl font-bold my-6 text-gray-900">
        All articles
      </h1>
      <div className="container py-4 mx-auto">
        <div className="flex flex-wrap -m-4">
          <Articles articles={articleContent}/>
        </div>
      </div>
    </div>
  )
}