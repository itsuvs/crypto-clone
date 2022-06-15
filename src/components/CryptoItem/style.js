import styled from "styled-components";

export const CryptoItemBox = styled.div`

    height: 40px;
    border: 1px solid white;
    margin: 5px;
    color: #000000;
    padding: 10px;
    display: table-row-group;

    tr{
        cursor: pointer;
    }

    .accordion{
        display: ${(props) => props.isAccordionActive ? 'relative' : 'none'};

        .market-data-container .header{
            display:flex;
            justify-content: space-between;
            align-items: center;
    
            div{
                width: 50%;
                font-weight:bold;
                text-align: center;
                padding: 10px;
                background: rgba(236,239,241);
            }
        }
    
        .market-data-container .data-list-item{
            display:flex;
            justify-content: space-between;
            align-items: center;
    
            div{
                width: 50%;
                text-align: center;
                padding: 6px;
                border-bottom: 1px solid #eceff1;
            }
        }

        .market-data-container .data-list-item:hover{
            background: rgba(236,239,241,0.2);
        }
    }

`