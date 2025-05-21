import React, { useState } from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
function Favbook() {
    const[open,setOpen]=useState(false);
  

  return (
    <div>
    <div className='header'>
       <div > <h1>My Favourite Book</h1></div>
        <div className='book' ><i className="bi bi-book-fill fs-1"></i></div>
    </div>
 <div className='content' >
    
    <div ><button className='add' style={{ backgroundColor: 'green', color: 'white' }} onClick={()=>{setOpen(true)}}>Add</button>
    
    </div>
     <div >
        <table className='table'>
            <thead>
                <tr>
                    <th>SNo</th>
                    <th>Name</th>
                    <th>Author</th>
                    <th>Genere</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><Popup className='popup' trigger={<button className="dots-button">&#8942;</button>}  position="right center"><button className='edit' onClick={()=>{setOpen(true)}}>Edit </button><br></br>
                    <button className='edit'>Delete</button></Popup></td>
                </tr>
            </tbody>
        </table>
     </div>
    </div>
    {(open)?(
    <div className='popup'  onClick={(e) => {
    if (e.target.classList.contains('popup')) {
      setOpen(false);
    }
  }}>
     <div className='pop-item'>   
         <button class="close-btn" id="closeModalBtn"  onClick={() => setOpen(false)}>&times;</button>
      <table >
        <tr>
            <td>Name</td>
            <td><input></input></td>
        </tr>
        <br></br>
        <tr>
            <td>Author</td>
            <td><input></input></td>
        </tr>
        <br></br>
        <tr>
            <td>Genere</td>
            <td><input></input></td>
        </tr>
    <tr>
  <td colSpan="2">
    <div style={{ display: 'flex', gap: '50px',marginTop:'20px' }}>
      <button className='su'>submit</button>
      <button className='cl' onClick={() => setOpen(false)}>close</button>
    </div>
  </td>
</tr>

        </table></div>
    </div>)
    :null
}
    </div>
  )
}

export default Favbook