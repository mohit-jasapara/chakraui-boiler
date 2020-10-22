import React, { useEffect } from "react";
import { Text, Heading, Stack, useTheme, Box, Button, useToast, Flex, Input, Image } from "@chakra-ui/core";
import { useHistory } from "react-router-dom";
import { useLoginMutation } from "../../lib/graphql/user/Queries";
import { useAppContext } from "../../App/Context";
import '../../custom.css'
import { useFormik } from "formik";

const LoginRoute = (props) => {
  const theme = useTheme();
  const history = useHistory();
  const [login, { data, loading, error }] = useLoginMutation();
  
  const _login = (values) => {
    login({ variables: { data: values } });
  };

  const {setAuthenticated} = useAppContext()

  const toast = useToast()
  useEffect(()=> {
    if(error){
      toast({
      status:'error',
      title:"Error login",
      description:'You are not authorized - '+error.message
    })
    }
  },[error, toast])

  useEffect(() => {
    if (data) {
      setAuthenticated(true)
      localStorage.setItem("@login", data.login.access_token)

      history.push("/");

      toast({
      status:'success',
      title:"Login success",
      description:'You are successfully loggedIn'
    })
    }
  }, [data, history, setAuthenticated, toast]);

  return (
    <Flex w={"100%"} h={"100vh"} className='' bg='white' >
      <Flex h="100vh" w={["100%", "100%", '50%']} className='' align='center' direction='column'>  
          <LoginForm login={_login} loading={loading}/>
      </Flex>
      <Flex h="100vh" w={[0, 0, '50%']} bg='#e6f2ff' justifyContent='center'>
        <Box>
          <Image src='/images/login.jpg'/>
        </Box>
      </Flex>
    
      {/* <Stack>
        <Heading color="white">Welcome</Heading>
        <Heading fontSize={theme.fontSizes["4xl"]} color="gray.300">
          Login to continue
        </Heading>
      </Stack>

      <Button
        onClick={_login}
        mt={theme.sizes[40]}
        rightIcon={<ArrowForwardIcon />}
      >
        LOGIN
      </Button>
      {
        loading ? 
        <Spinner/> : null
      } */}
    </Flex>
    
  );
};

const LoginForm = props => {

  const {handleChange, values, handleSubmit} = useFormik({
    initialValues:{
      username:'',
      password:''
    },
    onSubmit: values => {
      props.login(values)
    },
  });

  return(
     <Box textAlign="center" pt='60px' minW='50%'>
      <Image src="/images/nims_hostel_management_logo.png" d='inline-block' w='300px' alt="Segun Adebayo" /><br/>
      {/* <Image src="/images/hostel-management-logo.png" mt='15px' d='inline-block' w='180px' alt="Segun Adebayo" /><br/> */}
      
      {/* <Heading as="h4" size="md">NIMS</Heading>
      <Text>Hostel Management</Text> */}
      <Heading as="h4" mt='50px' size="lg">Login</Heading>
      <br/>
      <form onSubmit={handleSubmit}>
        <Stack>
          <Input value={values.username} className='' bg='white' required size='lg' mb='4' onChange={handleChange} name='username' placeholder="Username" />
          <Input onChange={handleChange} className='' bg='white' required size='lg' mb='4' value={values.password} name='password' type='password' placeholder="Password" />
          <Button isLoading={props.loading} className='inputShadow' loadingText='Loging in...' colorScheme="blue" type='submit'>Login</Button>
        </Stack>
      </form>
    </Box>  
  )
}

export default LoginRoute;
