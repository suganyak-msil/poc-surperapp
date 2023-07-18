import React from 'react';
import Swal from 'sweetalert2';

import { useNavigate } from "react-router-dom";
import backImg from "../assets/images/left-arrow.png";
import deleteImg from "../assets/images/delete_.png";
import { watchlistNames } from '../assets/stocksData';

import "../assets/css/manage.css"
export default function Managewatchlistscreen() {
    const navigate = useNavigate();
    const handleDelete = () => {
        // Swal.fire({
        //     template: '#my-template'
        // }) 
        Swal.fire({
            title: 'Are you sure want to Delete',
            showDenyButton: true,
            // showCancelButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: 'No',
            customClass: {
                title: 'custom-title-class',
                actions: 'my-actions',
                cancelButton: 'order-1 right-gap',
                confirmButton: 'order-2',
                denyButton: 'order-3',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // Swal.fire('Saved!', '', 'success')
            } else if (result.isDenied) {
                // Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }

    return (
        <div className='ManageW_parent'>
            <div className="manageW_header">
                <div className="backIcon_manage" onClick={() => navigate(-1)}>
                    <img src={backImg} alt="back icon"/>
                </div>
                <div className="Manage_Banner">
                    <h5>Manage WatchList</h5>
                </div>
            </div>
            <div className="manageW_body">
                {watchlistNames.map((item) => {
                    return <div className="mitem_container">
                        <div className="watchlistNameLeft">
                            <p>{item.name}</p>
                        </div>
                        <div className="manageIcon" onClick={handleDelete} >
                            <img src={deleteImg} alt="delete"/>
                        </div>
                    </div>
                })}

            </div>

        </div>
    )
}
