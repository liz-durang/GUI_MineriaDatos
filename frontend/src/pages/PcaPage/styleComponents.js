import styled from 'styled-components';

export const TD = styled.td`
    
    ${({correlation}) => {
        switch (correlation) {
            case "n01":
                return "color: white !important";
            case "n02":
                return "background: #073467 !important";
            case "p00":
                return "background: #073467  !important" ;
            case "p01":
                return "background: #195696  !important";
            case "p02":
                return "background: #337eb8  !important";
            case "p03":
                return "background: #84bcd9  !important";
            case "p04":
                return "background: #82bad8  !important";
            case "p05":
                return "background: #cce2ef  !important";
            case "p06":
                return "background: #f7f6f6  !important";
            case "p07":
                return "background: #fae9df  !important";
            case "p08":
                return "background: #f9c1a6  !important";
            case "p09":
                return "background: #d05448  !important";
            case "p10":
                return "background: #a81529  !important";
                
        }
    }}
    

`;