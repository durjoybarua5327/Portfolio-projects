async function fetchSkillsData() {
    const username = 'durjoybarua5327'; // GitHub username
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
    const repos = await reposResponse.json();
    
    // Initialize an object to store skill counts
    const skillCount = {};
    
    // Go through each repository and count the skills (languages)
    for (const repo of repos) {
      if (repo.language) {
        skillCount[repo.language] = (skillCount[repo.language] || 0) + 1;
      }
    }
    
    return skillCount;
  }
  
  // Function to calculate the percentage of each skill
  function calculateSkillPercentages(skillCount) {
    const totalSkills = Object.values(skillCount).reduce((total, count) => total + count, 0);
    const skillPercentages = {};
  
    for (const [skill, count] of Object.entries(skillCount)) {
      skillPercentages[skill] = Math.round((count / totalSkills) * 100);
    }
  
    return skillPercentages;
  }
  
  // Function to create the skill bars dynamically
  function createSkillBars(skillPercentages) {
    const container = document.getElementById("skills");
  
    // For each skill, create a bar with its percentage
    for (const [skill, percentage] of Object.entries(skillPercentages)) {
      const bar = document.createElement("div");
      bar.classList.add("skill-bar");
  
      // Label for the skill
      const label = document.createElement("span");
      label.textContent = skill;
      bar.appendChild(label);
  
      // Bar fill element
      const barFill = document.createElement("div");
      barFill.style.width = `${percentage}%`;
  
      // Assign the appropriate class for the color of the skill
      barFill.classList.add(`skill-bar-${skill.toLowerCase()}`);
      
      bar.appendChild(barFill);
      container.appendChild(bar);
    }
  }
  
  // Main function to fetch data, calculate percentages, and render bars
  async function renderSkillBars() {
    const skillCount = await fetchSkillsData();
    const skillPercentages = calculateSkillPercentages(skillCount);
    createSkillBars(skillPercentages);
  }
  
  // Call the function to start the process
  renderSkillBars();
  
