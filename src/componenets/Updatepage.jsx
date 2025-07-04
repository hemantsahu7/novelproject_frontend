import {React,useEffect,useState} from "react";
import { useLocation, useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import Header from "./Header";
import Footercomponent from "./Footercomponent";

function Updatepage(){

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    };


    const [latestnovels,setlatestnovel] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const query = useQuery();
    const navigate = useNavigate();
    const api= import.meta.env.VITE_API_URL;

    useEffect(() => {
        
        const initialPage = parseInt(query.get('page')) || 1;

        setCurrentPage(initialPage);
    
        handlepage(initialPage);
      }, []);

    
      async function handlepage(page) {
      
    
        const params = new URLSearchParams();
        params.set('page', page);
    
        navigate({ search: params.toString() });
    
        try {
          const response = await axios.post(`${api}/filter`, {
            tags: [],
            excludedTags: [],
            rating: 'none',
            translationStatus: 'All',
            sortBy: 'update',
            page: page,
            limit: 8
          });
          setlatestnovel(response.data.novels);
          setTotalPages(Math.ceil(response.data.totalNovels / 8));
          setCurrentPage(page);
        } catch (error) {
          console.error('Error fetching latest novels:', error);
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
              onClick={() => handlepage(i)}
              className={i === currentPage ? 'active' : ''}
            >
              {i}
            </button>
          );
        }
    
        return buttons;
      };

    return(
        <>
        <div className="updatepage-topcontainer">
        <Header/>
       <div className="recently-updated-novels">
            <h2>Latest Updates</h2>
            <div className="novel-grid">
                {latestnovels.map((novel) => (
                    <div key={novel._id} className="novel-card">
                        <Link to={`/novel/${novel._id}`} style={{textDecoration:'none'}}><img src={`${api}${novel.coverImage}`} alt={novel.title} className="novel-image" /></Link>
                        <div className="recent-novel-info">
                            
                                <h3 title={novel.title}><Link to={`/novel/${novel._id}`}>{novel.title}</Link></h3>
                            
                            <p>{new Date(novel.updatedAt).toLocaleString()}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pagination">
             {currentPage > 1 && (
               <button onClick={() => handlepage(currentPage - 1)}>Prev</button>
             )}
             {renderPagination()}
             {currentPage < totalPages && (
               <button onClick={() => handlepage(currentPage + 1)}>Next</button>
             )}
            </div>
        </div>
        <Footercomponent/>
        </div>
        </>
    );

};
export default Updatepage;
