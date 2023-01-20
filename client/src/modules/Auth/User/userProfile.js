import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button/button';
import Input from '../../../components/Input/input';
import Selectbox from '../../../components/Selectbox/selectbox';
import { consultCEP, listCity, listState, updateContentAuth } from '../redux/authAction';
import File64 from '../../../components/File64/file64';
import { BiCamera } from 'react-icons/bi';
import './user.css';

const UserProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authState = useSelector((state) => state.authState);
    const user = useSelector((state) => state.authState.user);

    const handleSelect = (e) => {
        dispatch(updateContentAuth({
            ...e,
            value: e.target.value.value
        }));
    };

    const option = [
        {
            name: 'Masculino',
            value: 'masculino'
        },
        {
            name: 'Feminino',
            value: 'feminino'
        }
    ];

    const option2 = [
        {
            id: 1,
            name: "casado"
        },
        {
            id: 2,
            name: "solteiro"
        },
        {
            id: 3,
            name: "divorciado"
        },
        {
            id: 4,
            name: "viuvo"
        }
    ];

    console.log(authState.states.name);

    return (
        <div className="container">
            <div className="boxForm">
                <h2>Editar Perfil</h2>
                <form>
                    <div className='boxRow-2'>
                        <Input
                            type="text"
                            name="name"
                            label="Nome"
                            onChange={(e) => dispatch(updateContentAuth(e))}
                            value={user.name}
                            className="formInput"
                        />
                        <Input
                            type="text"
                            name="sobrenome"
                            label="Sobrenome"
                            onChange={(e) => dispatch(updateContentAuth(e))}
                            value={user.sobrenome}
                            className="formInput"
                        />
                    </div>
                    <Input
                        type="text"
                        name="email"
                        label="Email"
                        onChange={(e) => dispatch(updateContentAuth(e))}
                        value={user.email}
                        className="formInput"
                    />
                    <Input
                        type="text"
                        name="cpf"
                        label="CPF"
                        onChange={(e) => dispatch(updateContentAuth(e))}
                        value={user.cpf}
                        className="formInput"
                    />
                    <Input
                        type="date"
                        name="dateNascimento"
                        label="Data Nascimento"
                        onChange={(e) => dispatch(updateContentAuth(e))}
                        value={user.dateNascimento}
                        className="formInput"
                    />
                    <div className='boxRow-2'>
                        <Selectbox
                            selected={user.sexo}
                            action={handleSelect}
                            name="sexo"
                            label="Sexo"
                            options={{
                                option: option
                            }}
                        />
                        <Selectbox
                            selected={user.civilState}
                            action={handleSelect}
                            name="civilState"
                            label="Estado Civil"
                            options={{
                                option: option2
                            }}
                        />
                    </div>
                    <Input
                        type="text"
                        name="phone"
                        label="Celular"
                        onChange={(e) => dispatch(updateContentAuth(e))}
                        value={user.phone}
                        className="formInput"
                    />
                    <Input
                        type="text"
                        name="cep"
                        label="CEP"
                        onChange={(e) => dispatch(updateContentAuth(e))}
                        value={user.cep}
                        className="formInput"
                        inputOut={() => dispatch(consultCEP(user.cep))}
                    />
                    <Input
                        type="text"
                        name="address"
                        label="Endereço"
                        onChange={(e) => dispatch(updateContentAuth(e))}
                        value={user.address}
                        className="formInput"
                    />
                    <div className='boxRow-2'>
                        <Input
                            type="text"
                            name="city"
                            label="Cidade"
                            onChange={(e) => dispatch(updateContentAuth(e))}
                            value={user.city}
                            className="formInput"
                        />
                        <Input
                            type="text"
                            name="state"
                            label="Estado"
                            onChange={(e) => dispatch(updateContentAuth(e))}
                            value={user.state}
                            className="formInput"
                        />
                    </div>

                    <File64
                        label={<BiCamera />}
                        className={'inputFileProfile'}
                        action={updateContentAuth}
                        alt={'imagem perfil'}
                        text={"Alterar Imagem Perfil"}
                    />
                </form>
                <div className="btnBox">
                    <Button
                        type="submit"
                        name="btnForm"
                        className="btnSilver"
                        text="Cancelar"
                        onClick={() => navigate(-1) || navigate('/')}
                    />
                    <Button
                        type="submit"
                        name="btnForm"
                        className="btnBlue"
                        text="Salvar"
                        onClick={() => ''}
                    />
                </div>
            </div>
        </div>
    );
};

export default UserProfile;