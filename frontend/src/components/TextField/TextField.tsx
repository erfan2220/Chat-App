import React from 'react';
import "./textField.scss"
import SearchIcon from "@mui/icons-material/Search";
const TextFieldCopy = () =>
{

    return (
        <div className="TextFieldContainer">
            <SearchIcon opacity="0.5"/>
            <input type="text" placeholder="جست و جو..." className="inputStyle"/>
        </div>
    );
};

export default TextFieldCopy;