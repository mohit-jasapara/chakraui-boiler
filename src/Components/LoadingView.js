import React from 'react'
import { Flex, Heading, Spinner } from '@chakra-ui/core'



export default  ({message="Loading...", absolute}) => {
    return (
        <Flex zIndex={99999} style={absolute ? {
            position:'absolute',
            top:0,
            bottom:0,
            left:0,
            right:0,
        } : {}} direction="column" sx={{background:'rgba(255,255,255,0.5)'}} w="100%" h="100vh" justifyContent="center" alignItems='center'>
        <Heading size="sm">{message}</Heading>
        <Spinner mt={4} size="lg" />

      </Flex>
    )
}