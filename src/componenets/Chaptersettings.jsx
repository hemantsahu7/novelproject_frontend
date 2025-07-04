
import React, { useState, useContext, useEffect } from "react";
import "../css/Chaptersettings.css";
import { profilecontext } from "./context";

function Chaptersettings({ closingfunction }) {
    const { fontfamily, setfontfamily, fontsize, setfontsize, colorscheme, setcolorscheme, paragraphspacing, setparagraphspacing } = useContext(profilecontext);

    // Load settings from localStorage
    useEffect(() => {
        const savedFontFamily = localStorage.getItem("fontfamily");
        const savedFontSize = localStorage.getItem("fontsize");
        const savedColorScheme = localStorage.getItem("colorscheme");
        const savedParagraphSpacing = localStorage.getItem("paragraphspacing");

        if (savedFontFamily) setfontfamily(savedFontFamily);
        if (savedFontSize) setfontsize(parseInt(savedFontSize));
        if (savedColorScheme) setcolorscheme(savedColorScheme);
        if (savedParagraphSpacing) setparagraphspacing(parseInt(savedParagraphSpacing));
    }, [setfontfamily, setfontsize, setcolorscheme, setparagraphspacing]);

    // Save settings to localStorage
    const handleFontSizeChange = (e) => {
        const value = e.target.value;
        setfontsize(value);
        localStorage.setItem("fontsize", value);
    };

    const handleFontFamilyChange = (e) => {
        const value = e.target.value;
        setfontfamily(value);
        localStorage.setItem("fontfamily", value);
    };

    const handleColorSchemeChange = (e) => {
        const value = e.target.value;
        setcolorscheme(value);
        localStorage.setItem("colorscheme", value);
    };

    const handleParagraphSpacingChange = (delta) => {
        const value = paragraphspacing + delta;
        setparagraphspacing(value);
        localStorage.setItem("paragraphspacing", value);
    };

    return (
        <>
            <div className="setting-top-div">
                <div className="setting-div">
                    <div className="setting">
                        <label>Font Size</label>
                        <select value={fontsize} onChange={handleFontSizeChange}>
                            <option value={16}>16</option>
                            <option value={20}>20</option>
                            <option value={24}>24</option>
                            <option value={28}>28</option>
                            <option value={32}>32</option>
                        </select>
                    </div>

                    <div className="setting">
                        <label>Font Family</label>
                        <select value={fontfamily} onChange={handleFontFamilyChange}>
                            <option value="Arial, Helvetica, sans-serif">Default</option>
                            <option value="'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif">Lucida sans</option>
                            <option value="'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif">Franklin Gothic</option>
                        </select>
                    </div>

                    <div className="setting">
                        <label>Color Scheme</label>
                        <select value={colorscheme} onChange={handleColorSchemeChange}>
                            <option value="white">Default</option>
                            <option value="#f0cfad">Sepia</option>
                            <option value="#D3D3D3">Light Gray</option>
                            <option value="black">Black</option>
                        </select>
                    </div>

                    <div className="setting">
                        <label>Paragraph Spacing</label>
                        <div className="spacing-options">
                            <button onClick={() => handleParagraphSpacingChange(-1)}>-</button>
                            <span>{paragraphspacing}</span>
                            <button onClick={() => handleParagraphSpacingChange(1)}>+</button>
                        </div>
                    </div>

                    <div className="settings-footer">
                        <button onClick={closingfunction}>Close</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Chaptersettings;
