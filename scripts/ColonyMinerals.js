// BY DEFAULT THERE SHOULD ONLY BE 13 COLONY MINERAL OBJECTS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


// if the mineral purchased already exists it should increase the tons by 1
// if the mineral purchased doesn't exist it should create a new mineral object for that colony


// export a function to be used when the purchase button is clicked
// this function should look at the order that is created and compare it to the existing array of colony minerals
// this will be done by using the orderId that is created when the button is pressed as an argument to the parameter in the function

// import { getTState } from "./TransientState.js"

import { createColonyMineral, updateDatabase } from "./TransientState.js"
import { getColonyMinerals, getFacilityMinerals } from "./Minerals.js"

export let updateColonyMinerals = async (orderId) => {
    //Imports
    const expanded = await fetch("http://localhost:8088/orders?_expand=governor&_expand=facilityMineral")
    const ordersExpanded = await expanded.json()

    const colMin = await fetch("http://localhost:8088/colonyMinerals")
    const colonyMinerals = await colMin.json()

    //Function
    for (const o of ordersExpanded) {
        if(orderId === o.orderId) {
            // if colony has mineral update quantity (tons)
            let count = 0

            // checks to find the matching colonyMineral based on the order - if a match is found it updates it if there isn't a match it coes to the next if statement to create a new colonyMineral
            for (const c of colonyMinerals) {

                // console.log(`${o.facilityMineral.mineralId} --- ${c.mineralId} && ${o.governor.colonyId} --- ${c.colonyId}`)
                if (o.facilityMineral.mineralId === c.mineralId && o.governor.colonyId === c.colonyId) {
                    
                    //debugger

                    console.log("Matches!" + JSON.stringify(c))

                    //have a function that puts (edits) the matched colonyMineral tons count and facilityMineral tons (possibly two dif functions)
                    console.log("colonMineralID is: " + c.mineralId, "facilityMineralID is: " + o.facilityMineral.mineralId)
                    c.tons++
                    o.facilityMineral.tons -= o.tons
                    console.log("tons of (c) is:" + c.tons)
                    console.log("tons of (f) is:" + o.facilityMineral.tons + "\n(f) id is:" + o.facilityMineral.id)
                    console.log(o.governor.colonyId)

                    // ChatGPT Suggestion
                    // Update colonyMinerals in the database
                    await updateDatabase('colonyMinerals', c.id, c);
                    getColonyMinerals(o.governor.colonyId)

                    // Update facilityMinerals in the database
                    await updateDatabase('facilityMinerals', o.facilityMineral.id, o.facilityMineral)
                    getFacilityMinerals(o.facilityMineral.facilityId)
                    return

                }

                else { //updates a counter to check for if the whole loop failed all its if checks
                    count++
                }
            }
            
            //checks if all the iteration checks failed in the forofloop above, if so, it will create a new entry in the database
            if (count === colonyMinerals.length) {
                //debugger
                console.log("No Match ):")
                createColonyMineral(o.governor.colonyId, o.facilityMineral.mineralId, o.tons)

                o.facilityMineral.tons -= o.tons
                console.log("tons of (f) is:" + o.facilityMineral.tons + "\n(f) mineralId is:" + o.facilityMineral.id)

                //have a function that puts (edits) the matched facilityMineral tons

                // ChatGPT Suggestion
                // Update facilityMinerals in the database
                await updateDatabase('facilityMinerals', o.facilityMineral.id, o.facilityMineral)
                getFacilityMinerals(o.facilityMineral.facilityId)
                getColonyMinerals(o.governor.colonyId)
                return
            }
        }
    }

    // if colony doesn't have mineral update the colonyMinerals to now include it
}