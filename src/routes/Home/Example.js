import React, { useState, useEffect, useCallback, useReducer, useRef } from "react";
import { Flex, Heading, Text, Button } from "@chakra-ui/core";

// const useCounterLog = (counter) => {
//   const [message, setMessage] = useState("Constructor <br/>");

//   const logmessage = useCallback(() => {
//     setMessage("counter changed : " + (counter + 1));
//   }, [counter]);

//   useEffect(() => {
//     console.log("message effedt");
//     logmessage();

//     return () => {
//       setMessage("reset");
//       console.log("return message");
//     };
//   }, [logmessage]);

//   //   return [message]
//   // return message
//   return { message };
// };

function reducer(state, action) {
  switch (action.type) {
    case "incc1":
      return Object.assign({}, state, {
        c1: state.c1 + 1,
      });
    case "incc2":
      return Object.assign({}, state, {
        c2: state.c2 + 1,
      });

    default:
      return state;
  }
}



const useLogger = ([state, dispatch]) => {
  const newdisptach = useRef()

  newdisptach.current = (action) => {
    console.log("logger", action );
    dispatch(action)
  }
  return [state, newdisptach.current]
}


const useThunk = ([state, disptch]) => {
  const newdispatch = useRef()
  newdispatch.current = (action) => {
    if(typeof action === 'function'){
      action(newdispatch.current)
    }else
    disptch(action)
  }
  return [state, newdispatch.current]
}


const incvalue  =  () => {
  return async (dispatch) => {
    dispatch({type:'loading'})
    setTimeout(()=> {
      dispatch({type:'incc1'})
      dispatch({type:'success'})
    },1000)
  }}



const usePrevious = (count, callback) => {
  const prev= useRef()

  useEffect(()=> {
    let old = prev.current
    callback(old , count)
    prev.current = count
  },[count])
}



const usePreviousState = (v) => {
  const [state, update] = useState(v)
  const prev = useRef()
 
  useEffect(()=>{
    prev.current = state
  },[state])
  
  return [state, prev.current, update]
}

const Home = (props) => {
  const [store, dispatchaction] = useThunk(useLogger(useReducer(reducer, { c1: 0, c2: 1 })));
  const _inc = () => {
    dispatchaction(incvalue())
  };


  const [state, previous, updateState] = usePreviousState(0)


  usePrevious(store.c1, (old, curr)=> {
    console.log("old, curr", old, curr);
  })

  //   const { message } = useCounterLog(counter);

  return (
    <Flex direction="column" p={10} flex={1} bg={"gray.300"} h="200vh">
      <Heading>Hooks example</Heading>
      <Text>
        {" "}
        counter : {store.c1} &nbsp; counter_alt(1 sec delay) : {store.c2}{" "}
      </Text>
      <br />
      <hr />
      <br />
      {/* <Text>{message}</Text> */}
      <br />
      <Button onClick={_inc}>Increase counter c1</Button>

      <Text>{state} and previous {previous}</Text>
      <Button onClick={() => {
        updateState(state+1)
      }}>Increase counter c1</Button>

    </Flex>
  );
};

export default Home;
