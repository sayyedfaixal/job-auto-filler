chrome.storage.sync.get("autofillData", ({ autofillData }) => {
  if (autofillData) {
    Object.keys(autofillData).forEach((key) => {
      const field = document.querySelector(`[name='${key}']`);
      if (field) {
        field.value = autofillData[key];
      }
    });
  }
});
