//Rename to Purchase Minerals?
//Function called PurchaseMineralsButton with export to create button html
    //eventListener inside ('click', handlePurchaseMinerals)
//Function called handlePurchaseMinerals with (clickEvent) parameter
//If id clicked matches "purchaseMineral", then purchaseMineral()
// (import placeOrder() from TransientState.js)

import { purchaseMineral, getTState, setFacilityMineral } from "./TransientState.js";
import { updateColonyMinerals } from "./ColonyMinerals.js"

// Get facility minerals
const response = await fetch("http://localhost:8088/facilityMinerals")
const facilityMinerals = await response.json()

// Get all minerals
const minerals = await fetch("http://localhost:8088/minerals")
const allMinerals = await minerals.json()

// Get all facilities
const facility = await fetch("http://localhost:8088/facilites")
const allFacilities = await facility.json()



const handlePurchaseMineral = async (clickEvent) => {

    if(clickEvent.target.id === "purchaseMineral") {
        let tState = getTState()
        let govId = tState.governorId
        let facMinId = tState.facilityMineralId
        let orderId = tState.orderId
        //console.log('something ----' + orderId)

        // if (radio buttons all are selected) {
            purchaseMineral(govId, facMinId, 1)

            await updateColonyMinerals(orderId)
        // }
    }
}

const handleMineralSelection = async (changeEvent) => {

    const minSelection = document.querySelector(".mineral_selection")
    let html = ""
    
    if(changeEvent.target.name === "mineralSelection") {

        let facilityName = ""

        for (const facility of allFacilities) {
            if (changeEvent.target.dataset.facilityId == facility.id)
            facilityName = facility.name
        }
       
        for (const facMineral of facilityMinerals) {
            for (const mineral of allMinerals) {
                if (facMineral.id == changeEvent.target.value && mineral.id == facMineral.mineralId) {
                    html = 
                        `
                        <p>1 ton of ${mineral.name} from ${facilityName}</p>
                        `
                        setFacilityMineral(facMineral.id)
                        console.log(mineral.id + "___" + mineral.name)
                        console.log(facMineral.id + "___" + "THIS WAS THE facilityMineralID" + "___" + `IT BELONGS TO ${facilityName}`)
                    }

                }
            }
        } 
    minSelection.innerHTML = html
}

document.addEventListener("change", handleMineralSelection)

export const PurchaseMineralButton = () => {
    
    document.addEventListener("click", handlePurchaseMineral)

    return `
    <article class="purchase">
        <button id="purchaseMineral">Purchase Mineral</button>
    </article>
    `
}