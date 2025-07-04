import {React,useState,useEffect} from "react";
import "../css/Recentnovels.css";
import {Link} from "react-router-dom"
import axios from "axios";


function Recentnovels() {
    const [recentnovels, setrecentnovels] = useState([]);
    const api= import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchRecentNovels = async () => {
            try {
                const response = await axios.get(`${api}/recentnovels`);
                setrecentnovels(response.data);
            } catch (error) {
                console.error('Error fetching recent novels:', error);
            }
        };

        fetchRecentNovels();
    }, []);

    return (
        <div className="recently-updated-novels">
            <h2>Latest Updates</h2>
            <div className="novel-grid">
                {recentnovels.map((novel) => (
                    <div key={novel._id} className="novel-card">
                        <Link to={`/novel/${novel._id}`}><img src={`${api}${novel.coverImage}`} alt={novel.title} className="novel-image" /></Link>
                        <div className="recent-novel-info">
                            
                                <h3 title={novel.title}><Link to={`/novel/${novel._id}`}>{novel.title}</Link></h3>
                            
                            <p>{new Date(novel.updatedAt).toLocaleString()}</p>
                        </div>
                    </div>
                ))}
            </div>
            <Link to="/updates" className="viewMore"><p>View More</p></Link>
        </div>
    );
}

export default Recentnovels;
