import {React , useState,createContext} from "react";
import image from '../assets/default-pic.png';

 const searchcontext = createContext();

const profilecontext = createContext();

function Profilecontextprovider({children}){
    const[currimage,setcurrimage] = useState(null);
    const[imageurl,setimageurl] = useState(image);
    const [authstatus,setauthstatus] = useState({authenticated:false, user:null});
    const [fontsize,setfontsize] = useState(16);
    const [fontfamily,setfontfamily] = useState("Arial, Helvetica, sans-serif");
    const [colorscheme,setcolorscheme] = useState("white");
    const [paragraphspacing,setparagraphspacing] = useState(10);

    

    return(
        <profilecontext.Provider value={{currimage,setcurrimage,imageurl,setimageurl,authstatus,setauthstatus,fontsize,setfontsize,fontfamily,setfontfamily,colorscheme,setcolorscheme,paragraphspacing,setparagraphspacing}} >
            {children}
        </profilecontext.Provider>
    )
}


export {searchcontext,Profilecontextprovider,profilecontext};

