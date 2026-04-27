/**
 * StayMatch | Neural Friction Engine
 * Feature: Conflict Risk Prediction
 */

console.log("Friction Engine Online");

// 1. UI: Update slider labels
window.updateVal = (id) => {
    const slider = document.getElementById(id);
    const display = document.getElementById(`val-${id}`);
    if (slider && display) display.innerText = slider.value;
};

// 2. MAIN: Risk Analysis Logic
window.predictConflict = async function() {
    const syncBtn = document.querySelector(".sync-btn");
    const container = document.getElementById("conflict-results");
    const riskCount = document.getElementById("risk-count");

    syncBtn.innerText = "Analyzing Frequencies...";
    
    const user = {
        sleep: Number(document.getElementById("sleep").value),
        clean: Number(document.getElementById("clean").value),
        noise: Number(document.getElementById("noise").value),
        study: Number(document.getElementById("study").value),
        social: Number(document.getElementById("social").value)
    };

    try {
        const response = await fetch("./staymatch_lifestyle_dataset.csv");
        const csvText = await response.text();
        const results = processConflictData(csvText, user);

        riskCount.innerText = `${results.length} Profiles Analyzed`;
        renderConflictCards(results);

    } catch (error) {
        console.error("Friction Analysis Failed:", error);
        container.innerHTML = '<div class="placeholder-msg" style="color:#ff4757">Neural Engine Offline.</div>';
    } finally {
        syncBtn.innerText = "Run Risk Analysis";
    }
};

function processConflictData(csv, user) {
    const rows = csv.trim().split("\n").slice(1);
    
    return rows.map(row => {
        const cols = row.split(",");
        const person = {
            name: cols[0],
            traits: {
                sleep: Number(cols[1]), clean: Number(cols[2]),
                noise: Number(cols[3]), study: Number(cols[4]),
                social: Number(cols[5])
            }
        };

        let riskPoints = 0;
        let triggers = [];

        // Conflict Logic: Sleep (The "Night Owl vs Early Bird" clash)
        if (Math.abs(user.sleep - person.traits.sleep) > 4) {
            riskPoints += 35;
            triggers.push("Opposing Sleep Cycles");
        }

        // Conflict Logic: Cleanliness (The "Messy vs Neat" clash)
        if (Math.abs(user.clean - person.traits.clean) > 3) {
            riskPoints += 30;
            triggers.push("Hygiene Standards Gap");
        }

        // Conflict Logic: Noise (The "Quiet vs Party" clash)
        if (Math.abs(user.noise - person.traits.noise) > 4) {
            riskPoints += 25;
            triggers.push("Noise Sensitivity Mismatch");
        }

        // Conflict Logic: Social (The "Introvert vs Extrovert" clash)
        if (Math.abs(user.social - person.traits.social) > 4) {
            riskPoints += 15;
            triggers.push("Social Boundary Friction");
        }

        let probability = Math.min(riskPoints, 99);
        let level = "LOW RISK";
        let statusClass = "low-risk";

        if (probability > 60) { level = "HIGH RISK"; statusClass = "high-risk"; }
        else if (probability > 30) { level = "MEDIUM RISK"; statusClass = "med-risk"; }

        return { name: person.name, probability, level, statusClass, triggers };
    }).sort((a, b) => b.probability - a.probability).slice(0, 6);
}

function renderConflictCards(list) {
    const container = document.getElementById("conflict-results");
    container.innerHTML = list.map(person => `
        <div class="risk-card ${person.statusClass}">
            <div class="risk-header">
                <h3>${person.name}</h3>
                <span class="badge">${person.level}</span>
            </div>
            <div class="risk-body">
                <p><strong>Clash Probability:</strong> ${person.probability}%</p>
                <div class="tag-container">
                    ${person.triggers.map(t => `<span class="risk-tag">⚠️ ${t}</span>`).join("")}
                    ${person.triggers.length === 0 ? '<span class="risk-tag" style="background:rgba(46, 213, 115, 0.2)">✅ Stable Sync</span>' : ''}
                </div>
            </div>
        </div>
    `).join("");
}