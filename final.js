/*
proj11.js
Cayden Park
Professor Kristi Smith
CSCN315-001: Front-End Programming in JavaScript

Implements React to create a rudimentary course credit degree completion planner.
Allows adding and removing semesters, and adding and removing courses from each semester.
Courses list the course code, course name, and credit hours.
*/

// Planner top-level element.
function Planner() {
    // Create states for semesters
    const [semesters, setSemesters] = React.useState([{ id: 1, courses: [] }])

    // Create a new semester, provide an ID, and insert into semesters list
    function insertSemester(index) {
        // Semester ID is one over highest
        const newId = semesters.length > 0 ? Math.max(...semesters.map(s => s.id)) + 1 : 1;
        const newSemester = { id: newId, courses: [] };
        const pos = semesters.findIndex(s => s.id === index);

        // Insert into position
        setSemesters([
            ...semesters.slice(0, pos + 1),
            newSemester,
            ...semesters.slice(pos + 1)
        ]);
    }

    // Remove semester with index
    function removeSemester(index) {
        setSemesters(semesters.filter(s => s.id !== index));
    }

    // Return elements
    return (
        <div className="planner">
            <SemesterAddButton key="sa-1" id={0} onAdd={() => insertSemester(0)} />
            {semesters.map(s => (
                <Semester key={`s-${s.id}`} id={s.id} onAdd={insertSemester} onRemove={removeSemester} />
            ))}
        </div>
    )
}

// Semester with courses.
function Semester({ id, onAdd, onRemove }) {
    // Create courses and header states
    const [courses, setCourses] = React.useState([])
    const [header, setHeader] = React.useState(`Semester ${id}`)

    // Append new course to courses
    function addCourse() {
        const newCourse = {id: courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 0};
        setCourses([...courses, newCourse]);
    }

    // Remove course with index
    function removeCourse(index) {
        setCourses(courses.filter(c => c.id !== index));
    }

    // Return elements
    return (
        <>
            <div className="planner-semester">
                <button className="planner-remove" onClick={() => onRemove(id)}>-</button>
                <input className="planner-header" type="text" placeholder="Semester" value={header} onChange={e => setHeader(e.target.value)}/>
                <div></div>
                {courses.map(c => (
                    <Course key={`c-${id}-${c.id}`} id={c.id} onRemove={removeCourse}/>
                ))}
                <button className="planner-add-course" onClick={() => addCourse()}>+</button>  
            </div>
            <SemesterAddButton key={`sa-${id}`} id={id} onAdd={onAdd} />
        </>
    )
}

// Button to add new semester.
function SemesterAddButton({ id, onAdd }) {
    return (
        <button className="planner-add-semester" onClick={() => onAdd(id)}></button>
    )
}

// Course element with course code, course name, and credit hours as inputs.
function Course({id, onRemove }) {
    return (
        <div className="planner-course">
            <button className="planner-remove" onClick={() => onRemove(id)}>-</button>
            <input className="planner-course-code" type="text" placeholder="CODE101" />
            <input className="planner-course-credits" type="number" min="0" max="4" placeholder="0" />
            <input className="planner-course-title" type="text" placeholder="Intro to Prereq" />
        </div>
    )
}

// Render React virtual DOM.
ReactDOM.createRoot(document.getElementById('root')).render(<Planner />);