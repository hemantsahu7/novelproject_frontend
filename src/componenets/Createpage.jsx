import {React,useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Createpage(){
    const [createclick,setcreateclick] = useState(false);
    const [cover,setcover] = useState(null);
    const [novelname, setnovelname] = useState('');
    const [authorname, setauthorname] = useState('');
    const [tags, settags] = useState('');
    const [summary, setsummary] = useState('');
    const navigate = useNavigate();
    const api= import.meta.env.VITE_API_URL;
    async function creation(event){
       event.preventDefault();
       const formData = new FormData();
       formData.append('cover', cover);
       formData.append('novelname', novelname);
       formData.append('authorname', authorname);
       formData.append('tags', tags);
       formData.append('summary', summary);   

       try {
        const response = await axios.post(`${api}/createnovel`, formData, {
          withCredentials: true,
        });
        navigate(`/novel/${response.data._id}`);
      }catch (error) {
        console.log('Error during creation of novel', error);
      }
    }

    return (
        <>
        <div className="createbody">
         {createclick ===false?
         <button className="create-btn" onClick={()=>{setcreateclick(true);}}>create</button>:
         <div  className="create">
            <h2>hello! author want to create new work?</h2>
            <form className="createnovel" onSubmit={creation}>
               <div className="inputbox">
                  <input className="ipt" type="text" placeholder=" " value={novelname} onChange={(e)=>{setnovelname(e.target.value)}}></input>
                   <label className="labelclass">Enter novel name</label>
               </div>
               <div className="inputbox">
                  <input className="ipt" type="text" placeholder=" " value={authorname} onChange={(e)=>{setauthorname(e.target.value)}}></input>
                   <label className="labelclass">Author name</label>
               </div>
               <div className="inputbox">
                  <input className="ipt" type="text" placeholder=" " value={tags} onChange={(e)=>{settags(e.target.value)}}></input>
                   <label className="labelclass">Enter Tags</label>
               </div>
               <div className="textbody">
                 <textarea placeholder="enter summary" rows={5} value={summary} onChange={(e)=>{setsummary(e.target.value)}}></textarea>
               </div>
             <div className="inputbox">
                <label className="uploadnovelcover center">{cover==null?<div><i class="fa-solid fa-cloud-arrow-up"></i><span>upload novel cover</span></div>:`${cover.name}`}</label>
                <input className = "novelcover" type="file" onChange={(e)=>{setcover(e.target.files[0])}}></input>
              </div>
             
             <button className="create-btn" >create</button>
            </form>
         </div>
        }
        </div>
        </>
    )
};
export default Createpage;