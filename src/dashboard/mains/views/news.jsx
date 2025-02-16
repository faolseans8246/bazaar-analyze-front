import React, { useState, useEffect } from "react";
import './news.css';

function NewsFunc() {
    const [news, setNews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [newsPerPage] = useState(3);

    useEffect(() => {
        fetch("https://bazaar-analyze-c1d62cd1ada0.herokuapp.com/api/news/daily")
            .then(response => response.json())
            .then(data => setNews(data.data))  // `data` obyekti ichidan `data` arrayni olish
            .catch(error => console.error("Error fetching news:", error));
    }, []);

    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(news.length / newsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="newsContainer">
            {/*<h2 className="headline">Latest News</h2>*/}
            <table className="newsTable">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Link</th>
                </tr>
                </thead>
                <tbody>
                {currentNews.map((article, index) => (
                    <tr key={index} className="newsRow">
                        <td>{article.title}</td>
                        <td>{article.description}</td>
                        <td>
                            {article.urlToImage && <img src={article.urlToImage} alt="news" className="newsImage" />}
                        </td>
                        <td>
                            <a href={article.url} target="_blank" rel="noopener noreferrer" className="readMore">Read more</a>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="pagination">
                {pageNumbers.map(number => (
                    <button key={number} onClick={() => paginate(number)} className="pageBtn">
                        {number}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default NewsFunc;
