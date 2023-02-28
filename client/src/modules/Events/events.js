import React, { useEffect } from 'react';
import Button from '../../components/Button/button';
import Card from '../../components/Cards/cards';
import { BiPlus } from 'react-icons/bi';
import './events.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEvent, editEvent, listEvents, openEvent } from './redux/eventsAction';
import Modal from '../../components/Modal/modal';
import { setTypeModal } from '../../reduxLayout/layoutAction';
import { adjustDate } from '../../utils';

const EventPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const events = useSelector((state) => state.eventState.events);
    const user = useSelector((state) => state.authState.user);
    const modalType = useSelector((state) => state.layoutState.modal);

    const handleDetailsClick = (e) => {
        navigate('/details');
    };

    const goCreateEvent = () => {
        navigate("/criarevento");
    };

    useEffect(() => {
        dispatch(listEvents());
    }, [dispatch]);

    const dropdownActions = [{
        name: "Deletar",
        action: setTypeModal('delete')
    },
    {
        name: "Editar",
        action: editEvent
    }];

    const modal = (e) => {
        switch (e) {
            case 'delete':
                return <Modal />;
            default:
                return;
        }
    };

    const name = user.txt_nome_completo.split(' ');

    return (
        <div className='eventBox'>
            <h1>
                {user.bln_sexo === 0 ? "Bem vinda, " : "Bem vindo, "}{name[0]}
            </h1>
            <h2>Próximos Eventos</h2>
            <div className='eventCard'>
                {
                    events.map((event) => (
                        <Card
                            key={event.id}
                            title={event.nomeEvento}
                            image={event.image}
                            data={adjustDate(event.dataHoraInicio)}
                            location={event.localEvento}
                            clickAction={handleDetailsClick}
                            cardOption={true}
                            actions={dropdownActions}
                            clickCard={() => dispatch(openEvent(event.idEvento))}
                        />
                    ))
                }
            </div>
            <div className='addEvent'>
                <Button
                    name="addEvent"
                    className='addBtn'
                    icon={<BiPlus color='white' size={"2.5em"} />}
                    onClick={goCreateEvent}
                />
            </div>
            {modal(modalType)}
        </div>
    );
};

export default EventPage;