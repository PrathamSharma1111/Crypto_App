import React, { useEffect, useState } from 'react';
import axios from "axios";
import { server } from '..';
import { Container, HStack, VStack,Image, Heading ,Text} from '@chakra-ui/react';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';

const Exchange = () => {
  const [exchanges,setExchanges]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(false);
  useEffect(()=> {
    const fetchExchanges=async()=>{
    try {
      const {data} =await axios.get(`${server}/exchanges`);

      setExchanges(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
    };
    fetchExchanges();

  },[]);
  if(error) return <ErrorComponent message={"Error While Fetchindg Exchanges"} />
  return (
    <Container maxW={"container.xl"}>
      {
        loading ? <Loader /> : <>
        <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
          {
            exchanges.map((i)=>(
             <ExchangeCard name={i.name} key={i.id} img={i.image} rank={i.trust_score_rank} url={i.url} />
            ))
          }
        </HStack>
        </>
      }
    </Container>
  )
};
const ExchangeCard=({name,img,rank,url})=>(
  <a href={url} target={"blank"}>
    <VStack w={"52"} shadow={"lg"} p={"8"} borderRadius={"lg"} transition={"all 0.3s"} m={"4"}
    css={{
      "&:hover":{
        transform:"scale(1.1)",
      }
    }}>
      <Image src={img} w={"10"} h={"10"} objectFit={"contain"} alt={"Exchanges"} />
      <Heading size={"md"} noOfLines={1}>{rank}</Heading>
      <Text noOfLines={1}>{name}</Text>
    </VStack>

  </a>
)

export default Exchange