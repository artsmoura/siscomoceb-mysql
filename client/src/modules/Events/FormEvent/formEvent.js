import React, { useEffect, useState } from "react";
import Button from "../../../components/Button/button";
import Input from "../../../components/Input/input";
import FileBase from 'react-file-base64';
import './formEvent.css';
import { useDispatch, useSelector } from 'react-redux';
import { clearFormInput, createEvent, updateAccommodation, updateContentEvent } from "../redux/eventsAction";
import Checkbox from "../../../components/Checkbox/checkbox";
import { useNavigate } from "react-router-dom";
import File64 from "../../../components/File64/file64";

const FormEvent = () => {

    const event = useSelector((state) => state.eventState.event);
    const [cancelButton, setCancelButton] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createEvent(event));
    };

    useEffect(() => {
        if (cancelButton === true) {
            navigate(-1) || navigate('/');
        }
    }, [cancelButton]);

    const handleCancelClick = () => {
        dispatch(clearFormInput());
        setCancelButton(true);
    };

    return (
        <div className="container">
            <div className="boxForm">
                <h2>Criar Evento</h2>
                <form>
                    <Input
                        type="text"
                        name="nomeEvento"
                        label="Nome do Evento"
                        onChange={(e) => dispatch(updateContentEvent(e))}
                        value={event.nomeEvento}
                        isRequired={true}
                        className="formInput"
                    />
                    <Input
                        type="text"
                        name="descricaoEvento"
                        label="Descrição do Evento"
                        onChange={(e) => dispatch(updateContentEvent(e))}
                        value={event.descricaoEvento}
                        isRequired={true}
                        className="formInput"
                    />
                    <div className="dateRow">
                        <Input
                            type="date"
                            name="dataHoraInicio"
                            label="Data de início do Evento"
                            onChange={(e) => dispatch(updateContentEvent(e))}
                            value={event.dataHoraInicio}
                            isRequired={true}
                            className="formInput"
                        />
                        <Input
                            type="date"
                            name="dataHoraFim"
                            label="Data final do Evento"
                            onChange={(e) => dispatch(updateContentEvent(e))}
                            value={event.dataHoraFim}
                            isRequired={true}
                            className="formInput"
                        />
                    </div>
                    <div className="dateRow">
                        <Input
                            type="date"
                            name="dataHoraInicioInscricao"
                            label="Data de início das inscrições"
                            onChange={(e) => dispatch(updateContentEvent(e))}
                            value={event.dataHoraInicioInscricao}
                            isRequired={true}
                            className="formInput"
                        />
                        <Input
                            type="date"
                            name="dataHoraFimInscricao"
                            label="Data final das inscrições"
                            onChange={(e) => dispatch(updateContentEvent(e))}
                            value={event.dataHoraFimInscricao}
                            isRequired={true}
                            className="formInput"
                        />
                    </div>
                    <Input
                        type="text"
                        name="localEvento"
                        label="Local do Evento"
                        onChange={(e) => dispatch(updateContentEvent(e))}
                        value={event.localEvento}
                        isRequired={true}
                        className="formInput"
                    />
                    {/* {
                        event.accommodation.map((accommodation) => {
                            return (
                                <div className="accommodationBox">
                                    <Checkbox
                                        text={accommodation.name}
                                        name={accommodation.name}
                                        value={accommodation.name}
                                        keyIndex={accommodation.name}
                                        checked={accommodation.checked}
                                        onChange={(e) => dispatch(updateContentEvent(e))}
                                    />
                                    <Input
                                        type="text"
                                        name={`valor ${accommodation.name}`}
                                        label="Valor"
                                        onChange={(e) => dispatch(updateAccommodation(e))}
                                        value={accommodation.valor}
                                        isRequired={true}
                                        className="formInput"
                                        disabled={accommodation.checked === true ? false : true}
                                    />
                                </div>
                            );
                        })
                    } */}

                    <div className="inputFile">
                        <File64
                            label={'Capa do Evento'}
                            className={'inputFileBtn'}
                            action={updateContentEvent}
                            alt={'imagem evento'}
                        />
                    </div>
                </form>
                <div className="btnBox">
                    <Button
                        type="submit"
                        name="btnForm"
                        className="btnSilver"
                        text="Cancelar"
                        onClick={() => handleCancelClick()}
                    />
                    <Button
                        type="submit"
                        name="btnForm"
                        className="btnBlue"
                        text="Criar"
                        onClick={handleSubmit}
                    />
                </div>
            </div>
        </div>
    );
};



export default FormEvent;