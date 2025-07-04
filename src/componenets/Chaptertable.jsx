
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../css/Chaptertable.css'; // Import the CSS file
import { useNavigate } from "react-router-dom";
import { profilecontext } from "./context";

const Chaptertable = ({ novelId, postedBy }) => {
    const navigate = useNavigate();
    const { authstatus } = useContext(profilecontext);
    const [readChapters, setReadChapters] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [sortOrder, setSortOrder] = useState('desc');
    const [searchTerm, setSearchTerm] = useState('');
    const [showOptions, setShowOptions] = useState(null); // State to manage showing options
    const api= import.meta.env.VITE_API_URL;
    useEffect(() => {
        fetchReadChapters();
        fetchChapters();
    }, [authstatus.authenticated, currentPage, itemsPerPage, sortOrder, searchTerm]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showOptions && !document.getElementById(showOptions).contains(event.target)) {
                setShowOptions(null);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [showOptions]);

    const fetchChapters = async () => {
        try {
            const link = `${api}/novelchapters/${novelId}`;
            const response = await axios.get(link, {
                params: {
                    sortOrder,
                    searchTerm,
                    page: currentPage,
                    itemsPerPage
                }
            });
            setChapters(response.data.chapters);
            setPageCount(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching chapters:', error);
        }
    };

    const fetchReadChapters = async () => {
        if (authstatus.authenticated) {
            console.log("fetchreadchapter route is called");
            try {
                const response = await axios.get(`${api}/users/${authstatus.user._id}/novels/${novelId}/read-chapters`);
                console.log(response.data);
                setReadChapters(response.data);
            } catch (error) {
                console.error('Error fetching read chapters:', error);
            }
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(0); // Reset to first page on search
    };

    const handleSortOrderChange = () => {
        setSortOrder(prevSortOrder => prevSortOrder === 'desc' ? 'asc' : 'desc');
    };

    const getPaginationButtons = () => {
        const maxButtons = 6;
        let startPage, endPage;

        if (pageCount <= maxButtons) {
            startPage = 0;
            endPage = pageCount;
        } else {
            if (currentPage <= 2) {
                startPage = 0;
                endPage = maxButtons;
            } else if (currentPage + 3 >= pageCount) {
                startPage = pageCount - maxButtons;
                endPage = pageCount;
            } else {
                startPage = currentPage - 2;
                endPage = currentPage + 4;
            }
        }

        return Array.from({ length: endPage - startPage }, (_, index) => startPage + index);
    };

    const handleEdit = (chapterId) => {
        // Handle edit functionality here
        console.log(`Edit chapter: ${chapterId}`);
        navigate(`/editchapter/${novelId}/${chapterId}`);
    };

    const handleDelete = async(chapterId) => {
        // Handle delete functionality here
        console.log(`Delete chapter: ${chapterId}`);

        try {
            const response = await axios.post(`${api}/deletechapter`, { novelId, chapterId }, {
                withCredentials: true,
            });
            console.log(response.data);
            // Optionally, refetch chapters or update the state to remove the deleted chapter from the UI
            fetchChapters();
        } catch (error) {
            console.log('Error during deletion of chapter', error);
        }
    };

    const handleAddChapter = () => {
        // Logic to handle adding a new chapter, e.g., opening a modal to enter chapter details
        console.log("Add Chapter button clicked");
        navigate(`/addchapter/${novelId}`);
    };

    const toggleOptions = (chapterId) => {
        setShowOptions(prevState => (prevState === chapterId ? null : chapterId));
    };

    const handleChapterClick = async (chapterId) => {
        navigate(`/novel/${novelId}/particularchapter/${chapterId}`);
    };

    return (
        <div className="chapter-table-container">
            <h2>TABLE OF CONTENTS</h2>
            <div className="entries-per-page">
                <label>
                    <span>entries per page</span>
                    <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
                        <option value={3}>3</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </label>
            </div>
            <div className="search-bar">
                <input
                    type="number"
                    placeholder="Search by chapter number"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                {authstatus.authenticated && authstatus.user.email === postedBy && (
                    <button className="add-chapter-button" onClick={handleAddChapter}>Add Chapter</button>
                )}
            </div>
            <table className="chapter-table">
                <thead>
                    <tr>
                        <th>Chapter No.</th>
                        <th>Chapter Name</th>
                        <th onClick={handleSortOrderChange} style={{ cursor: 'pointer' }}>
                            Release Date {sortOrder === 'desc' ? '▼' : '▲'}
                        </th>
                        {authstatus.authenticated && authstatus.user.email === postedBy && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {chapters.map((chapter) => (
                        <tr key={chapter._id}
                            style={{ backgroundColor: readChapters.includes(chapter._id) ? 'lightgreen' : ' white' }}
                        >
                            <td className="chapternumber-cell" onClick={() => handleChapterClick(chapter._id)}>{`ch ${chapter.number}`}</td>
                            <td className='title-cell' onClick={() => handleChapterClick(chapter._id)}>{chapter.title}</td>
                            <td className="date-cell" onClick={() => handleChapterClick(chapter._id)}>{new Date(chapter.createdAt).toLocaleDateString()}</td>
                            {authstatus.authenticated && authstatus.user.email === postedBy && (
                                <td className="options-cell">
                                    <i id={chapter._id} className="fa-solid fa-ellipsis-vertical" onClick={() => toggleOptions(chapter._id)} style={{ cursor: 'pointer' }} ></i>
                                    {showOptions === chapter._id && (
                                        <div id={chapter._id} className="options-dropdown">
                                            <button onClick={() => handleEdit(chapter._id)}>Edit</button>
                                            <button onClick={() => handleDelete(chapter._id)}>Delete</button>
                                        </div>
                                    )}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                {getPaginationButtons().map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        disabled={pageNumber === currentPage}
                    >
                        {pageNumber + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Chaptertable;
