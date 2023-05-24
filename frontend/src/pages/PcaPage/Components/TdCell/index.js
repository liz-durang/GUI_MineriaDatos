
import React from "react";

import { TD } from "../../styleComponents";

function TdCell({value}) {
    console.log(value);

    let corr = '';
    switch ({value}) {
        case value < -0.2:
            corr = 'n02';
            break;
        case value < 0.0:
            corr = 'p00';
            break;
        case value < 0.2:
            corr = 'p02';
        break;

        case value < 0.4:
            corr = 'p02';
        break;

        case value < 0.6:
            corr = 'p06';
        break;
        default:
            break;
    }
    return(
        <TD
            correlation = {corr}
        >
            {value}

        </TD>
    )
    
}

export { TdCell }