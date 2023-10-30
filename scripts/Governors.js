import { getColonyMinerals } from "./Minerals.js"
import { setGovernor } from "./TransientState.js"

/* 

Each human habitation colony in the Solar System (Earth, Mars, Europa, etc...) has a governor. To keep each colony running efficiently, 
the governor has to purchase essential minerals from lightly staffed mining facilities that have been established on asteroids, moons, and rocky planets.
From time to time, governors take leaves of absence, so their status can change from active to inactive. Only active governors should be displayed in the UI. 

*/

export const GovernorOptions = async () => {

    document.addEventListener("change", handleGovChoice)

    const response = await fetch("http://localhost:8088/governors")
    const governors = await response.json()

    let html = `<select id="govs">`
    html += `<option value="0">Select a Governor...</option>`
    
    for (const g of governors) {
        if(g.active) {
            html += 
            `
                <option id="gov" data-colony-id="${g.colonyId}" value="${g.id}">${g.name}</option>
            `
        }
    }
    html += `</select>`

    return html
}

const handleGovChoice = (changeEvent) => {
    if (changeEvent.target.id === 'govs') {
        const selectedOption = changeEvent.target.options[changeEvent.target.selectedIndex];
        const colonyId = selectedOption.getAttribute("data-colony-id");
        
        getColonyMinerals(colonyId);
        setGovernor(parseInt(changeEvent.target.value));
    }
}