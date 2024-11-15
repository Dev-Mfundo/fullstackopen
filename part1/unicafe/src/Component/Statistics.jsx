const StatisticLine=({text,value})=>{
    return(
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
    )
}
const Statistics=({good,bad,neutral,totalFeedback})=>{
    const average = ((good - bad) / totalFeedback).toFixed(1);
    const positiveFeedback = ((good / totalFeedback) * 100).toFixed(1) + "%";
    if(totalFeedback ===0){
    return(
        <h2>No feedback given</h2>
    )
    }
    return(
    <table>
        <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={totalFeedback} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positiveFeedback} />
        </tbody>
    </table>
    )
}

export default Statistics;