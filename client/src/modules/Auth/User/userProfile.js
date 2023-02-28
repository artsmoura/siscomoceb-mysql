import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button/button';
import Input from '../../../components/Input/input';
import Selectbox from '../../../components/Selectbox/selectbox';
import { consultCEP, getUser, listCity, listState, updateUserData } from '../redux/authAction';
import File64 from '../../../components/File64/file64';
import { BiCamera } from 'react-icons/bi';
import './user.css';

const UserProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authState = useSelector((state) => state.authState.user);
    const user = useSelector((state) => state.authState.userData);

    useEffect(() => {
        dispatch(getUser(authState.cod_usuario));
    }, []);

    const handleSelect = (e) => {
        dispatch(updateUserData({
            ...e,
            value: e.target.value.value
        }));
    };

    const option = [
        {
            id: 1,
            name: 'Masculino',
            value: 'masculino'
        },
        {
            id: 0,
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

    return (
        <div className="container">
            <div className="boxForm">
                <h2>Editar Perfil</h2>
                <form>
                    <Input
                        type="text"
                        name="txt_nome_completo"
                        label="Nome Completo"
                        onChange={(e) => dispatch(updateUserData(e))}
                        value={user.txt_nome_completo}
                        className="formInput"
                    />
                    <Input
                        type="text"
                        name="email"
                        label="Email"
                        onChange={(e) => dispatch(updateUserData(e))}
                        value={authState.txt_email_usuario}
                        className="formInput"
                    />
                    <Input
                        type="text"
                        name="txt_cpf"
                        label="CPF"
                        onChange={(e) => dispatch(updateUserData(e))}
                        value={user.txt_cpf}
                        className="formInput"
                    />
                    <Input
                        type="date"
                        name="dte_nascimento"
                        label="Data Nascimento"
                        onChange={(e) => dispatch(updateUserData(e))}
                        value={user.dte_nascimento}
                        className="formInput"
                    />
                    <div className='boxRow-2'>
                        <Selectbox
                            selected={user.bln_sexo}
                            action={handleSelect}
                            name="bln_sexo"
                            label="Sexo"
                            options={{
                                option: option
                            }}
                        />
                        <Selectbox
                            selected={user.dsc_estado_civil}
                            action={handleSelect}
                            name="dsc_estado_civil"
                            label="Estado Civil"
                            options={{
                                option: option2
                            }}
                        />
                    </div>
                    <Input
                        type="text"
                        name="txt_celular"
                        label="Celular"
                        onChange={(e) => dispatch(updateUserData(e))}
                        value={user.txt_celular}
                        className="formInput"
                    />
                    <Input
                        type="text"
                        name="cep"
                        label="CEP"
                        onChange={(e) => dispatch(updateUserData(e))}
                        value={user.cep}
                        className="formInput"
                        inputOut={() => dispatch(consultCEP(user.cep))}
                    />
                    <Input
                        type="text"
                        name="address"
                        label="Endereço"
                        onChange={(e) => dispatch(updateUserData(e))}
                        value={user.address}
                        className="formInput"
                    />
                    <div className='boxRow-2'>
                        <Input
                            type="text"
                            name="city"
                            label="Cidade"
                            onChange={(e) => dispatch(updateUserData(e))}
                            value={user.city}
                            className="formInput"
                        />
                        <Input
                            type="text"
                            name="state"
                            label="Estado"
                            onChange={(e) => dispatch(updateUserData(e))}
                            value={user.state}
                            className="formInput"
                        />
                    </div>

                    <File64
                        label={<BiCamera />}
                        className={'inputFileProfile'}
                        action={updateUserData}
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