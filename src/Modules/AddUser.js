import React, {useState, useEffect} from "react";
import LoadingIndicator from "../Components/UI/LoadingIndicator";
import { handleAddUserPostRequest } from "../Components/AxiosGetHandler";

const AddUser = () => {

    const [newUserData, setNewUserData] = useState({});
    const [loadingAddUser, setLoadingAddUser] = useState(false);
    const [addUserStatusMessage, setAddUserStatusMessage] = useState('');

    const handleAddUserSubmit = (event) => {
        event.preventDefault();
        setLoadingAddUser(true);
        setNewUserData({
            name: event.target['input-user-name'].value,
            gender: event.target['select-user-gender'].value,
            status: event.target['select-user-status'].value,
            email: event.target['input-user-email'].value
        });
    }

    useEffect( () => {
        if (Object.keys(newUserData).length !== 0) {
            setTimeout(() => {
                (async () => {
                    try {
                        const sucesStatus = await  handleAddUserPostRequest(newUserData);
                        setLoadingAddUser(false);
                        if (sucesStatus) {
                            setAddUserStatusMessage(`${newUserData.name} succesfully added!`);
                        } else {
                            setAddUserStatusMessage('Sorry something went wrong...');
                        }
                    } catch (error) {
                        setLoadingAddUser(false);
                    }
                })();
            }, 1000);  
        }
        
    }, [newUserData] );

    return (
        <div className="add-user-form-container">
            <h2>Add User:</h2>
            <form onSubmit={handleAddUserSubmit} className="add-user-form">
                <div className="form-section">
                    <label htmlFor="input-user-name">Name: </label>
                    <input type="text" id="input-user-name" required />
                </div>
                <div className="form-section">
                    <label htmlFor="input-user-email">Email: </label>
                    <input type="email" id="input-user-email" required />
                </div>
                <div className="form-section">
                    <label htmlFor="select-user-gender">Gender: </label>
                    <select id="select-user-gender" required>
                        <option value="">-Select-</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select> 

                    <label htmlFor="select-user-status">Status: </label>
                    <select id="select-user-status" required>
                        <option value="">-Select-</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
                <button type="submit">Add</button> 
            </form>
            <div>
                { loadingAddUser && <LoadingIndicator /> }
                { !loadingAddUser &&  <p>{addUserStatusMessage}</p> }
            </div>
        </div>
    );
}
export default AddUser;

