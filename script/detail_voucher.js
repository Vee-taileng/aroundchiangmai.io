import { db, doc, getDoc } from "../firebase/db.js";

// Function to format date to "DD MMM YYYY"
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        weekday: 'short',
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
}
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const tripId = urlParams.get("id");

        if (!tripId) {
            return;
        }

        const tripDocRef = doc(db, 'trips', tripId);
        const tripDocSnap = await getDoc(tripDocRef);

        let tripDataHTML = "";

        if (tripDocSnap.exists()) {
            const tripData = tripDocSnap.data();

            // Format the tripDate and registerDate
            const formattedTripDate = formatDate(tripData.tripDate);
            const formattedRegisterDate = formatDate(tripData.registerDate);

            tripDataHTML += `
                <div class="container">
            <div class="voucher guest-voucher">
            
                <p id="reservation-date">Reservation date: <b>${formattedRegisterDate}</b></p>
                <div class="flex-container voucher-heading">
                    <h1>Tour Voucher</h1>
                    <small>Voucher Number: <strong>${tripId}</strong></small>
                    <img src="./scr/around-full.png" alt="">
                </div>
                <div class="flex-container voucher-guest-info">
                    <div class="guest-info">
                        <p>Guest Name: <strong>${tripData.firstName} ${tripData.lastName}</strong></p>
                        <p>Phone Number: <strong>${tripData.phone}</strong></p>
                        <p>Hotel Name: <strong>${tripData.hotelName}</strong></p>
                        <p>Room Number: <strong>${tripData.roomNumber}</strong></p>
                    </div>

                    <div class="voucher-company-info">
                        <h4>by Buri Gallery House</h4>
                        <p class="street-name">102 Rachadamneon, Sripoom, Muang, Chiang Mai</p>
                        <p>info@aroundchiangmai.com | www.aroundchiangmai.com</p>
                        <p class="tel"><strong>Tel: 053-416500</strong></p>
                    </div>
                </div>

                <table>
                    <tr>
                        <th>Tour Program</th>
                        <th>Trip Date</th>
                        <th>Pax</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                    <tr class="table-color">
                        <td>${tripData.tourProgram || "No Trip Options"}</td>
                        <td><b>${formattedTripDate}</b></td>
                        <td>${tripData.pax}</td>
                        <td>${tripData.pricePerPax} THB</td>
                        <td>${tripData.totalPrice} THB</td>
                    </tr>
                    <tr>
                        <td >Organizer: <strong class="pickup-time">${tripData.tripOrganizer}</strong></td>
                        <td>
                            Pick up time: <strong class="pickup-time">${tripData.pickupTime}</strong> 
                        </td>
                        <td colspan="3">Payment: <span class="pickup-time">${tripData.paymentMethod || "Unpaid"}</span></td>
                    </tr>
                    <tr>
                        <td colspan="1">
                        <b>Terms & Condition</b>
                            <ul>
                                <li>
                                    <small>Please give the voucher to your tour guide and do not lose it</small>
                                </li>
                                <li>
                                    <small>Cancellation on the tour date is NON-REFUNDABLE</small>
                                </li>
                                <li>
                                    <small>Cancellation 24 hours before tour date is 50% refundable</small>
                                </li>
                            </ul>
                        </td>
                        <td colspan="4" style="text-align: start;"><strong>Remark:</strong> ${tripData.remark || ""}</td>
                    </tr>
                </table>
                
                <div class="signature-field">
                    <p>Accept Terms & Condition: ____________________ </p>
                    <p>Staff: ____________________ </p>
                </div>
            </div>
            <br />
            <br />
            <br />

            <hr />

            <br />
            <br />
            <!-- Payment Voucher -->
            <div class="voucher guest-voucher">
                <p id="reservation-date">
                    Reservation date: <b>${formattedRegisterDate}</b>
                </p>
                <div class="flex-container voucher-heading">
                    <h1>Payment Voucher</h1>
                    <small>Voucher Number: <strong>${tripId}</strong></small>
                    <img src="./scr/around-full.png" alt="">
                </div>

                <div class="flex-container voucher-guest-info">
                    <div class="guest-info">
                        <p>Paid to: <strong>${tripData.tripOrganizer} </strong></p>
                         <p>${getBankDetail(tripData)}</p>                    
                    </div>

                    <div class="voucher-company-info">
                        <h4>by Buri Gallery House</h4>
                        <p class="street-name">102 Rachadamneon, Sripoom, Muang, Chiang Mai</p>
                        <p>info@aroundchiangmai.com | www.aroundchiangmai.com</p>
                        <p class="tel"><strong>Tel: 053-416500</strong></p>
                    </div>
                </div>

                <table>
                    <tr>
                        <th>Tour Program</th>
                        <th>Trip Date</th>
                        <th>Pax</th>
                        <th>Sell Price</th>
                        <th>Net</th>
                    </tr>
                    <tr class="table-color">
                        <td>${tripData.tourProgram || "No Trip Options"}</td>
                        <td>${formattedTripDate}</td>
                        <td>${tripData.pax}</td>
                        <td>${tripData.totalPrice} THB</td>
                        <td>${tripData.netPrice} THB</td>
                    </tr>
                    <tr>
                        <td colspan="">
                            Pick up time: <strong class="pickup-time">${tripData.pickupTime}</strong> 
                        </td>
                        <td colspan="2">
                            <p>Payment: ${tripData.paymentMethod || "Unpaid"}</p> 
                        </td>
                        <td colspan="3" class="bank-detail">
                            <p>Guest name: <strong>${tripData.firstName} ${tripData.lastName}</strong>
                            <p>Hotel Name: <strong>${tripData.hotelName} </strong>
                            <p>Room Number: <strong>${tripData.roomNumber} </strong>
                        </p>
                    </tr>
                    <tr>
                        <td colspan="5"><strong>Remark:</strong> ${tripData.remark || ""}</td>
                    </tr>
                </table>

                <div class="signature-field">
                    <p>Authorized By: ____________________ </p>
                    <p>Staff: ____________________ </p>
                </div>
            </div>
        </div>
        `;
            
        } else {
            console.log("No such document!");
        }

        const voucherContainerDom = document.querySelector(".voucer-wrap");
        voucherContainerDom.innerHTML = tripDataHTML;

    } catch (error) {
        console.error("Error fetching document:", error);
    }
});

function getBankDetail(tripData) {
    if (tripData.tripOrganizer === "Living Green") {
        const bankDetailHTML = `
            <p>Bank Holder: แคทรียา อาร์มสรอง</p>
            <p>Bank Number: 0251732542</p>
            <p>Bank Name: ธนาคารกรุงศรี</ย>
        `
        return bankDetailHTML;
    } else if (tripData.tripOrganizer === "Wendy Tour") {
        const bankDetailHTML = `
            <p>Bank Holder: วันดี ตันวงศ์ษา</p>
            <p>Bank Number: 1032984378</p>
            <p>Bank Name: กสิกรไทย</p>   
        `
        return bankDetailHTML;
    }else if(tripData.tripOrganizer === "Smile Elephants"){
        const bankDetailHTML = `
            <p>Bank Holder: ขนิษฐา ไอยสุวรรณ์</p>
            <p>Bank Number: 0131920989</p>
            <p>Bank Name: กสิกรไทย</p>
        `
        return bankDetailHTML;
    }else if(tripData.tripOrganizer === "Smile Organic"){
        const bankDetailHTML = `
            <p>Bank Holder: สมายออกานิกฟาร์ม</p>
            <p>Bank Number: 1588105055</p>
            <p>Bank Name: กสิกรไทย</p>
        `
        return bankDetailHTML;
    }else if(tripData.tripOrganizer === "Mamanoi Cooking"){
        const bankDetailHTML = `
            <p>Bank Holder: ____________________</p>
            <p>Bank Number: ______________________</p>
            <p>Bank Name: _________________________</p>
        `
        return bankDetailHTML;
    }else if(tripData.tripOrganizer === 'Asia Scenic'){
        const bankDetailHTML = `
            <p>Bank Holder: ดวงเดือน แสงทนต์</p>
            <p>Bank Number: 0628435421</p>
            <p>Bank Name: กสิกรไทย</p>
        `
        return bankDetailHTML;
    }else if(tripData.tripOrganizer === 'King Kong'){
        const bankDetailHTML = `
            <p>Bank Holder: ____________________</p>
            <p>Bank Number: ______________________</p>
            <p>Bank Name: _________________________</p>
        `
        return bankDetailHTML;
    }else if(tripData.tripOrganizer === 'Thapae Boxing Stadium'){
        const bankDetailHTML = `
            <p>Bank Holder: หจก. สนามมวยนานาชาติ ท่าแพ เชียงใหม่</p>
            <p>Bank Number: 0268839658</p>
            <p>Bank Name: กสิกรไทย</p>
        `
        return bankDetailHTML;
    }else if(tripData.tripOrganizer === 'Loi Kroh Boxing Stadium'){
        const bankDetailHTML = `
            <p>Bank Holder: สรพันธ์ กองเสริฐ</p>
            <p>Bank Number: 1493129801</p>
            <p>Bank Name: กสิกรไทย</p>
        `
        return bankDetailHTML;
    } else {
        const bankDetailHTML = `
            <p>Bank Holder: ____________________</p>
            <p>Bank Number: ______________________</p>
            <p>Bank Name: _________________________</p>
        `
        return bankDetailHTML;
    }

}