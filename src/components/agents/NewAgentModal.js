import { Alert, AlertDescription, AlertIcon, Button, Center, Checkbox, CheckboxGroup, FormControl, FormLabel, HStack, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, RadioGroup, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Spacer, Spinner, Stack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import LoadingSpin from 'react-loading-spin'
import { useDispatch, useSelector } from 'react-redux'
import { addAgent, deleteAgent } from '../../features/agents/agentSlice'
import { defaultTheme } from '../..'

function NewAgentModal({ isOpen, onClose }) {
    const dispatch = useDispatch()
    const status = useSelector((state) => state.agent.status)
    const [addAgentError, setAddAgentError] = useState('')
    const [reqData, setReqData] = useState ({
        name: '',
        url: '',
        signKey: '',
        authKey: '',
        weight: 1,
        tls: true
    })
    const submitForm = async (e) => {
        e.preventDefault()
        try {
            const response = await dispatch(addAgent(reqData)).unwrap()
            setAddAgentError('')
            closeModal()
        }
        catch (err) {
            console.log(err)
            setAddAgentError(err.apiError.status)
            console.log(!addAgentError.includes("error connecting to new agent"))
        }
        
    }
    const changeHandler = (e) => {
        if (typeof(e) == 'number' ) {
            setReqData({...reqData, ['weight']: e})
            return
        }
        if (e.target.name === 'name'){
            setReqData({...reqData, [e.target.name]: e.target.value.trim()})
        } else if (e.target.name === 'url') {
            setReqData({...reqData, [e.target.name]: e.target.value.trim()})
        } else if (e.target.name === 'signKey') {
            setReqData({...reqData, [e.target.name]: e.target.value.trim()})
        } else if (e.target.name === 'authKey') {
            setReqData({...reqData, [e.target.name]: e.target.value.trim()})
        } else if (e.target.name === 'tls') {
            setReqData({...reqData, [e.target.name]: e.target.checked})
        }
    }
    const closeModal = () => {
        setAddAgentError('')
        onClose()
    }
    return (
    <>
        <Modal onClose={closeModal} isOpen={isOpen} scrollBehavior='inside' size="xl">
        <ModalOverlay />
        <ModalContent minH="450px">
            {status === 'adding'
            ?
            <Center height="100%" width="100%" position="relative">
                <Spinner color="aau.primary" size="" height="100px" width="100px" thickness="5px"/>
            </Center>
            :
            <>
                
                <form onSubmit={submitForm}>
                    <ModalHeader>Add agent</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        
                            <Stack
                            spacing={4}
                            p="1rem"
                            >   
                            {(addAgentError !== '' && !addAgentError.includes("error connecting to new agent"))
                            ?
                                <Alert status='error'>
                                    <AlertIcon />
                                    <AlertDescription>Error adding agent: {addAgentError}</AlertDescription>
                                </Alert>
                            : (addAgentError !== '' && (addAgentError.includes("Invalid Authentication Key")))
                            ?
                                <Alert status='error'>
                                    <AlertIcon />
                                    <AlertDescription>Error adding agent: Invalid authentication key</AlertDescription>
                                </Alert>
                            : (addAgentError !== '' && (addAgentError.includes("signature is invalid")))
                            ?
                                <Alert status='error'>
                                    <AlertIcon />
                                    <AlertDescription>Error adding agent: Invalid signature key</AlertDescription>
                                </Alert>
                            : (addAgentError !== '' && (addAgentError.includes("authentication handshake failed")))
                            ?
                                <Alert status='error'>
                                    <AlertIcon />
                                    <AlertDescription>Error adding agent: Agent does not support TLS</AlertDescription>
                                </Alert>
                            : (addAgentError !== '' && (addAgentError.includes("connection refused")))
                            ?
                                <Alert status='error'>
                                    <AlertIcon />
                                    <AlertDescription>Error adding agent: Connection refused</AlertDescription>
                                </Alert>
                            :
                                null
                            }
                                <HStack spacing='25px'>
                                <FormControl>
                                    <FormLabel>Agent name</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                        />
                                        <Input type="text" name="name" placeholder="Agent name" onChange={changeHandler} />
                                    </InputGroup>
                                </FormControl>
                                <FormControl>
                                <FormLabel>Weight</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement pointerEvents="none"/>                                    
                                        <Slider
                                            flex='1'
                                            focusThumbOnChange={false}
                                            defaultValue={1}
                                            min={1}
                                            max={10}
                                            value={reqData.weight}
                                            onChange={changeHandler}
                                        >
                                            <SliderTrack>
                                                <SliderFilledTrack />
                                            </SliderTrack>
                                            <SliderThumb fontSize='sm' boxSize='32px' children={reqData.weight}/>
                                        </Slider>
                                       
                                    </InputGroup>
                                </FormControl>
                                </HStack>
                                
                                <FormControl>
                                    <FormLabel>Agent url</FormLabel>
                                    <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                    />
                                    <Input type="text" name="url" placeholder="Agent url" onChange={changeHandler} />
                                    </InputGroup>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Agent signkey</FormLabel>
                                    <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                    />
                                    <Input type="text" name="signKey" placeholder="Agent signkey" onChange={changeHandler} />
                                    </InputGroup>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Agent authkey</FormLabel>
                                    <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                    />
                                    <Input type="text" name="authKey" placeholder="Agent authkey" onChange={changeHandler} />
                                    </InputGroup>
                                </FormControl>
                                <FormControl>
                                    <CheckboxGroup >
                                        <Center>
                                            <Checkbox isChecked={reqData.tls} name='tls' onChange={changeHandler}>TLS?</Checkbox>
                                        </Center>
                                    </CheckboxGroup>
                                </FormControl>
                            </Stack>
                    
                    </ModalBody>
                    <ModalFooter>
                    <Button onClick={closeModal}>Close</Button>
                    <Spacer />
                    <Button 
                        type='submit' 
                        colorScheme='aau.button'
                        variant='solid'
                    >Submit</Button>
                    </ModalFooter>
                </form>
            </>
            }
        </ModalContent>
        </Modal>
    </>
    )
}

export default NewAgentModal