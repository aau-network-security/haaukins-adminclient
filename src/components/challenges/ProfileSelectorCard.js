import {
    Flex,
    Grid,
    GridItem,
    Icon,
    Spacer,
    Text,
} from "@chakra-ui/react";
import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { selectProfile } from "../../features/profiles/profileSlice";

import { GoStop } from "react-icons/go";


function ProfileSelectorCard() {
    const dispatch = useDispatch();
    const profiles = useSelector((state) => state.profile.profiles);
    
    const selectedProfile = useSelector(
        (state) => state.profile.selectedProfile
    );
  
    return (
        <>
         <Grid
            templateColumns="repeat(6, 1fr)"
            gap={4}
            width="100%"
            // marginLeft="20px"
            height="inherit"
            maxH="650px"
            overflowY="auto"
            borderRadius="5px"
        >
            <GridItem
                backgroundColor="#f7fafc"
                height="inherit"
                width="100%"
                marginRight="10px"
                borderRadius="5px"
                overflowY="auto"
                colSpan={6}
                maxH="650px"
            >
        {Object.entries(profiles).map(([key, profile]) => (
            <Flex
                key={key}
                width="100%"
                height="50px"
                padding="0 10px 0 10px"
                alignItems="center"
                
                _hover={{ backgroundColor: "#211a52", color: "#fff" }}
                backgroundColor={
                    selectedProfile.id === profile.id
                        ? "#211a52"
                        : "#f7fafc"
                }
                color={
                    selectedProfile.id === profile.id
                        ? "#fff"
                        : "#211a52"
                }
                onClick={() => dispatch(selectProfile(profile))}
            >
                <Text
                    overflow="hidden"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                    cursor="default"
                >
                    {profile.name}
                </Text>
                <Spacer></Spacer>
                {profile.secret && (
                                        <Icon
                                            color="orange.500"
                                            as={GoStop}
                                            fontSize="16px"
                                            marginRight="3px"
                                            data-tooltip-html={
                                                "Profile is secret"
                                            }
                                            data-tooltip-place="right"
                                            data-tooltip-effect="solid"
                                            data-tooltip-id="tooltip-secret-exercise"
                                            data-tooltip-offset={3}
                                        />
                                    )}
            </Flex>
        ))}
        </GridItem>
        </Grid>
        
        </>
        
        );
}

export default ProfileSelectorCard