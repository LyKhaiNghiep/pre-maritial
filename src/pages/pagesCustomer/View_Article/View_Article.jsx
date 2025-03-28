import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getArticles, getUsers } from "../customerServices";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./View_Article.css";

// Import images
import ar1 from "../../../assets/asstetsCustomer/ar1.jpg";
import ar2 from "../../../assets/asstetsCustomer/ar2.jpg";
import ar3 from "../../../assets/asstetsCustomer/ar3.jpg";
import ar4 from "../../../assets/asstetsCustomer/ar4.jpg";
import ar5 from "../../../assets/asstetsCustomer/ar5.jpg";
import ar6 from "../../../assets/asstetsCustomer/ar6.jpg";
import ar7 from "../../../assets/asstetsCustomer/ar7.jpg";

const images = [ar1, ar2, ar3, ar4, ar5, ar6, ar7];

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [authors, setAuthors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticlesAndAuthors = async () => {
      setLoading(true);
      try {
        const articlesData = await getArticles(currentPage);
        setArticles(articlesData.content || []);
        setTotalPages(articlesData.totalPages || 1);

        const users = await getUsers();
        const authorsMap = {};
        users.forEach((user) => {
          authorsMap[user.id] = user.username;
        });
        setAuthors(authorsMap);
      } catch (error) {
        console.error("Error fetching articles or users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticlesAndAuthors();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getRandomImage = () => {
    return images[Math.floor(Math.random() * images.length)];
  };

  const handleArticleClick = (articleId, articleTitle) => {
    navigate(`/customer-home/articles/${articleId}/parts`, {
      state: { articleTitle },
    });
  };

  if (loading)
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Loading articles...</p>
      </div>
    );

  return (
    <div className="articles-page">
      <h2 className="page-title">Article List</h2>
      {articles.length === 0 ? (
        <p className="empty-message">No articles available.</p>
      ) : (
        <ul className="articles-list">
          {articles.map((article) => (
            <li
              key={article.id}
              className="article-item"
              onClick={() => handleArticleClick(article.id, article.title)}
            >
              <div className="article-image-container">
                <img
                  src={getRandomImage()}
                  alt="Article"
                  className="article-image"
                />
                <div className="image-overlay">
                  <span className="read-more-text">Read More</span>
                </div>
              </div>
              <div className="article-content-container">
                <h3 className="article-title">{article.title}</h3>
                <p className="article-content">{article.content}</p>
                <div className="article-meta">
                  <small className="article-author">
                    {authors[article.approvedUserId]
                      ? `By ${authors[article.approvedUserId]}`
                      : "Author unknown"}
                  </small>
                  {article.createdDate && (
                    <small className="article-date">
                      {new Date(article.createdDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </small>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="pagination">
        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ArrowBackIosIcon className="pagination-icon" />
          Previous Page
        </button>
        <span className="pagination-info">
          Page {currentPage} / {totalPages}
        </span>
        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next Page
          <ArrowForwardIosIcon className="pagination-icon" />
        </button>
      </div>
    </div>
  );
};

export default ArticlesPage;