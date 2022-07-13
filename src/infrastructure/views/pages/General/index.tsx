import React, { useEffect, useState } from "react";
import { addDoc, collection } from "@firebase/firestore";
import { firestore } from "../../../../utils/firebase";
import "./styles.scss";

type Props = {
  fromValue: Date;
  toValue: Date;
};

export function General({ fromValue, toValue }: Props) {
  const ref = collection(firestore, "messages");
  const addOnDb = () => {
    addDoc(ref, { message: "teste" });
  };

  return (
    <div role="contentinfo" id="general-screen">
      General
    </div>
  );
}
