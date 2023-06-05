
import React, { useEffect } from "react";
import { useState } from "react";

import { TD } from "../../styleComponents";

function TdCell({value}) {

    const [corr, setCorr] = useState();
    
    useEffect(() => {

      if (value >= 1 || value === 0) {
        setCorr("n01");
      } else if (value < -0.2) {
        setCorr("n02");
      } else if (value < 0.0) {
        setCorr("p00");
      } else if (value < 0.1) {
        setCorr("p01");
      } else if (value < 0.2) {
        setCorr("p02");
      } else if (value < 0.3) {
        setCorr("p03");
      } else if (value < 0.4) {
        setCorr("p04");
      } else if (value < 0.5) {
        setCorr("p05");
      } else if (value < 0.6) {
        setCorr("p06");
      } else if (value < 0.7) {
        setCorr("p07");
      } else if (value < 0.8) {
        setCorr("p08");
      }else if (value < 0.9) {
        setCorr("p09");
      }else if (value < 1) {
        setCorr("p10");
      }


    }, [])
    return(
        <TD
          correlation = {corr}
        >
            {value}

        </TD>
    );
    
}

export { TdCell }