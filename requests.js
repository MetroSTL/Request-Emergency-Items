import { agol } from './private.js';
import { check_for_data, requestList } from './survey.js';
import { facilities } from './assets/facilities.js'

(async () => {    
    
    // JAVASCRIPT VARIABLES
    let inventory, requestDate
    
    
    //JSON URLS
    const requestGeo = agol().request_geojson;
    const updateGeo = agol().update_geojson;
    const shipmentGeo = agol().shipment_geojson;
    const confirmGeo = agol().confirm_geojson;
    
    
    //HTML SECTION SELECTORS
    const iframe_div = document.getElementById('ifrm');
    const list = document.querySelector('#list');
    const num_masks = document.querySelector('#num-masks');
    const num_lysol = document.querySelector('#num-lysol');
    const num_sanitizers = document.querySelector('#num-sanitizer');
    const update_time = document.querySelector('#update-time');
    
    
    //POLYFILLS
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    }if (!Element.prototype.closest) {
        Element.prototype.closest = function(s) {
          var el = this;
          do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
          } while (el !== null && el.nodeType === 1);
          return null;
    }};
    
    
    const refresh = () => {
        check_for_data(requestGeo, updateGeo, shipmentGeo, confirmGeo)
        .then(data => requestList(data))
        .then(rdata => list.innerHTML = rdata)
    };
    
    
    const clickEvent = (event) => {
        
        // TARGET VARIABLES
        const iframe_target = event.target.closest('#ifrm');
        const back = event.target.closest('#back');
        const link = event.target.closest('.link');
        
        if(!link){
            event.preventDefault();
        }
    
        if(!iframe_target && iframe_div){
            iframe_div.parentNode.removeChild(iframe_div);
            return;
        
        }else if(!iframe_div){
    
            if(request_target){
    
            }
            


        // CLICK LIST ITEM
        }else if (refresh){                
            let item = event.target.closest('.openpop');
            let url = item.getAttribute('data-url');
            let ifrm = document.createElement('iframe');
            const refresh_click = event.target.closest('#refresh');


            ifrm.setAttribute('id', 'ifrm'); // assign an id
            ifrm.setAttribute(`src`, url);
        
            // to place before another page element
            var el = document.getElementById('marker');
            main.parentNode.insertBefore(ifrm, el);
            
    
        // CLICK LIST ELEMENT AND OPEN IFRAME!!!
        }else if(requests){
            console.log('Not list_div');
            return; 
        }
        else{
            console.error('Unregistered Click');
            return;
        }
    };
    const facil = facilities()
    
    refresh();

    // refresh every 2 minutes
    setInterval(
        () => {
           refresh()
            console.log('refresh')
        }, 120000);
    
    window.addEventListener("click", clickEvent, false);

})();
