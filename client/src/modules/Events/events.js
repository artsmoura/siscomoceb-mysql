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
import { Box, Center, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';

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
    }, []);

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
        <Flex flexDirection={'column'} gap='2' maxW={'1272px'}>
            <Heading>
                {user.bln_sexo === 0 ? "Bem vinda, " : "Bem vindo, "}{name[0]}
            </Heading>
            <Text fontSize='xl'>Próximos Eventos</Text>
            <Center flexWrap={'wrap'}>
                {
                    events.map((event) => (
                        <Card
                            keyUnique={event.idEvento}
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
            </Center>
            <div className='addEvent'>
                <Button
                    name="addEvent"
                    className='addBtn'
                    icon={<BiPlus color='white' size={"2.5em"} />}
                    onClick={goCreateEvent}
                />
            </div>;
            {modal(modalType)}
        </Flex >
    );
};

export default EventPage;