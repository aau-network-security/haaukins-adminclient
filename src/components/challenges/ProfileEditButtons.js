import React, { useState } from 'react'
import { deleteProfile, fetchProfiles } from '../../features/profiles/profileSlice'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Flex, IconButton,useToast, } from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';
import ProfileDialogDelete from './ProfileDialogDelete';
function ProfileEditButtons() {  
    const dispatch = useDispatch();
    const toast = useToast()
    const toastIdRef = React.useRef()
    
    const selectedProfile = useSelector(
        (state) => state.profile.selectedProfile
    );

    const [isAlertOpen, setIsAlertOpen] = useState(false)
    const onAlertClose = () => setIsAlertOpen(false)
    const cancelRef = React.useRef()

    const [profileNameState, setProfileNameState] = useState(selectedProfile.name)

      
    const doDeleteProfile = async (profileName) => {
        let request = {
            name: profileName.toLowerCase()
        }
        try {
            const response = await dispatch(deleteProfile(request)).unwrap()
            toastIdRef.current = toast({
              title: 'Profile successfully deleted',
              description: "The delete profile request was successfully processed",
              status: 'success',
              duration: 5000,
              isClosable: true,
            })
            dispatch(fetchProfiles())
        } catch(err) {
            console.log("Got error deleting profile", err)
            toastIdRef.current = toast({
              title: 'Error deleting profile',
              description: err.apiError.status,
              status: 'error',
              duration: 5000,
              isClosable: true,
            })
        }
      
        }
    const openAlertDialog = (profileName) => {
        setProfileNameState(profileName)
        // setIndexState(index)
        setIsAlertOpen(true)
        }

    
    
  return (
    <>
    
    <Flex
        width={"100%"}
        marginTop="20px"
        justifyContent={"center"}
    >
            <Button
                colorScheme="aau.buttonRed"
                color="white"
                onClick={() => openAlertDialog(selectedProfile.name)}         
                marginRight="30px"         
            >
                Delete Profile
            </Button>
        
            <Button
                colorScheme="aau.button"
                color="white"
                // type="submit"
                // onClick={() => openAlertDialog(selectedProfile.name)}                  
            >
                Edit Profile
            </Button>
    </Flex>
             <ProfileDialogDelete 
                    profileName={profileNameState}
                    isOpen={isAlertOpen}
                    onClose={onAlertClose}
                    cancelRef={cancelRef}
                    deleteProfile={doDeleteProfile}
            ></ProfileDialogDelete>
    </>
    
  )
}

export default ProfileEditButtons