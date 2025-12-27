const Header = ({ course }) => {
    return (
        <h2>{course}</h2>
    )
}

const Part = ({ part }) => {
    return (
        <p>{part.name} {part.exercises}</p>
    )
}

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part => <Part key={part.id} part={part} />)}
        </div>
    )
}

const Total = ({ parts }) => {
    const totalExercises = parts.reduce((accumulator, current) => accumulator + current.exercises, 0)
    return (
        <p><b>total of {totalExercises} exercises</b></p>
    )
}

const Course = ({ course }) => {
    return (
        <>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    )
}

export default Course