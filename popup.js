// This file runs when you open the extension's toolbar popup.
// Chrome handles the actual redirects using rules.json, even with this popup closed.

// This must match the ruleset ID in manifest.json.
const RULESET_ID = "reddit_redirect";

// document.querySelector finds an HTML element by its ID.
const toggleButton = document.querySelector("#toggle-button");
const previewButton = document.querySelector("#preview-button");
const statusText = document.querySelector("#status-text");
const statusDescription = document.querySelector("#status-description");
const statusDot = document.querySelector("#status-dot");
const errorMessage = document.querySelector("#error-message");

// async/await lets us wait for Chrome to finish an operation before moving on.
async function isStudyModeOn() {
  const enabledRulesets = await chrome.declarativeNetRequest.getEnabledRulesets();
  return enabledRulesets.includes(RULESET_ID);
}

function showStatus(enabled) {
  statusText.textContent = enabled ? "Study mode is on" : "Study mode is off";
  statusDescription.textContent = enabled
    ? "Opening Reddit sends you to your reminder page."
    : "Reddit opens normally. Turn study mode on when you are ready.";
  statusDot.classList.toggle("is-on", enabled);
  toggleButton.textContent = enabled ? "Turn study mode off" : "Turn study mode on";
}

function showError(message) {
  // textContent displays text safely without interpreting it as HTML.
  errorMessage.textContent = message;
  errorMessage.hidden = false;
}

async function loadStatus() {
  try {
    showStatus(await isStudyModeOn());
    toggleButton.disabled = false;
  } catch (error) {
    statusText.textContent = "Could not read study mode";
    statusDescription.textContent = "Reload the extension and reopen this popup.";
    showError("Open chrome://extensions, click Reload on Study Mode, then try again.");
    console.error("Could not load study mode:", error);
  }
}

// addEventListener runs this function when the button is clicked.
toggleButton.addEventListener("click", async () => {
  toggleButton.disabled = true;
  errorMessage.hidden = true;

  try {
    // Read Chrome's real setting instead of maintaining a second copy of it.
    const enabled = await isStudyModeOn();

    await chrome.declarativeNetRequest.updateEnabledRulesets({
      enableRulesetIds: enabled ? [] : [RULESET_ID],
      disableRulesetIds: enabled ? [RULESET_ID] : []
    });

    showStatus(await isStudyModeOn());
  } catch (error) {
    showError("Could not change study mode. Reopen the popup and try again.");
    console.error("Could not change study mode:", error);
  } finally {
    toggleButton.disabled = false;
  }
});

previewButton.addEventListener("click", async () => {
  errorMessage.hidden = true;

  try {
    // Basic tab creation does not require the broad "tabs" permission.
    await chrome.tabs.create({ url: chrome.runtime.getURL("blocked.html") });
  } catch (error) {
    showError("Could not open the preview. Please try again.");
    console.error("Could not open reminder page:", error);
  }
});

// Start by displaying the current setting when the popup opens.
loadStatus();
