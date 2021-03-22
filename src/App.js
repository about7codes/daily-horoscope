import React from 'react';
import axios from 'axios';
import './App.css';

const { useState, useEffect } = React;

// Main component -------------------------------
const Main = (props) => {
  
  const getRead = (sign = 'leo') => {
    axios.post(`https://aztro.sameerkumar.website/?sign=${sign}&day=today`)
    .then(response => {
        console.clear();
        console.log(response.data);
        setRead(response.data);
        setLoading(false)
      });
    }
  
  const [sign, setSign] = useState('leo');
  const [read, setRead] = useState();
  const [loading, setLoading] = useState(false);
  const [showCard, setShowCard] = useState(false);
  
  const handleSelect = (e) => {
    console.log(e.target.value);
    setLoading(true);
    setSign(e.target.value);
    getRead(e.target.value);
    setShowCard(true);
  }
  
  return (
    <div className='main'>
      <h2 className='head'>Your daily horoscope</h2>
      <div className='sign select'>
        <select onChange={handleSelect}>
          <option value="" disabled selected>Select sign</option>
          <option value='aquarius'>Aquarius</option>
          <option value='pisces'>Pisces</option>
          <option value='taurus'>Taurus</option>
          <option value='gemini'>Gemini</option>
          <option value='cancer'>Cancer</option>
          <option value='leo'>Leo</option>
          <option value='virgo'>Virgo</option>
          <option value='libra'>Libra</option>
          <option value='scorpio'>Scorpio</option>
          <option value='sagittarius'>Sagittarius</option>
          <option value='capricorn'>Capricorn</option>
        </select>
      </div>
      
      <div className='card-box'>
        {loading ? <Loader /> : (showCard ? <Card {...read} sign={sign} /> : null)}
        
      </div>
    </div>
  )
}



// Card component -------------------------------
const Card = props => {
  console.log(props)
  return (
    <article className='card'>
      <div className='card-a'>
        <h1>{props.sign}</h1>
        <h2>{props.date_range}</h2>
      </div>
      <div className='card-b'>
        <h2>Today: {props.current_date}</h2>
      </div>
      <div className='card-c'>
        <p>{props.description}</p>
      </div>
      <div className='card-d'>
        <span>Compatibility: <div>{props.compatibility}</div></span>
        <span>Mood: <div>{props.mood}</div></span>
        <span>Color: <div>{props.color}</div></span>
        <span>Lucky number: <div>{props.lucky_number}</div></span>
        <span>Lucky time: <div>{props.lucky_time}</div></span>
      </div>
      <p className='card-e'>See yeah tomorrow</p>
    </article>
  )
}





// Loader component -------------------------------
const Loader = props => {
  
  return (
     <div className='loader'>
      Loading...
      <i class="fas fa-sync-alt fa-spin"></i>
    </div>
  )
}




export default Main;

// ReactDOM.render(<Main />, document.getElementById('app'));