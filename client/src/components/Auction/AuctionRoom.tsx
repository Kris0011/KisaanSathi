import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import MyTimer from './Timer';
import { useNavigate } from 'react-router-dom';
const socket = io.connect('http://localhost:3000');

const AuctionRoom = () => {
  const [expirTime, setExpirTime] = useState(null);
  const [auction, setAuction] = useState({
    _id: '',
    userId: '',
    cropName: '',
    winner: '',
    expireTime: '',
    bidPrice: '',
    currentBidder:''
  });
  const navigate = useNavigate()

  const [bids, setBids] = useState([]);
  const [bidder,setBidder] = useState('');
  const auc = useSelector((state:any) => state.user.auction)
  const user = useSelector( (state:any) => state.user.user)

  const onExpire = async () => {
    try{
      navigate('/')
    }catch(e)
    {
      console.log(e)
    }
  }

  useEffect(() => {
    setAuction(auc)
    const expireT = new Date(auc?.expireTime).getTime();
    setExpirTime(expireT as any)
    socket.emit('joinAuction',{auctionId: auc?._id, userId:user?._id})
    setBidder(auc?.bidder)
    
  },[auc])


  useEffect(() => {
    socket.on('updateAuction', (updatedAuction : any) => {
      setBidder(updatedAuction.bidder)
      setAuction({
        ...updatedAuction.updatedAuction,
        winner:''
      });
      
    });

    return () => {
      socket.off('updateAuction');
    };
  }, []);

  const placeBid = (bidAmount : any) => {
    socket.emit('placeBid', { auction: auction, bidAmount, bidder:user.name});
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Auction Room</h1>
      <div style={{ border: '1px solid #ccc', padding: '20px', margin: '20px', borderRadius: '10px' }}>
        <h2>{auction?.cropName}</h2>
        <p>Current Bidder: {bidder} </p>
        <p>Current Price: {auction?.bidPrice} </p>
        <button
          style={{
            padding: '10px',
            fontSize: '16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onClick={() => placeBid(bids.length > 0 ? bids[bids.length - 1].bidAmount + 1 : 1)}
        >
          Place Bid
        </button>
      </div>
      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '10px' }}>
        <h3>Bid History</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {bids.map((bid, index) => (
            <li
              key={index}
              style={{
                border: '1px solid #eee',
                padding: '10px',
                margin: '5px',
                borderRadius: '5px',
                backgroundColor: '#f9f9f9',
              }}
            >
              Bidder: {bidder}, Amount: {bid.bidAmount}
            </li>
          ))}
          {expirTime && <MyTimer expiryTimestamp={expirTime} onExpire={onExpire} />}
          
        </ul>
      </div>
    </div>
  );
};

export default AuctionRoom;
