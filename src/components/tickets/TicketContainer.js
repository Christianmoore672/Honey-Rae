import { useState } from "react"
import { TicketList } from "./TicketList"
import { TicketSearch } from "./TicketSearch"

export const TicketContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")
   return<>
    <TicketSearch setterFunction={setSearchTerms} />
	<TicketList searchTermState={searchTerms}/> 
    </>

}

// Two sibling components can not talk to each other. Have to go through a parent.
