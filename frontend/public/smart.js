const roommates = [
    { name: "Alex", clean: 8, study: 4 },
    { name: "Sam", clean: 5, study: 9 },
    { name: "Jordan", clean: 7, study: 4 }
];

const chores = [
    { task: "Kitchen Deep Clean", effort: 12 },
    { task: "Trash Disposal", effort: 4 },
    { task: "Bathroom Sanitization", effort: 15 },
    { task: "Vacuuming", effort: 8 }
];

function generateChores() {
    let workload = {};
    roommates.forEach(r => workload[r.name] = 0);

    let assignments = chores.map(chore => {
        let bestCandidate = null;
        let minFriction = Infinity;

        roommates.forEach(r => {
            // Formula: Current Load + (Study Stress) - (Cleaning Skill)
            let friction = workload[r.name] + (r.study * 0.7) - (r.clean * 0.4);
            if (friction < minFriction) {
                minFriction = friction;
                bestCandidate = r;
            }
        });

        workload[bestCandidate.name] += chore.effort;
        return { person: bestCandidate.name, task: chore.task, effort: chore.effort };
    });

    renderAll(assignments, workload);
}

function renderAll(assignments, workload) {
    const container = document.getElementById("choreResults");
    
    // 1. Create Balance Charts
    let chartsHtml = `<div class="balance-container">`;
    for (let name in workload) {
        let percentage = (workload[name] / 25) * 100; // Assuming 25 is max load
        chartsHtml += `
            <div class="stat-box">
                <div style="display:flex; justify-content:space-between">
                    <span>${name}</span> <b>${workload[name]} XP</b>
                </div>
                <div class="bar-bg"><div class="bar-fill" style="width: ${percentage}%"></div></div>
            </div>`;
    }
    chartsHtml += `</div>`;

    // 2. Create Cards
    let gridHtml = `<div class="chore-grid">` + assignments.map(a => `
        <div class="chore-card">
            <div>
                <div style="font-size: 13px; color: #94a3b8;">${a.person}</div>
                <div style="font-weight: 700; font-size: 18px; margin-top: 4px;">${a.task}</div>
            </div>
            <div class="effort-tag">${a.effort} XP</div>
        </div>
    `).join("") + `</div>`;

    container.innerHTML = chartsHtml + gridHtml;
}