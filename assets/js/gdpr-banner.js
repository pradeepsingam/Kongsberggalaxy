(function () {
    // Check if user has already consented
    if (localStorage.getItem('gdpr_consent_given') === 'true') {
        return;
    }

    // Create Banner HTML
    var banner = document.createElement('div');
    banner.id = 'gdpr-cookie-banner';
    banner.innerHTML = `
        <div class="gdpr-content">
            <div class="gdpr-text">
                <h4>Vi bruker informasjonskapsler</h4>
                <p>
                    Vi bruker informasjonskapsler (cookies) for å forbedre din brukeropplevelse på nettstedet vårt. 
                    Ved å fortsette å bruke dette nettstedet samtykker du til vår bruk av informasjonskapsler.
                </p>
            </div>
            <div class="gdpr-buttons">
                <!-- <button id="gdpr-reject" class="gdpr-btn gdpr-btn-secondary">Avslå</button> -->
                <button id="gdpr-accept" class="gdpr-btn">Godta</button>
            </div>
        </div>
    `;

    // Append to body (this script assumes it runs after body is available, 
    // but to be safe we can wait for DOMContentLoaded or append to body if it exists)
    function appendBanner() {
        document.body.appendChild(banner);
        // Display block after appending (css has it display: none initially if needed, 
        // but since we are injecting it, we can just set it to block or rely on CSS)
        banner.style.display = 'block';

        // Add Event Listeners
        document.getElementById('gdpr-accept').addEventListener('click', function () {
            localStorage.setItem('gdpr_consent_given', 'true');
            banner.style.display = 'none';
        });

        // Optional: Reject button logic
        /*
        document.getElementById('gdpr-reject').addEventListener('click', function() {
            localStorage.setItem('gdpr_consent_given', 'false'); // Or however you want to handle rejection
            banner.style.display = 'none';
        });
        */
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', appendBanner);
    } else {
        appendBanner();
    }
})();
