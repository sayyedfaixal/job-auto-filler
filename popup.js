document.getElementById("job-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const userData = {
    firstName: document.getElementById("first-name").value,
    middleName: document.getElementById("middle-name").value,
    lastName: document.getElementById("last-name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    education: {
      masters: {
        college: document.getElementById("college-masters").value,
        degree: document.getElementById("degree-masters").value,
        startDate: document.getElementById("start-masters").value,
        endDate: document.getElementById("end-masters").value,
        current: document.getElementById("masters-current").checked,
      },
      bachelors: {
        college: document.getElementById("college-bachelors").value,
        degree: document.getElementById("degree-bachelors").value,
        startDate: document.getElementById("start-bachelors").value,
        endDate: document.getElementById("end-bachelors").value,
        current: document.getElementById("bachelors-current").checked,
      },
    },
  };

  chrome.storage.sync.set({ userData }, () => {
    alert("Data saved successfully!");
  });
});

document.addEventListener('DOMContentLoaded', function() {
    // Initialize counters
    let experienceCount = 1;
    let educationCount = 1;

    // Get button elements
    const addExperienceButton = document.getElementById('add-experience');
    const addEducationButton = document.getElementById('add-education');

    // Debug logs
    console.log('Add Experience Button:', addExperienceButton);
    console.log('Add Education Button:', addEducationButton);

    // Setup initial remove buttons
    setupRemoveButton(document.querySelector('.remove-experience'));
    setupRemoveEducationButton(document.querySelector('.remove-education'));

    // Setup initial checkbox handlers
    setupCurrentlyWorkingHandler('work-current-1', 'end-work-1');
    setupCurrentlyStudyingHandler('education-current-1', 'end-edu-1');

    // Add Experience Button Handler
    if (addExperienceButton) {
        addExperienceButton.onclick = function() {
            console.log('Adding new experience');
            experienceCount++;
            
            const container = document.getElementById('work-experience-container');
            if (!container) {
                console.error('Work experience container not found');
                return;
            }

            const newExperience = document.createElement('fieldset');
            newExperience.className = 'work-experience';
            
            newExperience.innerHTML = `
                <div class="fieldset-header">
                    <legend>Experience ${experienceCount}</legend>
                    <button type="button" class="remove-experience" title="Remove this experience">×</button>
                </div>
                <div class="input-group">
                    <label for="company-${experienceCount}">Company:</label>
                    <input type="text" id="company-${experienceCount}" placeholder="Company Name">
                </div>
                <div class="input-group">
                    <label for="position-${experienceCount}">Position:</label>
                    <input type="text" id="position-${experienceCount}" placeholder="Job Title">
                </div>
                <div class="date-group">
                    <div class="input-group">
                        <label for="start-work-${experienceCount}">Start Date:</label>
                        <input type="date" id="start-work-${experienceCount}">
                    </div>
                    <div class="input-group">
                        <label for="end-work-${experienceCount}">End Date:</label>
                        <input type="date" id="end-work-${experienceCount}">
                    </div>
                </div>
                <div class="checkbox-group">
                    <input type="checkbox" id="work-current-${experienceCount}">
                    <label for="work-current-${experienceCount}">Currently Working</label>
                </div>
                <div class="input-group">
                    <label for="responsibilities-${experienceCount}">Responsibilities:</label>
                    <textarea id="responsibilities-${experienceCount}" placeholder="Key responsibilities and achievements" rows="3"></textarea>
                </div>
            `;
            
            container.appendChild(newExperience);
            setupCurrentlyWorkingHandler(`work-current-${experienceCount}`, `end-work-${experienceCount}`);
            setupRemoveButton(newExperience.querySelector('.remove-experience'));
        };
    }

    // Add Education Button Handler
    if (addEducationButton) {
        addEducationButton.onclick = function() {
            console.log('Adding new education');
            educationCount++;
            
            const container = document.getElementById('education-container');
            if (!container) {
                console.error('Education container not found');
                return;
            }

            const newEducation = document.createElement('fieldset');
            newEducation.className = 'education';
            
            newEducation.innerHTML = `
                <div class="fieldset-header">
                    <legend>Education ${educationCount}</legend>
                    <button type="button" class="remove-education" title="Remove this education">×</button>
                </div>
                <div class="input-group">
                    <label for="education-type-${educationCount}">Education Level:</label>
                    <select id="education-type-${educationCount}" class="education-type" required>
                        <option value="">Select Education Level</option>
                        <option value="phd">Ph.D.</option>
                        <option value="masters">Masters</option>
                        <option value="bachelors">Bachelors</option>
                        <option value="diploma">Diploma</option>
                        <option value="highschool">High School</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div class="input-group">
                    <label for="college-${educationCount}">Institution:</label>
                    <input type="text" id="college-${educationCount}" placeholder="Institution Name">
                </div>
                <div class="input-group">
                    <label for="degree-${educationCount}">Degree/Major:</label>
                    <input type="text" id="degree-${educationCount}" placeholder="Degree or Major">
                </div>
                <div class="date-group">
                    <div class="input-group">
                        <label for="start-edu-${educationCount}">Start Date:</label>
                        <input type="date" id="start-edu-${educationCount}">
                    </div>
                    <div class="input-group">
                        <label for="end-edu-${educationCount}">End Date:</label>
                        <input type="date" id="end-edu-${educationCount}">
                    </div>
                </div>
                <div class="checkbox-group">
                    <input type="checkbox" id="education-current-${educationCount}">
                    <label for="education-current-${educationCount}">Currently Pursuing</label>
                </div>
            `;
            
            container.appendChild(newEducation);
            setupCurrentlyStudyingHandler(`education-current-${educationCount}`, `end-edu-${educationCount}`);
            setupRemoveEducationButton(newEducation.querySelector('.remove-education'));
        };
    }

    // Remove button handlers
    function setupRemoveButton(button) {
        if (!button) return;
        
        button.onclick = function() {
            const fieldset = this.closest('.work-experience');
            if (fieldset) {
                const allExperiences = document.querySelectorAll('.work-experience');
                if (allExperiences.length > 1) {
                    fieldset.remove();
                } else {
                    alert('At least one work experience must remain.');
                }
            }
        };
    }

    function setupRemoveEducationButton(button) {
        if (!button) return;
        
        button.onclick = function() {
            const fieldset = this.closest('.education');
            if (fieldset) {
                const allEducations = document.querySelectorAll('.education');
                if (allEducations.length > 1) {
                    fieldset.remove();
                } else {
                    alert('At least one education entry must remain.');
                }
            }
        };
    }

    // Add these new functions
    function setupCurrentlyWorkingHandler(checkboxId, endDateId) {
        const checkbox = document.getElementById(checkboxId);
        const endDateInput = document.getElementById(endDateId);
        
        if (checkbox && endDateInput) {
            // Set initial state
            if (checkbox.checked) {
                endDateInput.disabled = true;
                endDateInput.value = '';
            }

            // Add change event listener
            checkbox.onchange = function() {
                endDateInput.disabled = this.checked;
                if (this.checked) {
                    endDateInput.value = '';
                }
            };
        }
    }

    function setupCurrentlyStudyingHandler(checkboxId, endDateId) {
        const checkbox = document.getElementById(checkboxId);
        const endDateInput = document.getElementById(endDateId);
        
        if (checkbox && endDateInput) {
            // Set initial state
            if (checkbox.checked) {
                endDateInput.disabled = true;
                endDateInput.value = '';
            }

            // Add change event listener
            checkbox.onchange = function() {
                endDateInput.disabled = this.checked;
                if (this.checked) {
                    endDateInput.value = '';
                }
            };
        }
    }
});
