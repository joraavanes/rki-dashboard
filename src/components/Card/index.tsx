import React from 'react'

const Card: React.FC<Card> = ({
    title,
    stats,
    theme
}) => {
  return (
    <div className="col">
      <div className={`card border-${theme} mb-3`}>
        <div className={`card-body text-${theme}`}>
          <p className="card-text">Total {title}:</p>
          <h4 title={title} className="card-title">{stats.length && stats.reduce((acc, total) => acc + total).toFixed(0)}</h4>
        </div>
      </div>
    </div>
  )
}

interface Card{
    stats: number[];
    title: string;
    theme: string;
}

export default Card;