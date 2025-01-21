import { db, collection, query, orderBy, getDocs } from "../firebase/db.js";

async function fetchData() {
    try {
        // Create a query to order documents by registerDate in descending order
        const tripsCollection = collection(db, "trips");
        const q = query(tripsCollection, orderBy("registerDate", "desc"));
        const querySnapshot = await getDocs(q);

        console.log(q)

        let bookingDataHTML = "";
        let statsHTML = "";
        let upComingTourHTML = "";
        let totalRevenue = 0;
        let activeTourCount = 0; // Variable to count active tours;
        let commission = 0;
        let totalNetPrice = 0;

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            // Calculate revenue
            let revenue = data.totalPrice || 0; // Assuming totalPrice is a field in your document
            totalRevenue += revenue;

            let netPrice = parseFloat(data.netPrice) || 0;
            totalNetPrice += netPrice;

            commission = totalRevenue - totalNetPrice;           
            

            // Check if tour is active (example condition)
            if (data.isActive) {
                activeTourCount++;
            }

            // Create a link for each booking
            const voucherLink = document.createElement("a");
            voucherLink.href = `detail_voucher.html?id=${doc.id}`;
            voucherLink.target = "_blank";
            voucherLink.textContent = `View Voucher`; // Text for the link

            // Add booking details to HTML
            bookingDataHTML += `
                <li>
                    <h3>Booking No: ${doc.id}</h3>
                    <p>Customer: ${data.firstName} ${data.lastName}</p>
                    <p>Tour: ${data.tripOrganizer}</p>
                    <p>Date: ${data.tripDate}</p>
                    <p class="view-voucher">${voucherLink.outerHTML}</p>
                </li>
            `;

            // Add upcoming tour details to HTML
            upComingTourHTML += `
                <li>
                    <h3>${data.tripOrganizer}</h3>
                    <p>Date: ${data.tripDate}</p>
                    <p>Pickup at: ${data.hotelName}</p>
                    <p>Program type: ${data.programType}</p>
                </li>
            `;
        });

        // Build stats HTML with formatted revenue
        statsHTML = `
            <div class="stat total-revenue">
                <h3>Total Revenue</h3>
                <p>THB ${totalRevenue.toLocaleString()}</p>
            </div>

            <div class="stat total-booking">
                <h3>Total Net Price</h3>
                <p>THB ${totalNetPrice.toLocaleString()}</p>
            </div>

            <div class="stat total-tour-active">
                <h3>Total Commission</h3>
                <p>THB ${commission.toLocaleString()}</p>
            </div>
        `;

        // Update the DOM with the generated HTML
        const bookingList = document.querySelector(".booking-list");
        const statsContainer = document.querySelector(".stats");
        const tourList = document.querySelector(".tour-list");

        bookingList.innerHTML = bookingDataHTML;
        statsContainer.innerHTML = statsHTML;
        tourList.innerHTML = upComingTourHTML;

    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}

document.addEventListener("DOMContentLoaded", fetchData);
