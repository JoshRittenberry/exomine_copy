
// Gets the mineral list for a facility
export const getFacilityMinerals = async(facilityId) => {
    
    // Get facility minerals
    const response = await fetch("https://exomine-api.onrender.com/facilityMinerals")
    const facilityMinerals = await response.json()
    const facMinerals = document.querySelector(`.facility_minerals`)

    // Get all minerals
    const minerals = await fetch("https://exomine-api.onrender.com/minerals")
    const allMinerals = await minerals.json()

    // Get all facilities
    const facility = await fetch("https://exomine-api.onrender.com/facilites")
    const allFacilities = await facility.json()

    let facilityName = null

    for (const facility of allFacilities) {
        if (facilityId == facility.id) {
            facilityName = facility.name
        }
    }

    let facilityMineralsHTML = 
    `
    <h2>Minerals for the ${facilityName} Facility</h2>
    <ul>
    `

    for (const mineral of facilityMinerals) {
        for (const mineralList of allMinerals) {
            if(mineral.facilityId == facilityId && mineral.mineralId == mineralList.id) {
                facilityMineralsHTML +=
                `
                <div><input required="required" type="radio" name="mineralSelection" value=${mineral.id} data-facility-id="${mineral.facilityId}"/>${mineral.tons} Tons of ${mineralList.name}</li></div>
                `
            }
        }
    }

    facilityMineralsHTML += `</ul>`
    facMinerals.innerHTML = facilityMineralsHTML
    return facilityMineralsHTML
}

// Gets the mineral list for a colony
export const getColonyMinerals = async(colonyId) => {

    // Get colony minerals
    const response = await fetch("https://exomine-api.onrender.com/colonyMinerals")
    const colonyMinerals = await response.json()
    const colMinerals = document.querySelector(`.colony_minerals`)

    // Get all minerals
    const minerals = await fetch("https://exomine-api.onrender.com/minerals")
    const allMinerals = await minerals.json()

    // Get all colonies
    const colony = await fetch("https://exomine-api.onrender.com/colonies")
    const allColonies = await colony.json()

    let colonyName = null
    
    for (const colony of allColonies) {
        if (colonyId == colony.id) {
            colonyName = colony.name
        }
    }

    let colonyMineralsHTML = 
    `
    <h2>${colonyName}</h2>
    <ul>
    `


    for (const mineral of colonyMinerals) {
        for (const mineralList of allMinerals) {
            if(mineral.colonyId == colonyId && mineral.mineralId == mineralList.id) {
                colonyMineralsHTML +=
                `
                <li>${mineral.tons} Tons of ${mineralList.name}</li>
                `
                
            }
        }
    }

    colonyMineralsHTML += `</ul>`
    colMinerals.innerHTML = colonyMineralsHTML
    return colonyMineralsHTML
}