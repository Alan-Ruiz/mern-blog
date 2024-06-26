// import articleContent from '../pages/article-content';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Articles({articles}) {
  return (
    <>
      {articles.map((article, index) => 
          <div key={index} className="p-4 md:w-1/2">
            <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
              <Link to={`/articles/${article.name}`}>
                <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={article.thumbnail} alt="Thumbnail" />
                <div className="p-3">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">{article.title}</h3>
                  <p className="leading-string-relaxed">
                    {article.content[0].substring(0,110)} ...
                  </p>
                  <p className="text-indigo-500 inline-flex items-center mt-2 md:mb-2 lg:mb-0">Learn more</p>
                </div>
              </Link>
            </div>
          </div>
          )}
    </>
  )
}

Articles.propTypes = {
  articles: PropTypes.node,
};
