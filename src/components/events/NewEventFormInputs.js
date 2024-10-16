import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    HStack,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Select,
    Text,
} from "@chakra-ui/react";
import React from "react";
import ReactDatePicker from "react-datepicker";
import { FaCalendar, FaRegQuestionCircle } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { URL_txt } from "../../api/client";

function NewEventFormInputs({ reqData, changeHandler, setReqDataState }) {
    const [searchParams, setSearchParams] = useSearchParams();
    // Disable past dates and times
    const isDateTimeDisabled = (date) => {
    const currentDateTime = new Date();  
    return date > currentDateTime;
    };

    const handleDateChange = (date) => {
    setReqDataState({
        ...reqData,
        ["expectedFinishDate"]:
            date,
    })
    };

    return (
        <Box width="40%">
            <FormControl marginBottom={7} isRequired>
                <FormLabel fontSize="17px" color="aau.primary">
                    Event name (Max: 20)
                </FormLabel>
                <InputGroup>
                    <Input
                        type="text"
                        name="eventName"
                        placeholder="Event name"
                        backgroundColor="#f7fafc"
                        borderColor="#edf3f8"
                        focusBorderColor="#c8dcea"
                        maxLength="20"
                        onChange={(event) => changeHandler(event)}
                    />
                </InputGroup>
            </FormControl>
            <FormControl marginBottom={7} isRequired>
                <FormLabel fontSize="17px" color="aau.primary">
                    Event tag (Max: 15)
                    <Icon
                        color="grey"
                        position="relative"
                        top="-5px"
                        marginLeft={1}
                        as={FaRegQuestionCircle}
                        fontSize="13px"
                        data-tooltip-html={
                            'The tag will will be used to access the event. <br> Your event will be accessible at "https://&ltevent tag&gt.haaukins.dk"'
                        }
                        data-tooltip-place="right"
                        data-tooltip-effect="solid"
                        data-tooltip-id="tooltip-event-tag"
                        data-tooltip-offset={15}
                    />
                </FormLabel>
                <InputGroup>
                    <Input
                        type="text"
                        name="eventTag"
                        placeholder="Event tag"
                        backgroundColor="#f7fafc"
                        borderColor="#edf3f8"
                        focusBorderColor="#c8dcea"
                        maxLength="15"
                        onChange={(event) => changeHandler(event)}
                    />
                </InputGroup>
                <Text color="aau.primary" marginTop="10px">
                    Event will be available at: https://
                    <b>{reqData.tag}</b>.{URL_txt}
                </Text>
            </FormControl>
            <FormControl marginBottom={7}>
                <FormLabel fontSize="17px" color="aau.primary">
                    <HStack>

                    <Text> Secret key</Text>
                    <Text color="gray.500">(Optional)</Text>
                    <Icon
                        color="grey"
                        position="relative"
                        top="-5px"
                        marginLeft={1}
                        as={FaRegQuestionCircle}
                        fontSize="13px"
                        data-tooltip-html={
                            "Participants will have to provide the secret key on event sign up.<br> Leave blank to disable."
                        }
                        data-tooltip-place="right"
                        data-tooltip-effect="solid"
                        data-tooltip-id="tooltip-secret-key"
                        data-tooltip-offset={15}
                    />
                    </HStack>
                </FormLabel>
                <InputGroup>
                    <Input
                        type="text"
                        name="secretKey"
                        placeholder="Secret key"
                        backgroundColor="#f7fafc"
                        borderColor="#edf3f8"
                        focusBorderColor="#c8dcea"
                        maxLength="10"
                        onChange={(event) => changeHandler(event)}
                    />
                </InputGroup>
            </FormControl>
            <Flex width="100%">
                <FormControl marginBottom={7} marginRight="20px">
                    <FormLabel fontSize="17px" color="aau.primary">
                        {searchParams.get("type") === "advanced" ? (
                            <>
                                Max labs
                                <Icon
                                    color="grey"
                                    position="relative"
                                    top="-5px"
                                    marginLeft={1}
                                    as={FaRegQuestionCircle}
                                    fontSize="13px"
                                    data-tooltip-html={
                                        "Maximum amount of labs that can be running at the same time for event. <br> When the maximum number of labs has been reached, <br>users can still register and solve challenges which do not require a lab."
                                    }
                                    data-tooltip-place="right"
                                    data-tooltip-effect="solid"
                                    data-tooltip-id="tooltip-max-labs"
                                    data-tooltip-offset={15}
                                />
                            </>
                        ) : (
                            "Number of participants (incl. yourself)"
                        )}
                    </FormLabel>
                    <InputGroup display="block">
                        <NumberInput
                            min={1}
                            backgroundColor="#f7fafc"
                            borderColor="#edf3f8"
                            focusBorderColor="#c8dcea"
                            onChange={(value) =>
                                setReqDataState({
                                    ...reqData,
                                    ["maxLabs"]: Number(value),
                                })
                            }
                            value={reqData.maxLabs}
                        >
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </InputGroup>
                </FormControl>
                {searchParams.get("type") === "advanced" && (
                    <FormControl marginBottom={7}>
                        <FormLabel fontSize="17px" color="aau.primary">
                            Team size
                            <Icon
                                color="grey"
                                position="relative"
                                top="-5px"
                                marginLeft={1}
                                as={FaRegQuestionCircle}
                                fontSize="13px"
                                data-tooltip-html={
                                    "When team size is greater than 1, each team will have access to the corresponding number of VMs/VPN configs. <br> The team is still operating on the same lab and if a browser lab is chosen they can share files across all of their VMs"
                                }
                                data-tooltip-place="right"
                                data-tooltip-effect="solid"
                                data-tooltip-id="tooltip-team-size"
                                data-tooltip-offset={15}
                            />
                        </FormLabel>
                        <InputGroup display="block">
                            <NumberInput
                                backgroundColor="#f7fafc"
                                borderColor="#edf3f8"
                                focusBorderColor="#c8dcea"
                                onChange={(value) =>
                                    setReqDataState({
                                        ...reqData,
                                        ["teamSize"]: Number(value),
                                    })
                                }
                                value={reqData.teamSize}
                            >
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </InputGroup>
                    </FormControl>
                )}
            </Flex>
            {searchParams.get("type") === "advanced" && (
                <FormControl marginBottom={7}>
                    <FormLabel fontSize="17px" color="aau.primary">
                        Virtual machine
                    </FormLabel>
                    <InputGroup width="100%" display="block">
                        <Select
                            name="vmName"
                            defaultValue={"kali-v1-0-3"}
                            onChange={(event) => changeHandler(event)}
                            backgroundColor="#f7fafc"
                            borderColor="#edf3f8"
                            focusBorderColor="#c8dcea"
                        >
                            {/* TODO get vms available from daemon*/}
                            <option value={"kali-v1-0-3"}>Kali v1.0.3</option>
                            {/*<option value={"kali-v1-0-4"}>Kali v1.0.4</option>*/}
                        </Select>
                    </InputGroup>
                </FormControl>
            )}

            <FormControl marginBottom={7} isRequired>
                <FormLabel fontSize="17px" color="aau.primary">
                    Finish date
                    <Icon
                        color="grey"
                        position="relative"
                        top="-5px"
                        marginLeft={1}
                        as={FaRegQuestionCircle}
                        fontSize="13px"
                        data-tooltip-html={
                            "When this date and time has passed, event will automatically close. <br> You can extend the event duration on the events page"
                        }
                        data-tooltip-place="right"
                        data-tooltip-effect="solid"
                        data-tooltip-id="tooltip-finish-date"
                        data-tooltip-offset={15}
                    />
                </FormLabel>
                <InputGroup zIndex="999">
                    <InputLeftElement 
                        children={<FaCalendar />}
                    />
                    <Input
                        as={ReactDatePicker}
                        type="datetime-local"
                        name="expectedFinishDate"
                        placeholderText="Finish date, click to select"
                        backgroundColor="#f7fafc"
                        borderColor="#edf3f8"
                        focusBorderColor="#c8dcea"
                        maxLength="10"
                        dateFormat="MMMM d, yyyy HH:mm"
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={10}
                        autoComplete={"off"}
                        selected={reqData.expectedFinishDate}
                        onChange={handleDateChange}
                        minDate={new Date()} 
                        filterTime={isDateTimeDisabled}
                    />
                </InputGroup>
            </FormControl>
            {searchParams.get("type") === "advanced" && (
                <FormControl marginBottom={7}>
                    <InputGroup display={"flex"} flexDir={"column"}>
                        <Checkbox
                            isChecked={reqData.dynamicScoring}
                            name="dynamicScoring"
                            onChange={(event) => changeHandler(event)}
                            marginBottom={3}
                        >
                            Enable dynamic scoring
                            <Icon
                                color="grey"
                                position="relative"
                                top="-5px"
                                marginLeft={1}
                                as={FaRegQuestionCircle}
                                fontSize="13px"
                                data-tooltip-html={
                                    "When dynamic scoring is enabled, the score of the challenges change <br> depending on the amount of solves each challenge has."
                                }
                                data-tooltip-place="right"
                                data-tooltip-effect="solid"
                                data-tooltip-id="tooltip-dynamic-scoring"
                                data-tooltip-offset={15}
                            />
                        </Checkbox>
                        {reqData.dynamicScoring && (
                            <Flex>
                                <FormControl marginRight="20px">
                                    <FormLabel fontSize="17px" color="aau.primary">
                                        Max score
                                        <Icon
                                            color="grey"
                                            position="relative"
                                            top="-5px"
                                            marginLeft={1}
                                            as={FaRegQuestionCircle}
                                            fontSize="13px"
                                            data-tooltip-html={
                                                "Max Score: The maximum score a challenge can have."
                                            }
                                            data-tooltip-place="right"
                                            data-tooltip-effect="solid"
                                            data-tooltip-id="tooltip-dynamic-scoring-max"
                                            data-tooltip-offset={15}
                                        />
                                    </FormLabel>
                                    <InputGroup display="block">
                                        <NumberInput
                                            backgroundColor="#f7fafc"
                                            borderColor="#edf3f8"
                                            focusBorderColor="#c8dcea"
                                            onChange={(value) =>
                                                setReqDataState({
                                                    ...reqData,
                                                    ["dynamicMax"]:
                                                        Number(value),
                                                })
                                            }
                                            value={reqData.dynamicMax}
                                        >
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </InputGroup>
                                </FormControl>
                                <FormControl marginRight="20px">
                                    <FormLabel fontSize="17px" color="aau.primary">
                                        Min score
                                        <Icon
                                            color="grey"
                                            position="relative"
                                            top="-5px"
                                            marginLeft={1}
                                            as={FaRegQuestionCircle}
                                            fontSize="13px"
                                            data-tooltip-html={
                                                "Minimum score: Is the minimum score a challenge can give when the solve threshold has been reached"
                                            }
                                            data-tooltip-place="right"
                                            data-tooltip-effect="solid"
                                            data-tooltip-id="tooltip-dynamic-scoring-min"
                                            data-tooltip-offset={15}
                                        />
                                    </FormLabel>
                                    <InputGroup display="block">
                                        <NumberInput
                                            backgroundColor="#f7fafc"
                                            borderColor="#edf3f8"
                                            focusBorderColor="#c8dcea"
                                            onChange={(value) =>
                                                setReqDataState({
                                                    ...reqData,
                                                    ["dynamicMin"]:
                                                        Number(value),
                                                })
                                            }
                                            value={reqData.dynamicMin}
                                        >
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </InputGroup>
                                </FormControl>
                                <FormControl width="150%">
                                    <FormLabel fontSize="17px" color="aau.primary">
                                        Solve Threshold
                                        <Icon
                                            color="grey"
                                            position="relative"
                                            top="-5px"
                                            marginLeft={1}
                                            as={FaRegQuestionCircle}
                                            fontSize="13px"
                                            data-tooltip-html={
                                                "Solve threshold: The number of solves at which the challenge will reach the minimum score."
                                            }
                                            data-tooltip-place="right"
                                            data-tooltip-effect="solid"
                                            data-tooltip-id="tooltip-dynamic-scoring-solve-threshold"
                                            data-tooltip-offset={15}
                                        />
                                    </FormLabel>
                                    <InputGroup display="block">
                                        <NumberInput
                                            backgroundColor="#f7fafc"
                                            borderColor="#edf3f8"
                                            focusBorderColor="#c8dcea"
                                            onChange={(value) =>
                                                setReqDataState({
                                                    ...reqData,
                                                    ["dynamicSolveThreshold"]:
                                                        Number(value),
                                                })
                                            }
                                            value={
                                                reqData.dynamicSolveThreshold
                                            }
                                        >
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </InputGroup>
                                    
                                </FormControl>
                                
                            </Flex>
                        )}
                    </InputGroup>
                </FormControl>
            )}
        </Box>
    );
}

export default NewEventFormInputs;
