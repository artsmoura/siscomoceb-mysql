import React, { useRef, useState } from 'react';
import { BiChevronDown, BiMenu } from 'react-icons/bi';
import Button from '../Button/button';
import './navbar.css';
import { useOutsideClick } from '../../utils';
import { NavLink } from 'react-router-dom';
import ModalHeader from '../modalHeader/modalHeader';
import { useSelector } from 'react-redux';
import { Box, Stack } from '@chakra-ui/react';

const Navbar = (props) => {

    const [modalType, setModalType] = useState('hidden');
    const ref = useRef();

    const user = useSelector((state) => state.authState.user);

    // useEffect(() => {
    //     const token = user?.token;

    //     // ???? VERIFICAR AQUI PQ NO VIDEO ELE SETA O USER IGUAL O JSON.PARSE DO USER ACIMA
    //     // setUser()
    // }, []);

    const handleClick = (e) => {
        console.log(`CLICOU no ${e.target.name}`);
    };

    const openNavModal = (type) => {
        setModalType(type);
    };

    useOutsideClick(ref, () => setModalType('hidden'));

    return (
        <Stack w='100%' h='48px' bg='white' boxShadow='0px 3px 6px #00000029'>
            {props.screenSize >= 974 ?
                <div className='navbarButtons'>
                    <NavLink to="/">
                        <div className='logoImg'>
                            <img src="img/comocebLogo.png" alt='logo comoceb'></img>
                        </div>
                    </NavLink>

                    <NavLink className="navbarBtn" to="/">
                        <Button
                            name="evento"
                            text="Evento"
                            className="navbarBtn"
                            icon={<BiChevronDown />}
                            onClick={handleClick}
                        />
                    </NavLink>

                    <NavLink className="navbarBtn" to="/inscricao">
                        <Button
                            name="inscricao"
                            text="Inscrição"
                            className="navbarBtn"
                            icon={<BiChevronDown />}
                            onClick={handleClick}
                        />
                    </NavLink>

                    <NavLink className="navbarBtn" to="/administracao">
                        <Button
                            name="administracao"
                            text="Administração"
                            className="navbarBtn"
                            icon={<BiChevronDown />}
                            onClick={handleClick}
                        />

                    </NavLink>

                    <NavLink className="navbarBtn" to="/relatorio">
                        <Button
                            name="relatorio"
                            text="Relatório"
                            className="navbarBtn"
                            icon={<BiChevronDown />}
                            onClick={handleClick}
                        />
                    </NavLink>

                </div>
                :
                <Button
                    name="menu"
                    icon={<BiMenu size={"2em"} />}
                />

            }

            <div className='profileImg' onClick={() => openNavModal('modalProfile')}>
                <img src="img/avatar.png" alt='perfil'></img>
            </div>
            <ModalHeader ref={ref} type={modalType} user={user} />
        </Stack >
    );
};

export default Navbar;