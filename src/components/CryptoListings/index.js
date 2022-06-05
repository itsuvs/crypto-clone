import React, {useEffect, useState} from 'react'
import CryptoItem from '../CryptoItem'
import { ListingsBox } from './style'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCryptoData, fetchFiatCurrencyData, sortByHighToLow, sortByLowToHigh } from '../../store/action'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort } from '@fortawesome/free-solid-svg-icons'

export default function CryptoListings({children}) {

    const data = useSelector(state => state)
    const dispatch = useDispatch()
    const listingArray = data.cryptoArray

    const [isAllSet, setIsAllSet] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const [rowInsertedAt, setRowInsertedAt] = useState(null);
    const [alreadySortedByASC, setAlreadySortedByASC] = useState(false)

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const [currentPosts, setCurrentPosts] = useState([])

    const listItems = currentPosts.map((item, index) => {
            return <CryptoItem item={item} key={`CR${index}`} index={index + 1} setRowInsertedAt={setRowInsertedAt} rowInsertedAt={rowInsertedAt} />
    })

    const loadMore = () => {
      let totalPages = Math.floor(listingArray.length / postsPerPage) + 1;
  
      if (currentPage === totalPages) {
        setCurrentPage(1);
      } else {
        setCurrentPage(currentPage + 1);
      }
    };

    useEffect(()=> {
      dispatch(fetchFiatCurrencyData())
      .then(() => {
        return dispatch(fetchCryptoData())
      })
      .then(() => {
        setIsAllSet(true)
      })
    },[])

    useEffect(() => {
      setCurrentPosts([
        ...currentPosts,
        ...listingArray.slice(indexOfFirstPost, indexOfLastPost),
      ]);
    }, [currentPage, isAllSet]);

    useEffect(() => {
      setCurrentPosts([
        ...listingArray.slice(indexOfFirstPost, indexOfLastPost),
      ]);
    }, [alreadySortedByASC]);

    const sortThis = () => {
      if (alreadySortedByASC){
        dispatch(sortByHighToLow())
      }else{
        dispatch(sortByLowToHigh())
      }
      setAlreadySortedByASC(!alreadySortedByASC)
    }

  return (

    <ListingsBox>
      <div className='gradient-top'>
        <div>
          <h2>
            Crypto Listing
          </h2>
        </div>
      </div>
      <div className='table-container'>
        {
          isAllSet

          ?

          <table id='list-table'>
          <thead>
            <tr>
              <th className='mobile-hidden'>Rank</th>
              <th>Name</th>
              <th style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} onClick={sortThis}>
                Price 
                <FontAwesomeIcon icon={faSort} style={{marginLeft:'5px'}}/>
              </th>
              <th className='mobile-hidden'>Market Cap</th>
              <th className='mobile-hidden'>Volume</th>
              <th className='mobile-hidden'>Supply</th>
              <th>Price Change</th>
            </tr>
          </thead>
          <tbody>
            {children}
            {listItems}
          </tbody>
        </table>

        :

        <div>
          Loading....
        </div>
        }
      </div>
      {
        indexOfLastPost === listingArray.length 

        ?

        <div className='end-of-listing'>
          -- End Of Listing --
        </div>

        :

        <button onClick={loadMore} disabled={indexOfLastPost === listingArray.length ? true : false}>
          View More
        </button>
      }
    </ListingsBox>
 
  )
}