const ords = await fetch("https://exomine-api.onrender.com/orders")
const orders = await ords.json()

let transientState = {
        "governorId": 0,
        "facilityMineralId": 0,
        "tons": 1,
        "orderId": 0,
    }

    //ORDER ID IS NOT CHANGING!!!!
export const setGovernor = async (govId) => {
    const ordUpdate = await fetch("https://exomine-api.onrender.com/orders")
    const updatedOrders = await ordUpdate.json()


    transientState.governorId = govId
    document.dispatchEvent( new CustomEvent("govStateChanged") )
    transientState.orderId = updatedOrders.length + 1 //transientState.orderId = order.length + 1
    console.log("this is tState ----" + JSON.stringify(transientState))
}

export const getTState = () => {
    return transientState
}

export const setFacilityMineral = async (facilityMinId) => {
    transientState.facilityMineralId = facilityMinId
    document.dispatchEvent( new CustomEvent("facStateChanged"))
    console.log("this is tState ----" + JSON.stringify(transientState))
}

export const getFacilities = () => {
    return transientState.facilities.map(f => ({...f}))
}

export const purchaseMineral = async (govId, facMinId, tons) => {
    //debugger
    //transientState.orderId++

    const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(transientState)
    }
    
    const response = await (fetch("https://exomine-api.onrender.com/orders", postOptions))

    // Broadcast custom event to entire documement so that the
    // application can re-render and update state
    
    // transientState.orderId++
    console.log(transientState.orderId + " This is OrderId!!")
    // Invoking this again here so that it will keep the correct facility mineral list selected
    setGovernor(govId)
    setFacilityMineral(facMinId)
    document.dispatchEvent( new CustomEvent("stateChanged") )
}

// function to be invoke to create a new colonyMineral

export const createColonyMineral = async (colId, minId, tons) => {
    const colonyMineralState = {
        "colonyId": colId,
        "mineralId": minId,
        "tons": tons
    }
    
    const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(colonyMineralState)
    }
    
    const response = await (fetch("https://exomine-api.onrender.com/colonyMinerals", postOptions))

    // Broadcast custom event to entire documement so that the
    // application can re-render and update state
    document.dispatchEvent( new CustomEvent("colonyMineralCreated") )
}

// ChatGPT Function Suggestion
export const updateDatabase = async (endpoint, id, data) => {
    const response = await fetch(`https://exomine-api.onrender.com/${endpoint}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
    }

    return await response.json();
}