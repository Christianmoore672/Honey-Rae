import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"


export const TicketEdit = () => {
    // TODO: This state object should not be blank
   const [ticket, assignTicket] = useState({
            description: "",
            emergency: false
    })

    // TODO: What is the variable in which you stored the route parameter?
    const { ticketId } = useParams()
    const navigate = useNavigate()

    // TODO: Get the ticket state from the API.
    useEffect(
        () => {
            fetch(`http://localhost:8088/serviceTickets?_expand=user&_embed=systemTickets&userId=${ticketId}`)
                .then(response => response.json())
                .then((data) => {
                    assignTicket(data)
                })
    }, 
    [ ticketId ]
    )

// whats diffrent between put vs post?

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/serviceTickets?_expand=user&_embed=systemTickets&userId=${ticketId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticket)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/tickets")
            })
        // TODO: Write the fetch for the PUT request to replace the object being edited
    }


    return <form className="ticketForm">
        <h2 className="ticketForm__title">Service Ticket</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                    required autoFocus
                    type="text"
                    style={{
                        height: "10rem"
                    }}
                    className="form-control"
                    value={ticket.description}
                    onChange={
                        (evt) => {
                            const copy = {...ticket}
                            copy.description = evt.target.value
                            assignTicket(copy)
                            // TODO: Update state with a modified copy
                        }
                    }>{ticket.description}</textarea>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="name">Emergency:</label>
                <input type="checkbox"
                    onChange={
                        (evt) => {
                            const copy = {...ticket}
                            copy.emergency = evt.target.value
                            assignTicket(copy)
                            // TODO: Update state with a modified copy
                        }
                    } />
            </div>
        </fieldset>
        <button
            onClick={() => handleSaveButtonClick()}
            className="btn btn-primary">
            Save Edits
        </button>
    </form>
}