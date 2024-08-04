let latestResults = null;

async function searchGoogle() {
    const query = document.getElementById('query').value;
    const apiKey = 'AIzaSyAE8EGl0atPgRdlDsI3b-SdCwsb3OQUCVw';
    const cx = '34e803c2068a74e23';
    const url = `https://www.googleapis.com/customsearch/v1?q=${query}&key=${apiKey}&cx=${cx}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        latestResults = data; 
        displayResults(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    const rawJsonDiv = document.createElement('div');
    rawJsonDiv.classList.add('raw-json');
    rawJsonDiv.innerHTML = `<h2>JSON:</h2><pre>${JSON.stringify(data, null, 2)}</pre>`;
    resultsDiv.appendChild(rawJsonDiv);
}

function saveResults() {
    if (!latestResults) {
        alert('Žiadne výsledky na uloženie.');
        return;
    }
    const blob = new Blob([JSON.stringify(latestResults, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const downloadlink = document.createElement('a');
    downloadlink.href = url;
    downloadlink.download = 'search-results.json';
    document.body.appendChild(downloadlink);
    downloadlink.click();
    document.body.removeChild(downloadlink);
    URL.revokeObjectURL(url);
}