const tripOrganizerSelect = document.getElementById('trip-organizer');
const tripOptionsSelect = document.getElementById('trip-options');
const lgeSelect = document.getElementById('lge');
const wendySelect = document.getElementById('wendy');
const smileElephantsProgramSelect = document.querySelector('#smile-elephants');  
const smile_organicSelect = document.querySelector('#smile-organic');  
const mamanoiSelect = document.querySelector('#mamanoi');  
const asiaScenicSelect = document.querySelector("#asia_scenic");
const kingkongSelect = document.querySelector("#kingkong");
const thapae_boxingSelect = document.querySelector("#thapae_boxing");
const loikroh_boxingSelect = document.querySelector("#loikroh_boxing");
const around_chiangmai = document.querySelector("#around-chiangmai");
const otherProgram = document.querySelector('#other');
const other_Program = document.querySelector('#other_program');

export function getTourOrganizer() {
        tripOrganizerSelect.addEventListener('change', function() {
        const selectedOrganizer = this.value;

        // Reset and hide all option fields
        tripOptionsSelect.style.display = 'none';
        lgeSelect.style.display = 'none';
        wendySelect.style.display = 'none';
        smileElephantsProgramSelect.style.display = 'none'
        smile_organicSelect.style.display = 'none'
        mamanoiSelect.style.display = 'none'
        asiaScenicSelect.style.display = 'none';
        kingkongSelect.style.display = 'none';
        thapae_boxingSelect.style.display ='none';
        loikroh_boxingSelect.style.display = 'none';
        around_chiangmai.style.display = 'none';
        otherProgram.style.display = 'none';

        // Display the appropriate select field based on selected option
        if (selectedOrganizer === 'Living Green') {
            lgeSelect.style.display = 'block';
        } else if (selectedOrganizer === 'Wendy Tour') {
            wendySelect.style.display = 'block';
        } else if(selectedOrganizer === "Smile Elephants"){
            smileElephantsProgramSelect.style.display = 'block'
        }else if(selectedOrganizer === "Smile Organic"){
            smile_organicSelect.style.display = 'block'
        }else if(selectedOrganizer === "Mamanoi Cooking"){
            mamanoiSelect.style.display = 'block'
        }else if(selectedOrganizer === 'Asia Scenic'){
            asiaScenicSelect.style.display = 'block'
        }else if(selectedOrganizer === 'King Kong Zipline'){
            kingkongSelect.style.display = 'block'
        }else if(selectedOrganizer === 'Thapae Boxing Stadium'){
            thapae_boxingSelect.style.display = 'block'
        }else if(selectedOrganizer === 'Loi Kroh Boxing Stadium'){
            loikroh_boxingSelect.style.display = 'block'
        }else if(selectedOrganizer === 'Around Chiang Mai'){
            around_chiangmai.style.display = 'block'
        }else if(selectedOrganizer === "other"){
            otherProgram.style.display = "block"
        }
    });
}