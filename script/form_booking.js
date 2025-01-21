import { db, doc, setDoc, collection, orderBy } from "../firebase/db.js";
import { getTourOrganizer } from "./untils/getTourOrganizer.js";
import { calculateTotalPrice } from "./untils/calculateTotalPrice.js";

const overlay = document.querySelector(".overlay");
const closeBtn = document.querySelector(".close-btn");

const formSubmission = document.querySelector("form")

formSubmission.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    
    // Retrieve form values
    let firstName = document.querySelector('#fname').value;
    let lastName = document.querySelector('#lname').value;
    let email = document.querySelector('#email').value;
    let phone = document.querySelector('#phone').value;
    let country = document.querySelector('#country').value;
    let tripOrganizer = document.querySelector('#trip-organizer').value;

    let lgePrgram = document.querySelector('#lge').value;  
    let wendyTourProgram = document.querySelector('#wendy').value;  
    let smileElephantsProgram = document.querySelector('#smile-elephants').value;  
    let smile_organic = document.querySelector('#smile-organic').value;  
    let mamanoi = document.querySelector('#mamanoi').value;  
    let asiaScenic = document.querySelector("#asia_scenic").value;
    let kingkong = document.querySelector("#kingkong").value;
    let thapae_boxing = document.querySelector("#thapae_boxing").value;
    let loikroh_boxing = document.querySelector("#loikroh_boxing").value;
    let around_chiangmai = document.querySelector("#around-chiangmai").value;
    let otherProgram = document.querySelector('#other_program').value;

    let programType = document.querySelector('input[name="pickup-time"]:checked').value;
    let pickupTime = document.querySelector('input[name="time"]').value;
    let hotelName = document.querySelector('#hotel').value;
    let roomNumber = document.querySelector('#room').value;
    let pax = parseInt(document.querySelector('#pax').value);
    let pricePerPax = parseFloat(document.querySelector('#price-per-pax').value);
    let totalPrice = parseFloat(document.querySelector('#total-price').value);
    let tripDate = document.querySelector('#date').value;
    let remark = document.querySelector("#guest-remark").value;
    let netPrice = document.querySelector("#net-price").value;

    let paymentMethod = document.querySelector("#payment-method").value;

    let tourProgram;
    switch(tripOrganizer) {
        case "Living Green":
            tourProgram = lgePrgram;
            break;
        case "Wendy Tour":
            tourProgram = wendyTourProgram;
            break;
        case "Smile Elephants":
            tourProgram = smileElephantsProgram;
            break;
        case "Smile Organic":
            tourProgram = smile_organic;
            break;
        case "Mamanoi Cooking":
            tourProgram = mamanoi;
            break;
        case "Asia Scenic":
            tourProgram = asiaScenic;
            break;
        case "King Kong Zipline":
            tourProgram = kingkong;
            break;
        case "Thapae Boxing Stadium":
            tourProgram = thapae_boxing;
        case "Loi Kroh Boxing Stadium":
            tourProgram = loikroh_boxing;
            break;
        case "Around Chiang Mai":
            tourProgram = around_chiangmai;
            break;
        case "other":
            tourProgram = otherProgram;
            break;
        default:
            tourProgram = null; // or a default value like "Unknown"
    }

    console.log(tourProgram)
    // Prepare data to be saved
    let formData = {
        firstName,
        lastName,
        email,
        phone,
        country,
        tripOrganizer,
        tourProgram,
        paymentMethod,
        
        programType,
        pickupTime,
        hotelName,
        roomNumber,
        pax,
        pricePerPax,
        totalPrice,
        tripDate,
        registerDate: new Date().toString(),
        remark,
        netPrice,
    };


    // Save to Firestore with custom ID
    const docRef = doc(collection(db, "trips"), generateCustomId());

    setDoc(docRef, formData)
    .then(() => {
        formSubmission.reset();
        overlay.style.display = "inline-block"
        localStorage.setItem("formData", JSON.stringify(formData));
    })
    .catch(err => {
        console.error("Error submitting to Firestore:", err);
    });

});

getTourOrganizer()
calculateTotalPrice()

closeBtn.addEventListener("click", () => {
    overlay.style.display = "none"
})


// Customer ID

// Retrieve the saved letterIndex and counter from localStorage
let letterIndex = parseInt(localStorage.getItem('letterIndex')) || 0;
let counter = parseInt(localStorage.getItem('counter')) || 1;

function generateCustomId() {
const letters = String.fromCharCode(65 + Math.floor(letterIndex / 26)) +
                String.fromCharCode(65 + (letterIndex % 26));

const number = counter.toString().padStart(5, '0');

// Increment and save to localStorage
letterIndex++;
counter++;

localStorage.setItem('letterIndex', letterIndex);
localStorage.setItem('counter', counter);

return `${letters}${number}`;
}