import React from 'react';
import './style/redeem.css';
import RedeemCard from '../redeem-card';

const items = [
  {
    title: 'A thing', 
    description: 'A description of why the thing is so cool',
    points: 10,
  },
  {
    title: 'A thing 2 ', 
    description: 'A description of why the thing is so cool',
    points: 10,
  },
  {
    title: 'A thing 3', 
    description: 'A description of why the thing is so cool',
    points: 10,
  },
  {
    title: 'A thing 4', 
    description: 'A description of why the thing is so cool',
    points: 10,
  },
  {
    title: 'A thing 5', 
    description: 'A description of why the thing is so cool',
    points: 10,
  },
  {
    title: 'A thing 6', 
    description: 'A description of why the thing is so cool',
    points: 10,
  },
  {
    title: 'A thing 7', 
    description: 'A description of why the thing is so cool',
    points: 10,
  },
  {
    title: 'A thing 8', 
    description: 'A description of why the thing is so cool',
    points: 10,
  },
  {
    title: 'A thing', 
    description: 'A description of why the thing is so cool',
    points: 20,
  },
  {
    title: 'A thing 2 ', 
    description: 'A description of why the thing is so cool',
    points: 20,
  },
  {
    title: 'A thing 3', 
    description: 'A description of why the thing is so cool',
    points: 20,
  },
  {
    title: 'A thing 4', 
    description: 'A description of why the thing is so cool',
    points: 30,
  },
  {
    title: 'A thing 5', 
    description: 'A description of why the thing is so cool',
    points: 30,
  },
  {
    title: 'A thing 6', 
    description: 'A description of why the thing is so cool',
    points: 40,
  },
  {
    title: 'A thing 7', 
    description: 'A description of why the thing is so cool',
    points: 100,
  },
  {
    title: 'A thing 8', 
    description: 'A description of why the thing is so cool',
    points: 100,
  },
];
export default function Redeem(props) {
  return (
    <div className="redeem">
      Redeem

      <h4>10 points</h4>
      {items.filter(item => item.points===10).map(filteredItem => (
        <RedeemCard 
          description={filteredItem.description}
          points={filteredItem.points}
          title={filteredItem.title}
        />
      ))}

      <h4>20 points</h4>
      {items.filter(item => item.points===20).map(filteredItem => (
        <RedeemCard 
          description={filteredItem.description}
          points={filteredItem.points}
          title={filteredItem.title}
        />
      ))}

      <h4>30+ points</h4>
      {items.filter(item => item.points>=30).map(filteredItem => (
        <RedeemCard 
          description={filteredItem.description}
          points={filteredItem.points}
          title={filteredItem.title}
        />
      ))}
    </div>
  );
}
