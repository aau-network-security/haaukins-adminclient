import { Box, Icon, Text, Flex, Spacer, Button,HStack, Center, FormControl, FormLabel, InputGroup, Input, useEditableControls, IconButton, Editable, EditablePreview, EditableInput, EditableTextarea, useEditableState} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { MdSave } from 'react-icons/md'
import { FiEdit3 } from 'react-icons/fi'
import { selectProfile } from "../../features/profiles/profileSlice";
import { useDispatch, useSelector } from 'react-redux';
import { defaultTheme } from "../..";





function ProfileDescriptionCard() {
    const dispatch = useDispatch();
    const profiles = useSelector((state) => state.profile.profiles);
    const selectedProfile = useSelector(
        (state) => state.profile.selectedProfile
    );

    if (profiles.length === 0) {
        
    } 
    
    
    useEffect(() => {
        if (profiles.length > 0) {
            dispatch(selectProfile(profiles[0]));
        }
    }, [profiles]);

    console.log("profiledescription: ", selectedProfile)
    
    const [fieldValue, setFieldValue] = useState(selectedProfile.description);
    useEffect(() => {
       setFieldValue(selectedProfile.description);
    }, [selectedProfile]);


    function EditableControls() {
        const {
          isEditing,
          getSubmitButtonProps,
          getEditButtonProps
        } = useEditableControls()
        
        return isEditing ?(
            <Flex flexDir="column" h="100%" w="10%" bg="aau.primary"  borderRadius="0px 10px 10px 0px">
            <Center w="100%" h="100%">
            <Button     {...getSubmitButtonProps()}
                        backgroundColor="aau.primary"
                        _hover={{ backgroundColor: "aau.hover" }}
                        color="white"
                        borderRadius="0px 10px 10px 0px"
                        h="100%"
                        
                    >
                    <Icon
                        as={MdSave}
                        fontSize="30px"
                        color="white"
                        />
            </Button>
            </Center>
            
            </Flex>
        ) : (
            <Flex flexDir="column" h="100%" w="10%" bg="aau.primary"  borderRadius="0px 10px 10px 0px">
            {/* <Center w="100%" h="100%"> */}
        <Button         {...getEditButtonProps()}
                        backgroundColor="aau.primary"
                        _hover={{ backgroundColor: "aau.hover" }}
                        color="white"
                        borderRadius="0px 10px 10px 0px"
                        
                        h="100%"
                       
                        
                    >
                    <Icon
                        as={FiEdit3}
                        fontSize="30px"
                        color="white"
                        />
            </Button>
        {/* </Center> */}
            
            </Flex>
        )
    }
    

    const handleSubmit = () => {
        console.log("Submitted Value:", fieldValue)
    }
    const handleFieldChange = (newValue) => {
        setFieldValue(newValue);
    }


    return  (
    <>  
    <Editable
        height="inherit"
        // defaultValue={selectedProfile.description}
        value={fieldValue}
        onSubmit={handleSubmit}
        onChange={handleFieldChange}
        isPreviewFocusable={false}
        className='container'
        padding="0"
        >      
       
        <HStack h="100%" w="100%">
        
        <Flex flexDir="column" h="100%" w="90%" padding="5px 0px 5px 30px">
            <EditablePreview />
            <EditableTextarea style={{ height: "130px" }}/>
            {/* <Text fontSize="15px" > {selectedProfile.description}</Text> */}
        </Flex>
        {/* <Spacer /> */}
        
        <EditableControls style={{ height: "130px" }}/>
   
        </HStack>
        
        </Editable>
        
    </>
  
  )
}

export default ProfileDescriptionCard