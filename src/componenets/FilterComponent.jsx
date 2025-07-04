
import React, { useState, useEffect } from 'react';
import '../css/TagSelector.css';
import Header from './Header';
import Novelcatlog from './Novelcatlog';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footercomponent from './Footercomponent';

const allTags = [
  'Romance', 'Action', 'Mystery', 'Martial Arts',
  'Fantasy', 'Sci-fi', 'Horror', 'Slice of life', 'Mature'
];

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const TagSelector = ({ selectedTags, setSelectedTags }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestedTags, setSuggestedTags] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length >= 4) {
      const suggestions = allTags.filter(tag =>
        tag.toLowerCase().includes(value.toLowerCase()) &&
        !selectedTags.includes(tag)
      );
      setSuggestedTags(suggestions);
    } else {
      setSuggestedTags([]);
    }
  };

  const handleTagSelect = (tag) => {
    setSelectedTags([...selectedTags, tag]);
    setInputValue('');
    setSuggestedTags([]);
  };

  const handleTagRemove = (tag) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  return (
    <div className='tag-selector-div'>
      <div className="tag-container">
        {selectedTags.map(tag => (
          <div key={tag} className="tag">
            {tag}
            <button onClick={() => handleTagRemove(tag)}>x</button>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Please enter 4 or more characters"
        />
        {suggestedTags.length > 0 && (
          <ul className="suggestions-list">
            {suggestedTags.map(tag => (
              <li key={tag} onClick={() => handleTagSelect(tag)}>
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const FilterComponent = () => {
  const query = useQuery();
  const navigate = useNavigate();

  const [selectedTags, setSelectedTags] = useState([]);
  const [excludedTags, setExcludedTags] = useState([]);
  const [rating, setRating] = useState('none');
  const [translationStatus, setTranslationStatus] = useState('All');
  const [sortBy, setSortBy] = useState('views');
  const [filterNovels, setFilterNovels] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const api= import.meta.env.VITE_API_URL;

  useEffect(() => {
    const initialTags = query.get('tags')?.split(',') || [];
    const initialExcludedTags = query.get('excludedTags')?.split(',') || [];
    const initialRating = query.get('rating') || 'none';
    const initialTranslationStatus = query.get('translationStatus') || 'All';
    const initialSortBy = query.get('sortBy') || 'views';
    const initialPage = parseInt(query.get('page')) || 1;

    setSelectedTags(initialTags);
    setExcludedTags(initialExcludedTags);
    setRating(initialRating);
    setTranslationStatus(initialTranslationStatus);
    setSortBy(initialSortBy);
    setCurrentPage(initialPage);

    applyFilters(initialPage, {
      initialTags,
      initialExcludedTags,
      initialRating,
      initialTranslationStatus,
      initialSortBy
    });
  }, []);

  async function applyFilters(page, initialState = {}) {
    const {
      initialTags = selectedTags,
      initialExcludedTags = excludedTags,
      initialRating = rating,
      initialTranslationStatus = translationStatus,
      initialSortBy = sortBy
    } = initialState;

    const params = new URLSearchParams();
    if (initialTags.length) params.set('tags', initialTags.join(','));
    if (initialExcludedTags.length) params.set('excludedTags', initialExcludedTags.join(','));
    if (initialRating !== 'none') params.set('rating', initialRating);
    if (initialTranslationStatus !== 'All') params.set('translationStatus', initialTranslationStatus);
    params.set('sortBy', initialSortBy);
    params.set('page', page);

    navigate({ search: params.toString() });

    try {
      const response = await axios.post(`${api}/filter`, {
        tags: initialTags,
        excludedTags: initialExcludedTags,
        rating: initialRating,
        translationStatus: initialTranslationStatus,
        sortBy: initialSortBy,
        page: page,
        limit: 8
      });
      setFilterNovels(response.data.novels);
      setTotalPages(Math.ceil(response.data.totalNovels / 8));
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching filtered novels:', error);
    }
  };

  const renderPagination = () => {
    const buttons = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 5);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => applyFilters(i)}
          className={i === currentPage ? 'active' : ''}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  return (
    <>
      <Header />
      <div className='filter-component-body'>
        <div className='filter-top-container'>
          <div className="filter-container">
            <div className="filter-section">
              <label>Tags</label>
              <TagSelector selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
            </div>

            <div className="filter-section">
              <label>Tags Excluded</label>
              <TagSelector selectedTags={excludedTags} setSelectedTags={setExcludedTags} />
            </div>

            <div className="filter-section">
              <label>Rating</label>
              <select value={rating} onChange={(e) => setRating(e.target.value)}>
                <option value="none">none</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>

            <div className="filter-section">
              <label>Translation Status</label>
              <select value={translationStatus} onChange={(e) => setTranslationStatus(e.target.value)}>
                <option value="All">All</option>
                <option value="Completed">Completed</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Hiatus">Hiatus</option>
              </select>
            </div>

            <div className="filter-section">
              <label>Sort Results By...</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="views">views</option>
                <option value="update">update</option>
                <option value="rating">rating</option>
                <option value="A-Z">A-Z</option>
                <option value="rank">rank</option>
              </select>
            </div>
            <button className='filter-apply' onClick={() => applyFilters(1)}>Apply</button>
          </div>
        </div>
        <div className='filtered-novel-div'>
          {filterNovels.map(filterednovel => {
            return (<Novelcatlog key={filterednovel.id} filterednovel={filterednovel} />);
          })}
        </div>
        <div className="pagination">
          {currentPage > 1 && (
            <button onClick={() => applyFilters(currentPage - 1)}>Prev</button>
          )}
          {renderPagination()}
          {currentPage < totalPages && (
            <button onClick={() => applyFilters(currentPage + 1)}>Next</button>
          )}
        </div>
      </div>
      <Footercomponent/>
    </>
  );
};

export default FilterComponent;









