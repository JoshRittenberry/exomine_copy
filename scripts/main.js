import { FacilityOptions } from "./Facilites.js"
import { GovernorOptions } from "./Governors.js"
import { PurchaseMineralButton } from "./Orders.js"

const container = document.querySelector('.container')



const render = async () => {
    
    const govOptions = await GovernorOptions()
    const facOptions = await FacilityOptions()
    
    const buttonHTML = PurchaseMineralButton()
    
    
    const composedHTML = `
        
            <div class="main__top">
                <article class="choices">
                    <section class="choice__governors options">
                    <div id="dropTitles">Choose a governor</div>                       
                            ${govOptions}
                            </section>
                            
                    <section class="choices__facilities options">
                    <div id="dropTitles">Choose a facility</div>
                            ${facOptions}
                    </section>
                </article>

                <article class="colony">
                    <div class="colony_minerals">
                        <h2>Colony Minerals</h2>
                    </div>
                </article>
                    
            </div>
            
            <div class="main__bottom">
                <article class="facility_minerals">
                    <h2>Facility Minerals</h2>
                </article>
                
                <article class="orders">
                <h2>Space Cart</h2>
                    <p class="mineral_selection"></p>
                    <div class="order">
                        
                        ${buttonHTML}
                    </div>
                </article>
            </div>
            `

        container.innerHTML = composedHTML
}

render()

