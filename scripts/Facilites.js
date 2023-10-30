import { setFacilityMineral } from "./TransientState.js"
import { getFacilityMinerals } from "./Minerals.js"

// Need a drop down menu in the HTML that allows the user to choose a facility
// Need a list of minerals available at the chosen facilty and how many tons are available - this list will need to have radio buttons so the user can make a selection

export const FacilityOptions = async() => {
    
    document.addEventListener("change", handleFaciltyChoice)
    
    const response = await fetch("http://localhost:8088/facilites")
    const facilites = await response.json()

    let facilitesHTML = 
    `
    <select id="facility">
    <option value="0">Select a Facility...</option>
    `
    for (const facility of facilites) {
        if (facility.active)    {
            facilitesHTML +=
            `
            <option type="facility" value="${facility.id}">${facility.name}</option>
            `
        }
    }

    facilitesHTML += `</select>`
    return facilitesHTML
}

// handleFaciltyChoice()
const handleFaciltyChoice = (changeEvent) => {
    if (changeEvent.target.id === "facility") {
        // setFacilityMineral(parseInt(changeEvent.target.value))
        // based on facility choice display minerals associated with that facility
        // inovke a function from the minerals module using the facilityID as a parameter
        getFacilityMinerals(changeEvent.target.value)
    }
}