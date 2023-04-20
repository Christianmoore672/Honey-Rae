import { useState, useEffect } from "react"
import "./Employees.css"
import { Employee } from "./Employee"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

useEffect(
    () => {
        fetch(`http://localhost:8088/users?isStaff=true`)
            .then(response => response.json())
            .then((employeeArray) => {
                    setEmployees(employeeArray)
            })
        },
        []
    )

    return <article className="employees">
    {
        employees.map(employee => < Employee key={`employee--${employee.id}`}  //the key always has to be on the component thats rendering multiple things 
        id={employee.id} 
        fullName={employee.fullName} 
        email={employee.email} />)
    }
    </article>
}