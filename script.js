document.addEventListener("DOMContentLoaded", () => {
    const queryForm = document.getElementById("query-form");
    const resultsDiv = document.getElementById("results");

    queryForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const inputQuery = document.getElementById("input_query").value;
        const numResults = document.getElementById("num_results").value;
    
        try {
            const response = await fetch(`http://localhost:5000/query?input_query=${encodeURIComponent(inputQuery)}&num_results=${encodeURIComponent(numResults)}`);
            const data = await response.json();

            if (data.error) {
                resultsDiv.innerHTML = `Error: ${data.error}`;
            } else if (Array.isArray(data.similar_items)) {
                // Check if there is already a DataTable instance
                if ($.fn.dataTable.isDataTable('#results-table')) {
                    // Clear the existing DataTable and destroy it
                    $('#results-table').DataTable().clear().destroy();
                }

                // Get the keys from the first item to use as column headers
                const columns = Object.keys(data.similar_items[0]).map(key => ({ title: key, data: key }));

                // Initialize the DataTable
                $('#results-table').DataTable({
                    data: data.similar_items,
                    columns: columns,
                    order: [] // Disable initial sorting
                });
            } else {
                resultsDiv.innerHTML = 'Error: The received data is not in the expected format.';
            }
        } catch (error) {
            resultsDiv.innerHTML = `Error: ${error.message}`;
        }
    });
});
