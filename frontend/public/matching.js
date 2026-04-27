/**
 * StayMatch | Neural Sync Engine v2.0
 * Features: Euclidean Distance Algorithm, Dynamic Insight Generation, unique Radar Charts
 */

console.log("Neural Sync Engine: Online");

// Real-time slider labels
window.updateVal = function(id) {
    const slider = document.getElementById(id);
    const display = document.getElementById(`val-${id}`);
    if (display) display.innerText = slider.value;
};

// Main Sync Trigger
window.findMatches = async function() {
    console.log("Initiating Neural Link...");
    
    // 1. Gather User Input
    const userPrefs = {
        sleep: Number(document.getElementById("sleep").value),
        clean: Number(document.getElementById("clean").value),
        noise: Number(document.getElementById("noise").value),
        study: Number(document.getElementById("study").value),
        social: Number(document.getElementById("social").value),
        smoking: Number(document.getElementById("smoking").value),
        pets: Number(document.getElementById("pets").value)
    };

    try {
        const response = await fetch("./staymatch_lifestyle_dataset.csv");
        if (!response.ok) throw new Error("Dataset not found.");
        
        const csvData = await response.text();
        const matches = processCSV(csvData, userPrefs);
        
        renderMatches(matches, userPrefs);
    } catch (err) {
        console.error("Sync Error:", err);
        alert("Sync Failed: Check if staymatch_lifestyle_dataset.csv is in the folder.");
    }
};

// Logic: Compatibility Algorithm
function processCSV(csv, userPrefs) {
    const rows = csv.trim().split("\n");
    const results = [];

    // Skip Header (i=1)
    for (let i = 1; i < rows.length; i++) {
        const cols = rows[i].split(",");
        if (cols.length < 8) continue;

        const person = {
            name: cols[0],
            traits: {
                sleep: Number(cols[1]),
                clean: Number(cols[2]),
                noise: Number(cols[3]),
                study: Number(cols[4]),
                social: Number(cols[5])
            },
            smoking: Number(cols[6]),
            pets: Number(cols[7])
        };

        // ALGORITHM: Euclidean Distance (N-Dimensional)
        let sumSquares = 0;
        const keys = ['sleep', 'clean', 'noise', 'study', 'social'];
        
        keys.forEach(k => {
            sumSquares += Math.pow(userPrefs[k] - person.traits[k], 2);
        });

        const distance = Math.sqrt(sumSquares);
        
        // Normalize: Max possible distance is ~20. Map it to 0-100.
        let score = 100 - (distance * 5);

        // Binary Hard Filters (Crucial for Roommates)
        if (userPrefs.smoking !== person.smoking) score -= 25; 
        if (userPrefs.pets !== person.pets) score -= 15;

        results.push({
            ...person,
            score: Math.max(0, Math.round(score))
        });
    }

    // Sort by best match and show top 6
    return results.sort((a, b) => b.score - a.score).slice(0, 6);
}

// UI: Generate Match Cards
function renderMatches(matches, userPrefs) {
    const grid = document.querySelector(".results-grid");
    if (!grid) return;

    grid.innerHTML = matches.map((m, idx) => `
        <div class="match-card" style="animation-delay: ${idx * 0.1}s">
            <div class="match-info">
                <h3>${m.name}</h3>
                <div class="badge">${m.score > 85 ? '🔥 High Sync' : '✨ Compatible'}</div>
                <div class="tag">Sync: ${m.score}%</div>
                <button onclick='showAnalysis(${JSON.stringify(userPrefs)}, ${JSON.stringify(m.traits)}, "${m.name}", ${m.score})'>
                    View Analysis
                </button>
            </div>
            <div class="score-circle">${m.score}%</div>
        </div>
    `).join("");
}

// Data Viz: Radar Comparison + Sync Breakdown
window.showAnalysis = function(user, match, name, finalScore) {
    // 1. Generate Human Insights
    const labels = {
        sleep: "Sleep Schedules", clean: "Cleanliness",
        noise: "Noise Levels", study: "Focus Habits", social: "Social Energy"
    };

    const commonalities = Object.keys(labels)
        .filter(k => Math.abs(user[k] - match[k]) <= 1)
        .map(k => `<b>${labels[k]}</b>`);

    const insightHTML = commonalities.length > 0 
        ? `You and ${name} are a great match because you both have nearly identical preferences for ${commonalities.join(" and ")}.`
        : `You and ${name} have different styles that could balance each other out!`;

    // 2. Create Modal
    const modal = document.createElement("div");
    Object.assign(modal.style, {
        position: 'fixed', inset: '0', background: 'rgba(3, 7, 18, 0.98)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: '9999',
        padding: '20px', backdropFilter: 'blur(10px)'
    });

    modal.innerHTML = `
        <div style="background:#111827; border:1px solid #6366f1; border-radius:24px; padding:30px; width:100%; max-width:500px; color:white; text-align:center; box-shadow: 0 0 50px rgba(99,102,241,0.3);">
            <h2 style="margin-bottom:10px;">Neural Breakdown: ${name}</h2>
            <p style="font-size:14px; color:#94a3b8; line-height:1.6; margin-bottom:20px;">${insightHTML}</p>
            
            <div style="height:300px; margin-bottom:20px;">
                <canvas id="radarChart"></canvas>
            </div>
            
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="width:100%; padding:14px; border-radius:12px; border:none; background:linear-gradient(90deg, #6366f1, #a855f7); color:white; font-weight:bold; cursor:pointer;">
                Close Analysis
            </button>
        </div>
    `;

    document.body.appendChild(modal);

    // 3. Initialize Chart
    const ctx = document.getElementById('radarChart').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Sleep', 'Clean', 'Noise', 'Study', 'Social'],
            datasets: [
                {
                    label: 'You',
                    data: [user.sleep, user.clean, user.noise, user.study, user.social],
                    borderColor: '#a855f7', backgroundColor: 'rgba(168, 85, 247, 0.2)', borderWidth: 3, pointRadius: 4
                },
                {
                    label: name,
                    data: [match.sleep, match.clean, match.noise, match.study, match.social],
                    borderColor: '#6366f1', backgroundColor: 'rgba(99, 102, 241, 0.2)', borderWidth: 3, pointRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: { color: 'rgba(255,255,255,0.1)' },
                    grid: { color: 'rgba(255,255,255,0.1)' },
                    pointLabels: { color: '#94a3b8', font: { size: 12 } },
                    ticks: { display: false },
                    min: 0, max: 10
                }
            },
            plugins: {
                legend: { labels: { color: 'white', font: { weight: 'bold' } } }
            }
        }
    });
};