import React, { useState } from 'react';

function Modal () {
    
    const [usernameToUpdate, setUsernameToUpdate] = useState('')
    const [nameToUpdate, setNameToUpdate] = useState('')
    const [emailToUpdate, setEmailToUpdate] = useState('')

    const handleSave = () => {
        console.log('hello')
    }
       
    
        return (
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Jewel</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p><span className="modal-lable">Nom:</span><input value={nameToUpdate} onChange={((e) => setNameToUpdate(e.target.value))} /></p>
                            <p><span className="modal-lable">Email:</span><input value={emailToUpdate} onChange={(e) =>setEmailToUpdate (e.target.value)} /></p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => { handleSave() }}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    
}

export default Modal;