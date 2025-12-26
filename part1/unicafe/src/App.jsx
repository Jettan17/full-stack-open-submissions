import { useState } from 'react'

const FeedbackButton = ({handleClick, type}) => {
  return (
    <button onClick={handleClick}>{type}</button>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <>
    <h1>Statistics</h1>
    <StatisticLine text="good" value={good} />
    <StatisticLine text="neutral" value={neutral} />
    <StatisticLine text="bad" value={bad} />
    <StatisticLine text="all" value={good + neutral + bad} />
    <StatisticLine text="average" value={(good - bad) / (good + neutral + bad)} />
    <StatisticLine text="positive" value={`${good / (good + neutral + bad) * 100}%`} />
    </>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <p>{text} {value}</p>
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