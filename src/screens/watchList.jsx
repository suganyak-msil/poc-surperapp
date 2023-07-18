import React, { useEffect, useState } from 'react';
import AddImg from "../assets/images/add_w.png";
import EditImg from "../assets/images/edit_w.png";
import ManageImg from "../assets/images/manage_w.png";
import MoreImg from "../assets/images/more.png";
import searchImg from "../assets/images/search.png";
import { sendGetGroupsRequest, getWatchListSymbolData } from "../utils/device-interface";
import { useNavigate } from "react-router-dom";
import {useDispatch } from 'react-redux';
import { getsymbolslist, storewatchlistHeaders } from '../actions/watchlistAction';
import Searchbar from '../components/searchbar';

export default function WatchList() {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [stockList, setStockList] = useState([])
    const [watchListNames, setWatchListNames] = useState([]);
    console.log("watchListNames", watchListNames);
    const [headerErr, setHeaderErr] = useState(false);
    console.log("headerErr", headerErr);
    const [stockDataErr, setStockDataErr] = useState(false)
    //const [deviceType, setDeviceType] = useState("");
    const [modalOpen, setMOdalOpen] = useState('modal fade');
    const [createWatchListOpen, setCreateWatchListOpen] = useState('modal fade')
    const [checkData, setCheckData] = useState('Hi')
    //const watchListGroup = useSelector(state => state.WatchListReducer);
    //const watchListNamesGroup = watchListGroup.watchListSymbolsGroup

    // device detect 
    useEffect(() => {
        // if (
        //     /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(navigator.userAgent
        //     )
        // ) {
        //     /iPad|iPhone|iPod/.test(navigator.userAgent) ?
        //         setDeviceType("ios") : setDeviceType('Android')
        //     // setWatchListNames(watchlistNames);

        // } else {
        //     setDeviceType("Desktop");
        // }
        sendGetGroupsRequest();
    }, []);

    useEffect(() => {
        check();
        console.log("console in useEffect ");
        //eslint-disable-next-line
    }, [])

    async function check() {
        // sendGetGroupsRequest();
        if (!window.hasOwnProperty('getGroupsResponse')) {
            console.log("!window.hasOwnProperty('getGroupsResponse')");
           // setCheckData('welcome')
            Object.defineProperty(window, 'getGroupsResponse', {
                value: (response) => {
                    console.log("getGroupsResponse function called in web ",);
                    setCheckData('welcome')
                    console.log(checkData)
                    if(response) {
                        let Grpresponse = JSON.parse(response)
                        if (Grpresponse && Grpresponse.status) {
                            console.log("inside success  Grpresponse.status");
                            setWatchListNames(Grpresponse.data.watchlists);
                            dispatch(storewatchlistHeaders(Grpresponse.data.watchlists))
                            let headerArr = Grpresponse.data.watchlists;
                            let req = JSON.stringify({
                                "wId": headerArr[0].wId,
                            })
                            getWatchListSymbolData(req);
                            setStockData()
                        }
                        else {
                            console.log("inside failure  Grpresponse.status");
    
                            setHeaderErr(true)
                        }
                    }
                    
                },
                writable: false,
            });
        }
        else {
            let checkResponse = window.getGroupsResponse();
            if(checkResponse){
                checkResponse = JSON.parse(checkResponse)
                if (checkResponse.status) {
                    setWatchListNames(checkResponse.data.watchlists);
    
                }
                else {
                    console.error("invalid  data call ")
                }
    
                console.log("window.hasOwnProperty('getGroupsResponse'");
            }

        }
    }



    const setStockData = () => {
        console.log("inside stock Data func ");
        if (!window.hasOwnProperty('getWatchListSymbolsResponse')) {
            Object.defineProperty(window, 'getWatchListSymbolsResponse', {
                value: (response) => {
                    let symbolData = JSON.parse(response)
                    console.log("getWatchListSymbolsResponse function called in web ", response);
                    if (symbolData.status) {
                        console.log("inside  symbolData true");
                        let checkArr = symbolData.data.symbols;
                        console.log("checkArr", checkArr, stockDataErr);
                        setStockList(symbolData.data.symbols)
                        dispatch(getsymbolslist(symbolData.data.symbols))
                        setStockDataErr(false)
                    } else {
                        console.log("inside  symbolData false");
                        setStockDataErr(true)
                    }
                },
                writable: false,
            });
            console.log('')

        }
        else {
            console.log(" else part of !window.hasOwnProperty('getWatchListSymbolsResponse')");
        }
    }

    const handleWatchListClick = (item) => {
        console.log("item", item);
        let req = JSON.stringify({
            "wId": item,
        })
        getWatchListSymbolData(req);
        setStockData()


    }
    const handleOpenModal = () => {
        setMOdalOpen('modal fade show')
    }
    const handleCreateWatchList = () => {
        setMOdalOpen('modal fade ');
        setCreateWatchListOpen('modal fade show')

    }
    const addNewWatchList = () => {
        setCreateWatchListOpen('modal fade')

    }
    const handlechange = () => {

    }
    function handleNav() {
        console.log("isnide habdleNav");
        navigate('/search')

    }
    return (
        <div>
            <div className='watchlist_banner'>
                <div className='right_header'>
                    <p className='watchList_Banner'>watchList Component</p>

                </div>
                <div className='left_img' >
                    <img src={searchImg} onClick={handleNav} alt="saerch" />
                </div>
            </div>
            {!headerErr ?
                <ul className='watclistNames_container'>
                    {watchListNames && watchListNames.length > 0 && watchListNames.map((item) => {
                        return <li onClick={() => handleWatchListClick(item['wId'])}>{item['wName']} </li>
                    })}

                </ul> : <div className='header_err'>Invalid WatchList Header Data </div>}
            <div className='watchList_header'>

                <Searchbar isSetting={false} placeholder=' stocks, future  & Options' handleSettings={handleOpenModal} isRoute={'search'} />
                <div className='more_Icon'>
                    <img src={MoreImg} onClick={handleOpenModal} alt="more"/>
                </div>
            </div>
            <div>{checkData}</div>
            {
            !stockDataErr ?
                <div className='watchListComponent'>
                    {stockList.map((item) => {
                        return <div className='watchlist-item'>
                            <div className='watchlist-row'>
                                <div className='watchlist_data_left' >

                                    <p style={{ fontWeight: 'bold', color: 'blue' }}>{item.symbol}</p>
                                </div>
                                <div className='watchlist_data_right'>
                                    <p >--</p>
                                </div>
                            </div>
                            <div className='watchlist-row'>
                                <div className='watchlist_data_left'>
                                    <p style={{ fontWeight: 'bold', color: 'green' }}>{item.companyName}</p>
                                </div>
                                <div className='watchlist_data_right'>
                                    <p>-</p>
                                </div>
                            </div>
                        </div>
                    })}
                    {/* modal popup */}

                    {/* open on click more icon  */}
                    <div className={modalOpen} id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: modalOpen === 'modal fade show' ? 'block' : '' }}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <div className='list_item'>
                                        <div className='w_icons'>
                                            <img src={AddImg}  alt="icon"/>
                                        </div>
                                        <div className='action_name' onClick={handleCreateWatchList}>
                                            <p>Create New WatchList</p>
                                        </div>
                                    </div>
                                    <div className='list_item'>
                                        <div className='w_icons'>
                                            <img src={EditImg} alt="edit"/>

                                        </div>
                                        {/* onClick={() => navigate('editwatchList')} */}
                                        <div className='action_name' onClick={() => navigate('editwatchList')} >
                                            <p>Edit Current WatchList</p>
                                        </div>
                                    </div>
                                    <div className='list_item' >
                                        <div className='w_icons'>
                                            <img src={ManageImg} alt="list" />
                                        </div>
                                        {/* onClick={() => navigate('manage')} */}
                                        <div className='action_name' onClick={() => navigate('manage')} >
                                            <p>Manage WatchList</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* create watchlist */}
                    <div className={createWatchListOpen} id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: createWatchListOpen === 'modal fade show' ? 'block' : '' }}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <p>Create WatchList</p>
                                </div>
                                <div className="modal-body">
                                    <p>List Name </p>
                                    <input type='text' className='create_watchList' name='watchListName' onChange={handlechange} />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary btn-lg btn-block" onClick={addNewWatchList}>Create</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> : <div className='stock_err'>No stock Data </div>}

        </div>
    )
}
