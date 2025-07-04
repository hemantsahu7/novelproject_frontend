import React, { useEffect, useState, useContext } from 'react';
import '../css/Particularchapter.css'; 
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import Header from "./Header";
import { profilecontext } from "./context.jsx";
import Footercomponent from './Footercomponent.jsx';
import Chaptersettings from './chaptersettings.jsx';

const Particularchapter = () => {
    const navigate = useNavigate();
    const { novelId, chapterId } = useParams();
    const [novelcontent, setnovelcontent] = useState({});
    const [nextchapterId, setnextchapterId] = useState(null);
    const [prevchapterId, setprevchapterId] = useState(null);
    const [chapter, setchapter] = useState(null);
    const [readChapters, setReadChapters] = useState([]);
    const { authstatus, setfontfamily, setfontsize, setcolorscheme, setparagraphspacing, fontsize, fontfamily, colorscheme, paragraphspacing } = useContext(profilecontext);
    const [showsetting, setshowsetting] = useState(false);
    const api= import.meta.env.VITE_API_URL;

    useEffect(() => {
        // Load settings from localStorage when the component mounts
        const loadSettingsFromLocalStorage = () => {
            const savedFontFamily = localStorage.getItem("fontfamily");
            const savedFontSize = localStorage.getItem("fontsize");
            const savedColorScheme = localStorage.getItem("colorscheme");
            const savedParagraphSpacing = localStorage.getItem("paragraphspacing");

            if (savedFontFamily) setfontfamily(savedFontFamily);
            if (savedFontSize) setfontsize(parseInt(savedFontSize));
            if (savedColorScheme) setcolorscheme(savedColorScheme);
            if (savedParagraphSpacing) setparagraphspacing(parseInt(savedParagraphSpacing));
        };

        loadSettingsFromLocalStorage();

        async function apidata() {
            try {
                const response = await axios.get(`${api}/novel/${novelId}`);
                const novelData = response.data;
                setnovelcontent(novelData);
                
                const currentIndex = novelData.chapters.findIndex(chapter => chapter._id === chapterId);
                if (currentIndex !== -1) {
                    setchapter(novelData.chapters[currentIndex]);
                    setprevchapterId(currentIndex > 0 ? novelData.chapters[currentIndex - 1]._id : null);
                    setnextchapterId(currentIndex < novelData.chapters.length - 1 ? novelData.chapters[currentIndex + 1]._id : null);
                }
            } catch (error) {
                console.error("Error fetching chapter data:", error);
            }
        }

        apidata();
        fetchReadChapters();
        handleChapterClick(chapterId);
    }, [authstatus, novelId, chapterId, setfontfamily, setfontsize, setcolorscheme, setparagraphspacing]);

    const fetchReadChapters = async () => {
        if (authstatus.authenticated) {
            try {
                const response = await axios.get(`${api}/users/${authstatus.user._id}/novels/${novelId}/read-chapters`);
                setReadChapters(response.data);
            } catch (error) {
                console.error('Error fetching read chapters:', error);
            }
        }
    };

    const handleChapterClick = async (chapterId) => {
        if (authstatus.authenticated) {
            if (!readChapters.includes(chapterId)) {
                try {
                    await axios.post(`${api}/users/${authstatus.user._id}/novels/${novelId}/chapters/${chapterId}/read`);
                    setReadChapters([...readChapters, chapterId]);
                } catch (error) {
                    console.error('Error marking chapter as read:', error);
                }
            }
        }
    };

    const closingfunction = () => {
        setshowsetting(false);
    };

    return (
        <>
            <div className='particularchapter-topcontainer'>
                <Header />
                <div className="particularchapter-container">
                    {novelcontent && chapter ? (
                        <>  
                            <div className="particularchapter-header">
                                <div className='setting-box'>
                                    <h2 className="particularnovel-title">{novelcontent.title}</h2>
                                    <div className='setting-logo' onClick={() => { setshowsetting(true) }}><i className="fa-solid fa-gear" ></i></div>
                                </div>
                                <h3 className="particularchapter-title">Chapter {chapter.number}: {chapter.title}</h3>
                            </div>
                            <div className='content-wrapper' style={{ backgroundColor: `${colorscheme}` }}>
                                <div className="particularchapter-content">
                                    {chapter.content.split('\n').map((paragraph, index) => (
                                        <p key={index} style={{ color: `${colorscheme === "black" ? "white" : "black"}`, fontSize: `${fontsize / 16}rem`, fontFamily: `${fontfamily}`, margin: `${paragraphspacing / 16}rem 0` }}>{paragraph}</p>
                                    ))}
                                </div>
                                <div className="particularchapter-navigation">
                                    <button
                                        onClick={() => navigate(`/novel/${novelId}/particularchapter/${prevchapterId}`)}
                                        disabled={!prevchapterId}
                                        className="particularnavigation"
                                    >
                                        ◀ PREV
                                    </button>
                                    <button
                                        onClick={() => navigate(`/novel/${novelId}`)}
                                        className="particularnavigation"
                                    >
                                        🏠 INDEX
                                    </button>
                                    <button
                                        onClick={() => navigate(`/novel/${novelId}/particularchapter/${nextchapterId}`)}
                                        disabled={!nextchapterId}
                                        className="particularnavigation"
                                    >
                                        NEXT ▶
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
                <Footercomponent />
            </div>
            {showsetting && <Chaptersettings closingfunction={closingfunction} />}
        </>
    );
};

export default Particularchapter;


