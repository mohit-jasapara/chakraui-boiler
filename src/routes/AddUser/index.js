import { Box, Button, Flex, Heading, Image, Input, Select, Stack, Text, TabList, Tabs, TabPanels, TabPanel, Spinner } from '@chakra-ui/core'
import React, { useState, useEffect, useCallback } from 'react'
import _ from 'lodash'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { tabListStyles, CustomTab } from '../../Components/CustomTab';
import CustomDatePicker from '../../Components/CustomDatePicker'
import { useAddStaffQuery, useAddStudentQuery, useGetUserQuery } from '../../lib/graphql/user/Queries';
import { useRecoilValue } from 'recoil';
import { allCoursesRecoilSelector, departmentsRecoilSelector } from '../../atoms/user.atoms';
import { useHistory, useParams } from "react-router-dom";

import ReactSelect from 'react-select'
import LoadingView from '../../Components/LoadingView';
import { toServerDate } from '../../utils/datehelper';

let formData = {
    universityId: '', contact: '', contact2: '', fatherName: '', fatherContact: '', motherName: '', motherContact: '', gender: '',dob: '',
    name: '', address: '', city: '', state: '', aadhar: '', religion: '', category: '', nationality: '', email: '', pin:'', country:'', batchId:'',
}

const AddUser = props => {
    const [selectedUser, selectUser] = useState('student')
    const [dob, setDob] = useState('')
    const [formObject, setFormObject] = useState(formData)
    const [prevDepartment, setPrevDepartment] = useState(formData)

    const courses = useRecoilValue(allCoursesRecoilSelector);
    const [prevBatch, setPrevBatch] = useState()

    const [addStudent, {data:studentData, loading:studentLoading, error: studentError}] = useAddStudentQuery()
    const [addStaff, {data:staffData, loading:staffLoading, error:staffError}] = useAddStaffQuery()
    const [getUser, { data:userData, loading:getUserLoading }] = useGetUserQuery({

        onError: () => {

        },
        onCompleted:(userData)=> {

            let user = userData?.user
            if(user){
                const {contact, contact2, fatherName, fatherContact, staff, student, motherName, motherContact, gender,dob,name, address, city, state, aadhar, religion, category, nationality, email, pin, country} = userData.user

                let course 
                let batch  
                if(student){
                    batch= student.batch
                    course = student.batch?.course
                    if(course){
                        course = _.find(courses.courses, c=> c.id === course.id )                                                
                        batch = course && _.find(course.batches, b=> b.id === batch.id)
                        setPrevBatch({batch,course})
                    }
                    selectUser('student')
                }
                if(staff){
                    setPrevDepartment(staff.department)
                    selectUser('staff')
                }

                setFormObject({contact, contact2, fatherName, fatherContact, motherName, motherContact, gender,dob,name, address, city, state, aadhar, religion, category, nationality, email, pin, country,
                    batchId:student?.batch?.id, eid:staff?.eid, 
                    section:student?.section,
                    department:staff?.department?.id, universityId:student?.universityId,
                    designation:staff?.designation,
                })     
                
                
            }
        }

    });
    
    const history = useHistory()

    const _getUser = useCallback(
        (values) => {getUser({ variables: values })},
        [getUser]
    )
    let params = useParams()

    useEffect(() => {
        if(params.id){
            _getUser({id:params.id})
        }
    }, [_getUser, params.id])

    const SignupSchema = Yup.object().shape({
        // email: Yup.string().email('invalid email'),
    });

    const loading = studentLoading || staffLoading 
    const error = studentError || staffError

    useEffect(()=> {
        if(error){
            alert("error adding user, "+ error.message)
        }
    },[error])


    useEffect(() => {
        if(studentData || staffData){
            let userid = studentData?.addStudent?.userId  || staffData?.addStaff?.userId
            userid && history.push("add/user/"+userid);

        }
    },[studentData, staffData, history])


    const _selectUser = user => {
        selectUser(user)
    }

    const addUser = data => {
        let finalData =  selectedUser === 'student' ?  _.omit(data, ['eid', 'departmentId', 'designation']):_.omit(data, ['universityId', 'batchId', 'section'])
        if(selectedUser === 'student'){
            addStudent(({ variables: { data: _.pickBy(finalData,d => d)} }))
        }
        else{
            addStaff(({ variables: { data: _.pickBy(finalData,d => d)} }))
        }

    }

    console.log('params', history)
    return(
        <Box bg='white' h='100%' p={6} width='100%' key={history.location.pathName}>
            <Heading size='lg'>Add New User</Heading>
            <br/><hr/><br/>
            <Formik
                enableReinitialize
                initialValues={formObject}
                validationSchema={SignupSchema}
                onSubmit={addUser}
            >
                {({ errors, touched, setFieldValue, values, finalValues }) => {
                    return  getUserLoading ? <Spinner /> : (
                        <Form key='myform'>
                            <Head title='Personal Information'/>
                            {/* <AddPhoto/> */}
                            <Flex flexWrap='wrap' px={3} flexDirection='row'>
                                <InputBox name='name' required title='Name'  validate={{errors, touched}} />
                                <InputBox name='email' type='email' title='Email Id'  validate={{errors, touched}} />
                                <InputBox name='contact' title='Mobile Number' type='number' validate={{errors, touched}} />
                                <InputBox name='contact2' title='Alternate Mobile Number' type='number' validate={{errors, touched}} />
                                <Flex w={["100%","40%","30%"]} mr={6} my={2}>
                                    <Box w='100%'>
                                        <Text paddingLeft={1} mb={1} fontSize='14px' color='#34495E'>DATE OF BIRTH </Text>
                                        <CustomDatePicker
                                            name='dob'
                                            value={dob}
                                            placeholder='DOB (dd/mm/yyyy)'
                                            onChange={date => {
                                                setFieldValue('dob', toServerDate(date))
                                                setDob(date)}}
                                        />
                                    </Box>
                                </Flex>
                                <Flex w={["100%","40%","30%"]} mr={6} my={2}>
                                    <Box w='100%' key='gender'>
                                        <Text paddingLeft={1} mb={1} fontSize='14px' color='#34495E'>GENDER <span style={{color:'red'}}>*</span></Text>
                                        <Select key="gender" name='gender' value={values.gender} onChange={v=> setFieldValue("gender", v.target.value)}  placeholder="Gender">
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </Select>
                                    </Box>
                                </Flex>
                                <InputBox title='Religion' name='religion' validate={{errors, touched}} />
                                <InputBox title='Category' name='category' validate={{errors, touched}} />
                                <InputBox title='Nationality' name='nationality' validate={{errors, touched}} />
                            </Flex>
                            <br/>

                            <Head title='Address'/>
                            <Flex flexWrap='wrap' px={3} flexDirection='row'>
                                <Flex w="61.5%" mr={6} my={2}>
                                    <Box w='100%'>
                                        <Text paddingLeft={1} mb={1} fontSize='sm' color='#34495E'>ADDRESS <span style={{color:'red'}}>*</span></Text>
                                        <Field autoComplete={false} style={{borderColor:!_.isEmpty(errors) && 'address' in errors ? 'red' : ''}} className='customInputField' name='address' required placeholder='Address'/>
                                    </Box>
                                </Flex>
                                <InputBox title='City' name='city' validate={{errors, touched}} />
                                <InputBox title='State' name='state' validate={{errors, touched}} />
                                <InputBox title='Pin' type='number' name='pin' validate={{errors, touched}} />
                                <InputBox title='Country' name='country' validate={{errors, touched}} />
                            </Flex>
                            <br/>

                            <Head title='Guardians'/>
                            <Flex flexWrap='wrap' px={3} flexDirection='row'>
                                <InputBox title='Father Name' name='fatherName' validate={{errors, touched}} />
                                <InputBox title='Father Contact' type='number' name='fatherContact' validate={{errors, touched}} />
                            </Flex>
                            <Flex flexWrap='wrap' px={3} flexDirection='row'>
                                <InputBox title='Mother Name' name='motherName' validate={{errors, touched}} />
                                <InputBox title='Mother Contact' type='number' name='motherContact' validate={{errors, touched}} />
                            </Flex>
                            <br/>

                            {params.id ? null : 
                                <Flex w='100%' mt={10}>
                                    <UserButtons selectedUser={selectedUser} selectUser={_selectUser}/>
                                </Flex>
                            }
                            {selectedUser === 'staff' ? 
                                <Flex key='staff' flexWrap='wrap' px={3} flexDirection='row'>
                                    <InputBox title='Staff Id' name='eid' validate={{errors, touched}} />
                                    <DepartmentInput setFieldValue={setFieldValue} prevDepartment={prevDepartment}/>
                                    <InputBox title='Designation' name='designation' validate={{errors, touched}} />
                                </Flex>
                                :
                                <Flex key='student' flexWrap='wrap' px={3} flexDirection='row'>
                                    <InputBox name='universityId' title='University Id'  validate={{errors, touched}} />                                    
                                    <CourseBatchInput setFieldValue={setFieldValue} prevBatch={prevBatch}/>
                                    <InputBox title='Section' name='section' validate={{errors, touched}} />
                                </Flex>
                            }

                            <Button ml={3} isLoading={ studentLoading || staffLoading} type='submit' w={['100%', '20%', '30%', '10%']} colorScheme="blue" mb={1} mt={5}>Add</Button>
                        </Form>
                    )}
                }
            </Formik>
            <br/>

            {
                loading ? 
                <LoadingView absolute/> : null
            }
        </Box>
    )
} 

const DepartmentInput = ({setFieldValue, prevDepartment}) => {
    // eslint-disable-next-line no-unused-vars
    const [active, setActive] = useState()
    const departments = useRecoilValue(departmentsRecoilSelector);


    const _setActive = b => {
        setFieldValue("departmentId",b?.id && parseInt(b?.id) )
        setActive(b)
        setActive(b)
    }

    return (
         <Flex w={["100%","40%","30%"]} mr={6} my={2}>
                <Box w='100%'>
                    <Text paddingLeft={1} mb={1} fontSize='14px' color='#34495E'>Department <span style={{color:'red'}}>*</span></Text>
                    <ReactSelect
                        value={active || prevDepartment || null}
                        onChange={_setActive}
                        options={departments.departments}
                        getOptionLabel={c=> c.name}
                        getOptionValue={c=> c}
                    />                                      
                </Box>
            </Flex>
    )

}

const CourseBatchInput = ({setFieldValue, prevBatch }) => {

    const courses = useRecoilValue(allCoursesRecoilSelector);
    
    const [activeCourse, setActiveCourse] = useState()
    const [activeBatch, setActiveBatch] = useState()
    
    const setActive = c => {
        setActiveCourse(c)
        _setActiveBatch()
    }   

    const _setActiveBatch = b => {
        setFieldValue("batchId",b?.id && parseInt(b?.id) )
        setActiveBatch(b)
    }


    return (
        <>
            <Flex w={["100%","40%","30%"]} mr={6} my={2}>
                <Box w='100%'>
                    <Text paddingLeft={1} mb={1} fontSize='14px' color='#34495E'>Course <span style={{color:'red'}}>*</span></Text>
                    <ReactSelect
                        value={activeCourse || prevBatch?.course}
                        onChange={setActive}
                        options={courses.courses}
                        getOptionLabel={c=> c.name}
                        getOptionValue={c=> c}
                    />                                      
                </Box>
            </Flex>
            <Flex w={["100%","40%","30%"]} mr={6} my={2}>
                <Box w='100%'>
                    <Text paddingLeft={1} mb={1} fontSize='14px' color='#34495E'>Batch <span style={{color:'red'}}>*</span></Text>
                    <ReactSelect   
                    value={activeBatch || (!activeCourse && prevBatch?.batch) ||  null}  
                    hasValue={activeBatch ? true :false} 
                    onChange={_setActiveBatch}                                            
                    options={activeCourse?.batches}
                    getOptionLabel={b=> b.name}
                    getOptionValue={b=> b.id}
                    />                                    
                </Box>
            </Flex>
        </>

                                
    )
}

const Head = ({title} ) => {
    return(
        <Box w='100%' p={2}>
            <Heading size='md' color='accent'>{title}</Heading>
        </Box>
    )
} 

const UserButtons = ({user, selectUser, selectedUser}) => {
    const [tabIndex, setTabIndex] = React.useState(selectedUser === 'student' ? 0 : 1);
    
    useEffect(() => {
        setTabIndex(selectedUser === 'student' ? 0 : 1)
    }, [selectedUser])
    
    const handleTabsChange = (index) => {
      setTabIndex(index);
      if(index === 1){
          selectUser("staff")
      }else{
          selectUser('student')
      }
    };

    return(
        <Tabs index={tabIndex} onChange={handleTabsChange}>
            <TabList
                my={1}
                sx={tabListStyles}
            >
            <CustomTab>Student</CustomTab>
            <CustomTab>Staff</CustomTab>
            </TabList>
            <TabPanels>
                <TabPanel></TabPanel>
                <TabPanel></TabPanel>
            </TabPanels>
        </Tabs>

    )
}

// eslint-disable-next-line no-unused-vars
const AddPhoto = props => {
    return(
        <Stack direction="row" spacing={4} w={["100%"]} mr={6} my={2}>
            <Image
                border='1px solid #D6DBDF'
                boxSize="110px"
                objectFit="cover"
                src="https://joeschmoe.io/api/v1/random"
                alt="Segun Adebayo"
            />
            <Flex alignItems='center'>
                <Button colorScheme="teal" variant="outline">Upload New Picture</Button>
                <Button color="#C67574" borderColor='#FFCDCD' bg='#FFEFEF' ml='2' variant="outline">Remove</Button>
            </Flex>
        </Stack>
    )
}

const InputBox = React.memo(({title, type, placeholder, name, required, validate}) => {
    return(
        <Flex w={["100%","40%","30%"]} mr={6} my={2}>
            <Box w='100%'>
                <Text paddingLeft={1} mb={1} fontSize='14px' color='#34495E'>{_.toUpper(title)} {required ? <span style={{color:'red'}}>*</span> : null}</Text>
                <Field autoComplete={false} style={{borderColor:!_.isEmpty(validate.errors) && name in validate.errors ? 'red' : ''}} className='customInputField' name={name} required={required} type={type} placeholder={placeholder || title}/>
                {validate.errors?.[name] && validate.touched?.[name] ? (
                    <Text paddingLeft={1} color='red.500' fontSize='xs'>{validate.errors[name]}</Text>
                ) : null}
            </Box>
        </Flex>
    )
})

export default AddUser