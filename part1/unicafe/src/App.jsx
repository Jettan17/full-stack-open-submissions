import { useState } from 'react'

const FeedbackButton = ({handleClick, type}) => {
  return (
    <button onClick={handleClick}>{type}</button>
  )
}

const Statistics = ({good, neutral, bad}) => {
  return (
    <>
    <h1>Statistics</h1>
    <p>good {good} </p>
    <p>neutral {neutral} </p>
    <p>bad {bad} </p>
    <p>all {good + neutral + bad} </p>
    <p>average {(good - bad) / (good + neutral + bad)} </p>
    <p>positive {good / (good + neutral + bad) * 100}% </p>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <FeedbackButton handleClick={() => setGood(good + 1)} type="good" />
      <FeedbackButton handleClick={() => setNeutral(neutral+1)} type="neutral" />
      <FeedbackButton handleClick={() => setBad(bad + 1)} type="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App