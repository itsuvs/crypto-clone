import styled from 'styled-components'

export const TickerBox = styled.div`
    min-height: 40px;
    padding: 6px;
    position: sticky;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #eceff1;
    z-index: 1;
    color: #ffffff;

    .data-container{
        display: flex;
        align-items: center;
        background: rgba(27,24,63);
    }

    .exchange-container{
        margin: 0px 7px;
    }

    .exchange-name{
        border-bottom: 1px solid rgba(255,255,255,0.4);
        padding: 2px;
        font-size: 15px;
    }

    .exchange-rate{
        font-size: 14px;
    }
`