import { Button, Stack } from "@mui/material";
import Image from "next/image";
import React, { useContext, useEffect } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import Styles from "../styles/cart.module.scss";
import { StatesContext } from "./_app";
import { useRouter } from "next/router";

function Cart() {
  const router = useRouter();
  const { states, setStates } = useContext(StatesContext);
  function CartCard({ data }) {
    function removeFromCart() {
      setStates((prev) => ({
        ...prev,
        cart: prev.cart.filter(
          (ele, index) => ele.product.name !== data.product.name
        ),
      }));
    }

    useEffect(() => {
      if (!states.user.username) {
        router.push("/login");
      }
    }, []);
    return (
      <div className={Styles.cartCard}>
        <div className={Styles.img}>
          <Image src={data.product.image} width={50} height={30} alt={""} />
        </div>
        <div className={Styles.productDetails}>
          <p>{data.product.name}</p>
          <Stack direction={"row"} alignItems={"center"} spacing={3}>
            <p>Qty:{data.qnty}</p>
            <p className={Styles.rate}>Rs.{data.product.rate} each</p>
            <Button onClick={removeFromCart}>Remove</Button>
          </Stack>
        </div>
      </div>
    );
  }
  return (
    <Wrapper>
      <section className={Styles.cart}>
        <h1>Welcome, {states.user.username}</h1>
        <p>Your Grand Total is:</p>
        <div className={Styles.cartComponents}>
          {states.cart.map((ele, index) => {
            return <CartCard key={index} data={ele} />;
          })}
        </div>
      </section>
    </Wrapper>
  );
}

export default Cart;
