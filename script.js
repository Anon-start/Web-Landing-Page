
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

const scrollBtn = document.getElementById("scrollHowItWorks");
if (scrollBtn) {
  scrollBtn.addEventListener("click", () => {
    const section = document.getElementById("how-it-works");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  });
}

const form = document.getElementById("waitlistForm");
const statusEl = document.getElementById("formStatus");

// your working Google Apps Script Web App URL
const API_URL = "https://script.google.com/macros/s/AKfycbwGcdPIqnKVk5A72QE48oJGnePym5B4tSRo_iVT2VVG38o_GBlRFONruDb3mzFkMCRcfw/exec";

if (form && statusEl) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    statusEl.textContent = "Submitting...";

    const formData = new FormData(form);
    const params = new URLSearchParams();
    for (const [key, value] of formData.entries()) {
      params.append(key, value);
    }

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        body: params,
      });

      if (!res.ok) throw new Error("Request failed");

      const json = await res.json();
      if (json.success) {
        // optional: reset form first (not really needed if we redirect)
        form.reset();
        // ✅ Redirect to thank-you page
        window.location.href = "thank-you.html";
      } else {
        statusEl.textContent =
          "Something went wrong. You can also email us at hello@smbrion.com.";
      }
    } catch (err) {
      console.error(err);
      statusEl.textContent =
        "Network issue. Please try again in a moment or email hello@smbrion.com.";
    }
  });
}
