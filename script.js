const API_URL = "http://localhost:5000/api/leads";

// Get leads from backend
async function getLeads() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch leads");
        }

        const leads = await response.json();

        displayLeads(leads);

    } catch (error) {
        console.error("Error:", error);
    }
}


// Display leads in table
function displayLeads(leads) {

    const leadList = document.getElementById("leadList");

    leadList.innerHTML = "";

    leads.forEach(lead => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${lead.name}</td>
            <td>${lead.email}</td>
            <td>${lead.source}</td>

            <td>
                <select onchange="updateStatus('${lead._id}', this.value)">
                    <option value="New" ${lead.status === "New" ? "selected" : ""}>New</option>
                    <option value="Contacted" ${lead.status === "Contacted" ? "selected" : ""}>Contacted</option>
                    <option value="Converted" ${lead.status === "Converted" ? "selected" : ""}>Converted</option>
                </select>
            </td>

            <td>${lead.notes || ""}</td>
            <td>${lead.followUp || ""}</td>
            <td>
               <button onclick="editLead('${lead._id}')">
    Edit
</button>

<button onclick="deleteLead('${lead._id}')">
    Delete
</button>
            </td>
        `;

        leadList.appendChild(row);
    });
}
async function updateStatus(id, status) {

    try {

        const response = await fetch(`${API_URL}/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({ status })
        });

        if (!response.ok) {
            throw new Error("Failed to update status");
        }

        alert("Status updated successfully!");

        getLeads();

    } catch (error) {

        console.error("Error:", error);

        alert("Could not update status.");
    }
}
// Add new lead
document.getElementById("leadForm").addEventListener("submit", async function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const source = document.getElementById("source").value;
    const status = document.getElementById("status").value;
    const notes = document.getElementById("notes").value;
const followUp = document.getElementById("followUp").value;
    const lead = {
        name,
        email,
        source,
        status,
        notes,
        followUp
    };

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(lead)
        });

        if (!response.ok) {
            throw new Error("Failed to add lead");
        }

        alert("Lead added successfully!");

        document.getElementById("leadForm").reset();

        getLeads();

    } catch (error) {

        console.error("Error:", error);

        alert("Could not add lead.");
    }

});


// Update lead status
async function updateStatus(id, status) {

    try {

        const response = await fetch(`${API_URL}/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                status: status
            })
        });

        if (!response.ok) {
            throw new Error("Failed to update status");
        }

        alert("Status updated successfully!");

        getLeads();

    } catch (error) {

        console.error("Error:", error);

        alert("Could not update status.");
    }
}
async function editLead(id) {

    const newName = prompt("Enter new name:");

    if (!newName) {
        return;
    }

    try {

        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: newName
            })
        });

        if (!response.ok) {
            throw new Error("Failed to update lead");
        }

        alert("Lead updated successfully!");

        getLeads();

    } catch (error) {

        console.error("Error:", error);

        alert("Could not update lead.");
    }
}
// Edit lead
// Edit lead
async function editLead(id) {
    const name = prompt("Enter name:");
    if (name === null) return;

    const email = prompt("Enter email:");
    if (email === null) return;

    const source = prompt("Enter source:");
    if (source === null) return;

    const notes = prompt("Enter notes:");
    if (notes === null) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                source,
                notes
            })
        });

        if (!response.ok) {
            throw new Error("Failed to update lead");
        }

        alert("Lead updated successfully!");
        getLeads();

    } catch (error) {
        console.error("Error:", error);
        alert("Could not update lead.");
    }
}
// Delete lead
async function deleteLead(id) {

    if (!confirm("Are you sure you want to delete this lead?")) {
        return;
    }

    try {

        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Failed to delete lead");
        }

        alert("Lead deleted successfully!");

        getLeads();

    } catch (error) {

        console.error("Error:", error);

        alert("Could not delete lead.");
    }
}


// Load leads when page opens
getLeads();
function logout() {
    sessionStorage.removeItem("adminLoggedIn");
    window.location.href = "login.html";
}