

import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import { searchcontext } from './context';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Searchbar.css';

function Searchbar() {
  const { isexpand, setisexpand } = useContext(searchcontext);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const api= import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (query.length > 0) {
      axios.get(`${api}/search?query=${query}`)
        .then(response => {
          setSuggestions(response.data);
        })
        .catch(error => {
          console.error('Error fetching suggestions:', error);
        });
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    setisexpand(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setisexpand(false);
    }, 2000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/search?query=${query}`);
    console.log("you press enter");
  };

  return (
    <div className="searchpanel">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          className="searchbar"
          type='text'
          name="novel"
          placeholder="novel search"
          value={query}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
        <button type="submit" className="searchbtn"><i className="fa-solid fa-arrow-right"></i></button>
      </form>
      {isexpand && suggestions.length > 0 && (
        <ul className="search-suggestions-list">
          {suggestions.map((suggestion, index) => (
            <Link to={`/novel/${suggestion._id}`} style={{ textDecoration: 'none', color: 'white' }} key={index}>
              <li className="search-suggestion-item">
                <img src={`${api}${suggestion.coverImage}`} alt={suggestion.title} className="search-suggestion-image" />
                <span className="search-suggestion-title">{suggestion.title}</span>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Searchbar;
