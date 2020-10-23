import React, { useEffect, useState } from "react";
import { Heading, Stack, useTheme, Box, Button, useToast, Flex, Input, Image, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverArrow, PopoverCloseButton, PopoverFooter, ButtonGroup } from "@chakra-ui/core";
import { useHistory } from "react-router-dom";
import { useAppContext } from "../../App/Context";
import { useFormik } from "formik";
import { LockIcon } from "@chakra-ui/icons";

const LoginRoute = (props) => {
  const history = useHistory();

  const [loginState, setLoginState] = useState({loading: false, error: null, data: null})
  const {loading, error, data} = loginState;
  
  const _login = (values) => {
    console.log("login click", values);
    setLoginState({loading: true, error: null, data: null});
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
      sessionStorage.setItem("@login", data.login.access_token)

      history.push("/");

      toast({
        status:'success',
        title:"Login success",
        description:'You are successfully loggedIn'
      })
    }
  }, [data, history, setAuthenticated, toast]);

  const cancelRef = React.useRef();
  const setLoginSuccess = () => setLoginState({data: {login: {access_token: true}}, loading: false, error: null })
  const setLoginFailed = () => setLoginState({error: {message: 'Login Failed!'}, data: null, loading: false })

  return (
          <Flex w={"100%"} h={"100vh"} className='' bg='white' >
            <Flex h="100vh" w={["100%", "100%", '50%']} className='' align='center' direction='column'>  
                <LoginForm login={_login} loading={loading}/>

                <Popover
                  returnFocusOnClose={false}
                  isOpen={loading}
                  onClose={setLoginFailed}
                  placement="right"
                  closeOnBlur={false}
                >
                  <PopoverTrigger>
                    {/* <Button variantColor="pink">Popover Target</Button> */}
                    <span></span>
                  </PopoverTrigger>
                  <PopoverContent zIndex={4}>
                    <PopoverHeader fontWeight="semibold">Login Action</PopoverHeader>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverFooter d="flex" justifyContent="flex-end">
                      <ButtonGroup size="sm">
                        <Button colorScheme="red" onClick={setLoginFailed}>Failed</Button>
                        <Button colorScheme="green" onClick={setLoginSuccess}>Success</Button>
                      </ButtonGroup>
                    </PopoverFooter>
                  </PopoverContent>
                </Popover>
            </Flex>
            <Flex h="100vh" w={[0, 0, '50%']} bg='#e6f2ff' justifyContent='center'>
              <Box>
                <Image src='/images/login.jpg'/>
              </Box>
            </Flex>
                
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
      <Image src="/images/logogeneric.png" d='inline-block' w='300px' alt="Your Logo" /><br/>
      
      <Heading as="h4" mt='50px' size="lg">Login</Heading>
      <br/>
      <form onSubmit={handleSubmit}>
        <Stack>
          <Input value={values.username} className='' bg='white'  size='lg' mb='4' onChange={handleChange} name='username' placeholder="Username" />
          <Input onChange={handleChange} className='' bg='white'  size='lg' mb='4' value={values.password} name='password' type='password' placeholder="Password" />
          <Button leftIcon={<LockIcon />} isLoading={props.loading} className='inputShadow' loadingText='Logging in...' colorScheme="blue" type='submit'>Secure Login</Button>
        </Stack>
      </form>
    </Box>  
  )
}

export default LoginRoute;
