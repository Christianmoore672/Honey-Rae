import { useEffect, useState } from "react"
import "./tickets.css"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

export const TicketList = ({ searchTermState }) => {
    const [tickets, setTickets] = useState([])
    const [filteredTickets, setFiltered] = useState([])
    const [emergency, setEmergency] = useState(false)
    const [openOnly, updateOpenOnly] = useState(false)
    const navigate = useNavigate()

const localHoneyUser = localStorage.getItem("honey_user")
const honeyUserObject = JSON.parse(localHoneyUser)

useEffect(
    () => {
        
            const searchedTickets = tickets.filter(ticket => {
           return ticket.description.toLowerCase().startsWith(searchTermState.toLowerCase())
         
        })
        setFiltered(searchedTickets)
    },
    [ searchTermState ]
)

useEffect(
    () => {
        if (emergency) {
            const emergencyTickets = tickets.filter(ticket => ticket.emergency === true)
            setFiltered(emergencyTickets)
        }
        else {
            setFiltered(tickets)
        }
    },
    [emergency]
)

    useEffect(
        () => {
            fetch(`http://localhost:8088/serviceTickets`)
                .then(response => response.json())
                .then((ticketArray) => {
                    setTickets(ticketArray)
                })
            // console.log("Initial state of tickets", tickets) // View the initial state of tickets
        },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            if (honeyUserObject.staff) {
                setFiltered(tickets)
                // For employees
            }
            else {
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
                // For customers
            }
        },
        [tickets]
    )

    useEffect(
        () => {
            if (openOnly) {
            const openTicketArray = tickets.filter(ticket =>  {
                return ticket.userId === honeyUserObject.id && ticket.dateCompleted === ""
            })
            setFiltered(openTicketArray)
        }
        else {
            const myTickets = tickets.filter(ticket => ticket.userId ===honeyUserObject.id)
            setFiltered(myTickets)
        }
    },
        [ openOnly ]
    )

    return <>
     {
        honeyUserObject.staff
        ? <>
            <button onClick={ () => { setEmergency(true) } } >Emergency Only</button>
            <button onClick={ () => { setEmergency(false) } } >Show All</button>
        </>
        : <>
            <button onClick={() => navigate("/ticket/create")}>Create Ticket</button>
            <button onClick={() => updateOpenOnly(true)}>Open Tickets</button>
            <button onClick={() => updateOpenOnly(false)}>All My Tickets</button>
        </>
    }

    <h2>List of Tickets</h2>

    <article className="tickets">
        {
            filteredTickets.map(
                (ticket) => {
                    return <section className="ticket" key={`ticket--${ticket.id}`}>
                    <header>
                         <Link to={`/tickets/${ticket.id}/edit`}>Ticket {ticket.id}</Link>
                    </header>
                    <section>{ticket.description}</section>
                    <footer>Emergency: {ticket.emergency ? "🧨" : "No"}</footer>
                    </section>
                }
            )
        }
    </article>
    </>
}


