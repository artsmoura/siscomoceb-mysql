import React, { useRef, useState } from 'react';
import { BiChevronDown, BiMenu } from 'react-icons/bi';
import './navbar.css';
import { useOutsideClick } from '../../utils';
import { NavLink } from 'react-router-dom';
import ModalHeader from '../modalHeader/modalHeader';
import { useSelector } from 'react-redux';
import { Box, Button, Collapse, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, HStack, Icon, IconButton, Image, Link, Popover, PopoverContent, PopoverTrigger, Stack, Text, useDisclosure } from '@chakra-ui/react';

const Navbar = (props) => {

    const [modalType, setModalType] = useState('hidden');
    const ref = useRef();

    const user = useSelector((state) => state.authState.user);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [placement, setPlacement] = useState('right');

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

    const handleClickClose = (e) => {
        e.preventDefault();
        onClose();
    };

    useOutsideClick(ref, () => setModalType('hidden'));

    const menuItens = [
        {
            label: 'Evento',
            subitens: [
                {
                    label: 'Eventos',
                    href: '#'
                },
                {
                    label: 'Tipo Inscrição',
                    href: '#'
                },
                {
                    label: 'Gerenciar Doc. Financeira',
                    href: '#'
                },
                {
                    label: 'Gerenciar Inscrição',
                    href: '#'
                }
            ]
        },
        {
            label: 'Inscrição',
            subitens: [
                {
                    label: 'Acompanhar Inscrição',
                    href: '#'
                }
            ]
        },
        {
            label: 'Adminitração',
            subitens: [
                {
                    label: 'Usuário',
                    href: '#'
                },
                {
                    label: 'Logs',
                    href: '#'
                },
                {
                    label: 'Femoces',
                    href: '#'
                },
                {
                    label: 'Cidades',
                    href: '#'
                },
                {
                    label: 'Igrejas',
                    href: '#'
                },
                {
                    label: 'Lider',
                    href: '#'
                }
            ]
        },
        {
            label: 'Relatórios',
            subitens: [
                {
                    label: 'Inscrições',
                    href: '#'
                },
                {
                    label: 'Estimativa de Receita',
                    href: '#'
                },
                {
                    label: 'Lista de Membros',
                    href: '#'
                },
                {
                    label: 'Lista de Emails',
                    href: '#'
                },
            ]
        }
    ];

    return (
        <Box w='100%' h='48px' bg='white' boxShadow='0px 3px 6px #00000029' align='center'>
            {
                props.screenSize >= 974 ?
                    <Stack
                        direction='row'
                        justify={'space-between'}
                        spacing={4}
                        maxW={'1272px'}
                        mt='4px'
                    >
                        <HStack spacing={4}>
                            <Box>
                                <NavLink to={'/'}>
                                    <Image
                                        src='img/comocebLogo.png'
                                        alt='logo comoceb'
                                        w='35px'
                                    />
                                </NavLink>
                            </Box>
                            {menuItens.map(item => (
                                <Box key={item.label}>
                                    <Popover trigger='hover' placement='bottom-start'>
                                        <PopoverTrigger >
                                            <Text _hover={{ color: 'black' }}>
                                                {item.label}
                                            </Text>
                                        </PopoverTrigger>
                                        <PopoverContent maxW={'230px'} boxShadow={'xl'}>
                                            <Stack>
                                                {item.subitens.map(subitem => (
                                                    <DesktopSubNav key={subitem.label} {...subitem} />
                                                ))}
                                            </Stack>
                                        </PopoverContent>
                                    </Popover>
                                </Box>
                            ))
                            }
                        </HStack>
                        <Box w={'fit-content'}>
                            <Button
                                as={IconButton}
                                icon={<Image src="img/avatar.png" w='35px' alt='perfil' />}
                                bg={'transparent'}
                                _hover={{
                                    border: '3px solid rgba(0, 0, 0, 0.158)',
                                    borderRadius: '50%',
                                }}
                                borderRadius='50%'
                                padding='0!important'
                                onClick={() => openNavModal('modalProfile')}
                            />
                        </Box>
                        <ModalHeader ref={ref} type={modalType} user={user} />
                    </Stack >
                    :
                    <Stack align='flex-start' bg='white'>
                        <Button
                            ref={ref}
                            colorScheme='teal'
                            onClick={onOpen}
                            as={IconButton}
                            aria-label='Options'
                            icon={<BiMenu />}
                            variant='ghost'
                            w='50px'
                        >
                        </Button>
                        <Drawer
                            isOpen={isOpen}
                            placement='left'
                            onClose={onClose}
                        >
                            <DrawerOverlay />
                            <DrawerContent>
                                <DrawerCloseButton />
                                <DrawerHeader borderBottomWidth='1px'>
                                    Menu
                                </DrawerHeader>
                                <DrawerBody>
                                    <Stack w={'100%'} p={4}>
                                        {menuItens.map(item => (
                                            <MobileSubNav key={item.label} {...item} close={onClose} />
                                        ))}
                                    </Stack>
                                </DrawerBody>
                            </DrawerContent>
                        </Drawer>
                    </Stack>
            }
        </Box >
    );
};

export default Navbar;

const DesktopSubNav = ({ label, href }) => {
    return (
        <Link
            href={href}
            role={'group'}
            display={'block'}
            p={2}
            rounded={'md'}
            _hover={{ bg: 'rgb(230, 230, 230)' }}>
            <Stack direction={'row'} align={'center'}>
                <Box>
                    <Text
                        transition={'all .3s ease'}
                        fontWeight={500}>
                        {label}
                    </Text>
                </Box>
            </Stack>
        </Link>
    );
};

const MobileSubNav = (({ label, subitens, href, close }) => {

    const { isOpen, onToggle } = useDisclosure();

    return (
        <Stack onClick={subitens && onToggle}>
            <Flex justify={'space-between'} align={'center'}>
                <Text>
                    {label}
                </Text>
                <Icon
                    as={BiChevronDown}
                    transition={'all .25s ease-in-out'}
                    transform={isOpen ? 'rotate(180deg)' : ''}
                    w={6}
                    h={6}
                />
            </Flex>
            <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
                <Stack
                    mt={2}
                    pl={4}
                    borderStyle={'solid'}
                    borderColor={'gray.200'}
                    align={'start'}>
                    {
                        subitens.map((subitem) => (
                            <Link key={subitem.label} py={2} href={subitem.href} onClick={close}>
                                {subitem.label}
                            </Link>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    );
});