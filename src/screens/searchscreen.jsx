import React, { useState } from 'react';
import Searchbar from '../components/searchbar';
import backImg from "../assets/images/left-arrow.png";
import starImg from "../assets/images/star.png";
import { useNavigate } from "react-router-dom";
import { searchwatchListSymbolsRequest } from '../utils/device-interface';
import "../assets/css/searchScreen.css";


export default function Searchscreen() {
    const navigate = useNavigate();
    const [symbolData, setSymbolData] = useState([]
    );
    const [seatrchName, setSearchName] = useState([])
    const handleSearch = (data) => {
        console.log("handle search", data.target.value,);
        let searchtext = (data.target.value).toUpperCase();
        console.log("searchtext", searchtext);
        setSearchName(searchtext)

        if (searchtext.length > 1) {
            console.log("ready to send data ");
            searchwatchListSymbolsRequest(JSON.stringify({
                'symbol': searchtext
            }))
            if (!window.hasOwnProperty('getSearchSymbolsResponse')) {
                Object.defineProperty(window, 'getSearchSymbolsResponse', {
                    value: (res) => {
                        console.log("getSearchSymbolsResponse function called in web ", res);
                        let response = JSON.parse(res)
                        setSymbolData(response.data.symbols)
                        // return JSON.parse(response);
                    },
                    writable: false,
                });
            }
        }


    }
    return (
        <div className='parentsearch'>
            <div className="headersearch">
                <div className='back_arrow' onClick={() => navigate("/")}>
                    <img src={backImg}  alt="back icon"/>

                </div>
                <div className='search_area'>
                    <Searchbar placeholder='search  for company or stocks ' isSearchImg={true} backgroundcolor='#EEEEEE' handleSearchcallBack={handleSearch} />
                </div>
            </div>
            <div className="bodycontainer">
                {symbolData.length === 0 || seatrchName.length <= 1 ?
                    <div className='no_SearchData'>
                        <p className='search_label_stock'>Search one or more keywords</p>
                    </div> :
                    <div className='search_symbols_conatiner'>
                        {symbolData.map((item) => {
                            return <div className='sym_data'>
                                <div className='symbol_name'>
                                    <p>{item.Symbol}</p>
                                    <br />
                                    <p>{item['Company Name']}</p>
                                </div>
                                <div className="favorite_img_right">
                                    <img src={starImg} alt="favourite" />
                                </div>
                            </div>
                        })}
                    </div>}

            </div>


        </div>
    )
}
