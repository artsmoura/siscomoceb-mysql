import React from 'react';
import Button from '../../Button/button';
import { useDispatch } from 'react-redux';
import { logout } from '../../../modules/Auth/redux/authAction';
import { useNavigate } from 'react-router-dom';

function ProfileModalHeader(props) {

    const user = props.user;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <div className='contentModalHeader'>
            <div className='profileImg'>
                <img src="img/avatar.png" alt='perfil'></img>
            </div>
            <p>{user.name.toLowerCase()} {user.sobrenome.toLowerCase()}</p>
            <p>{user.email}</p>
            <Button
                name="btnEditProfile"
                className="btnBlue"
                text="Editar perfil"
                onClick={() => navigate("/perfil")}
            />
            <Button
                name="btnLogout"
                className="btnBlue"
                text="Sair"
                onClick={handleLogout}
            />
        </div>
    );
}

export default ProfileModalHeader;