//selected governor's colony appears in html
// import { getTState } from "./TransientState.js"

// export const ColonyTitle = async () => {
//     const response = await fetch("http://localhost:8088/governors?_expand=colony")
//     const governors = await response.json()

//     let html = ``
//     let tState = getTState()
//     for (const g of governors) {
//         //if governers.id = getTState.govId
//         if(g.id === tState.govId){
//             //html += `${governors.colony.name}`
//             html = `<h2>${g.colony.name}</h2>`
//         }
//     }
    
//     return html
    
// }

// Need a list of minerals currently available/owned by the Govenor's colony (maybe how much they have as well)
