import React, { useEffect, useState } from 'react';
import axios from "axios";
import { server } from '..';
import { Button, Container, HStack, Radio, RadioGroup} from '@chakra-ui/react';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';
import CoinCard from './CoinCard';

const Coins = () => {
  const [coins,setCoins]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(false);
  const [page,setPage]=useState(1);
  const [currency,setCurrency]=useState("inr");

  const currencySymbol=currency==="inr"?"₹":currency==="eur"?"€":"$s";
  const changePage=(page)=>{
    setPage(page);
    setLoading(true);
  }
  const btns=new Array(132).fill(1);
  useEffect(()=> {
    const fetchCoins=async()=>{
    try {
      const {data} =await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);

      setCoins(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
    };
    fetchCoins();

  },[currency,page]);
  if(error) return <ErrorComponent message={"Error While Fetchindg Coins"} />
  return (
    <Container maxW={"container.xl"}>
      {
        loading ? <Loader /> : <>
        <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
          <HStack spacing={"4"}>
            <Radio value={"inr"}>₹</Radio>
            <Radio value={"usd"}>$</Radio>
            <Radio value={"eur"}>€</Radio>
          </HStack>
        </RadioGroup>
        <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
          {
            coins.map((i)=>(
             <CoinCard id={i.id} name={i.name} price={i.current_price} key={i.id} img={i.image} symbol={i.symbol} currencySymbol={currencySymbol} />
            ))
          }
        </HStack>
        <HStack w={"full"} overflow={"auto"} p={"8"}>
          {
          btns.map((item,index)=>(
            <Button bgColor={"blackAlpha.900"} color={"white"} onClick={()=>changePage(index+1)}>
             {index+1}
            </Button>
          ))
};
        </HStack>
        </>
      }
    </Container>
  )
};




export default Coins