import styled from 'styled-components';

export const TD = styled.td`
    
    ${({correlation}) => {
        switch (correlation) {
            case "n01":
                return "color: white !important";
            case "n02":
                return "background: #1d62a6 !important;";
            case "p00":
                return "background: #418fc1  !important" ;
            case "p01":
                return "background: #a4cee3  !important";
            case "p02":
                return "background: #f7f5f4  !important";
            case "p03":
                return "background: #fae8dd  !important";
            case "p04":
                return "background: #f5af8f  !important";
            case "p05":
                return "background: #da6853  !important";
            case "p06":
                return "background: #f7f6f6  !important; ";
            case "p07":
                return "background: #bf3337  !important; color: white !important";
            case "p08":
                return "background: #9d1126  !important; color: white !important";
            case "p09":
                return "background: #a21328  !important; color: white !important";
            case "p10":
                return "background: #820823  !important; color: white !important";       
        }
    }}
    

`;