
import React, { useEffect } from "react";
import { useState } from "react";

import { TD } from "../../styleComponents";

function TdCell({value}) {

    const [corr, setCorr] = useState();
    
    useEffect(() => {

      if (value >= 1) {
        setCorr("n01");
      } else if (value < -0.2) {
        setCorr("n02");
      } else if (value < 0.0) {
        setCorr("p00");
      } else if (value < 0.2) {
        setCorr("p02");
      } else if (value < 0.4) {
        setCorr("p04");
      } else if (value < 0.6) {
        setCorr("p06");
      } else if (value > 0.6) {
        setCorr("p07");
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