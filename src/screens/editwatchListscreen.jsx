import React from 'react';
import Swal from 'sweetalert2';
import backImg from "../assets/images/left-arrow.png";
import deleteImg from "../assets/images/delete_.png";
import { useNavigate } from "react-router-dom";
import { stockData } from '../assets/stocksData';
import "../assets/css/editwatchList.css";
export default function EditwatchListscreen() {
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
        <div className='Edit_parent'>
            <div className="Edit_Header">
                <div className="backIcon_edit" onClick={() => navigate(-1)}>
                    <img src={backImg} alt="back icon"/>
                </div>
                <div className="Edit_Banner">
                    <h6>new</h6>
                </div>
            </div>

            <div className="edit_body">
                {
                    stockData.map((item) => {
                        return <div className="editData_container">
                            <div className="edit_row1">
                                <div className="edit_name">{item.companyName}</div>
                                <div className="edit_deleteicon" onClick={handleDelete}>
                                    <img src={deleteImg} alt="delete" />
                                </div>
                            </div>
                            <div className="edit_row2">
                                <div className="edit_symbol">
                                    {item.sym.exc}
                                </div>
                            </div>
                        </div>
                    })
                }

            </div>
            {/* alert */}
            <template id="my-template">
                <swal-title>
                    Save changes to "Untitled 1" before closing?
                </swal-title>
                <swal-icon type="warning" color="red"></swal-icon>
                <swal-button type="confirm">
                    Save As
                </swal-button>
                <swal-button type="cancel">
                    Cancel
                </swal-button>
                <swal-button type="deny">
                    Close without Saving
                </swal-button>
                <swal-param name="allowEscapeKey" value="false" />
                <swal-param
                    name="customClass"
                    value='{ "popup": "my-popup" }' />
                <swal-function-param
                    name="didOpen"
                    value="popup => console.log(popup)" />
            </template>
        </div>
    )
}
