import styled from "styled-components";

export const ListingsBox = styled.div`

    .gradient-top{
        height: 200px;
        background: #0f0c29;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #24243e, #302b63, #0f0c29);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #24243e, #302b63, #0f0c29); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        color:white;

        div{
            position: relative;
            top: 30px;
        }

        h2{
            margin: 0px;
        }
    }

    .table-container{
        width: 900px;
        min-height: 400px;
        margin: auto;
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
        border-radius: 5px;
        background: #ffffff;
        position: relative;
        top: -50px;
    }

    table{
        width: 100%;
        text-align: left;
        border-collapse: collapse;
    }

    thead tr{
        background: #fafafa;
        border-bottom: 1px solid #bfcdd4;
    }

    thead tr th{
        padding: 15px;
        font-size: 0.9rem;
        font-weight: normal;
        color: rgba(0,0,0,.7);
    }

    thead tr th:hover{
        cursor: pointer;
    }

    tbody tr{
        height: 50px;
        border-bottom: 1px solid #bfcdd4;
    }

    tbody tr:hover{
        background: rgba(26,21,59,0.1);
    }

    td{
        padding: 10px;
        font-size: 13px;
    }

    td img{
        width: 30px;
        height: 30px;
        margin: 5px;
    }

    td .item-symbol{
        font-size: 11px;
        margin-top: 5px;
    }

    div.end-of-listing{
        margin-top: 20px;
    }

    button{
        padding: 10px;
        border-radius: 20px;
        background: #1a153b;
        color: #ffffff;
        outline: none;
        border: none;
        cursor: pointer;
        font-size: 14px;
        font-weight: bold;
    }

    @media (max-width:880px){
        width: 100%;
        
        .table-container{
            width: 95%;
            margin: auto;
        }

        .mobile-hidden{
            display: none;
        }
    }

`