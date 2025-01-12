chrome.storage.sync.get(["userData"], (data) => {
  if (data.userData) {
    const userData = data.userData;

    const fieldMapping = {
      firstName: ["input[name='first_name']", "input[name*='firstname']"],
      middleName: ["input[name='middle_name']", "input[name*='middlename']"],
      lastName: ["input[name='last_name']", "input[name*='lastname']"],
      email: ["input[type='email']", "input[name='email']"],
      phone: ["input[type='tel']", "input[name='phone']"],
    };

    for (const [key, selectors] of Object.entries(fieldMapping)) {
      const value = userData[key];
      if (value) {
        selectors.forEach((selector) => {
          const field = document.querySelector(selector);
          if (field) {
            field.value = value;
          }
        });
      }
    }

    if (userData.education) {
      const bachelorData = userData.education.bachelors;
      if (bachelorData) {
        const degreeField = document.querySelector("input[name*='degree']");
        if (degreeField) degreeField.value = bachelorData.degree;

        const collegeField = document.querySelector("input[name*='college']");
        if (collegeField) collegeField.value = bachelorData.college;
      }
    }
  }
});
