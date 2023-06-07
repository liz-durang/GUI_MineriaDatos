import React from "react";
import { AiFillHeart } from "react-icons/ai";

function Footer() {
  return (
    <>
      <footer className="bg-light p-3" style={{position: 'sticky', bottom: '0vh', zIndex: '10'}}>
        <p className="text-center"> Made with  <AiFillHeart/> on May 2023 by <b> Lizeth Durán</b> & <b> Nelly López</b></p>
      </footer>
    </>
  );
}

export { Footer }


