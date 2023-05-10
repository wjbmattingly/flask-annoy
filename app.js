document.addEventListener("DOMContentLoaded", () => {
  const queryForm = document.getElementById("query-form");

  // Initialize the DataTable
  let dataTable = $('#results-table').DataTable({
      columns: [], // Initialize with empty columns
      order: [], // Disable initial sorting
      dom: 'Bfrtip',
      buttons: [
          {
              extend: 'csvHtml5',
              text: 'Download CSV',
              exportOptions: {
                  modifier: {
                      search: 'applied',
                      order: 'applied'
                  }
              }
          }
      ]
  });

  queryForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const inputQuery = document.getElementById("input_query").value;
      const numResults = document.getElementById("num_results").value;

      try {
          const response = await fetch(`https://streamlit.as.uky.edu/flask-annoy/query?input_query=${encodeURIComponent(inputQuery)}&num_results=${encodeURIComponent(numResults)}`);
          const data = await response.json();

          if (data.error) {
              dataTable.clear().draw();
          } else if (Array.isArray(data.similar_items)) {
              // Get the keys from the first item to use as column headers
              const columns = Object.keys(data.similar_items[0]).map(key => {
                  if (key === 'rg') {
                      return {
                          title: key,
                          data: key,
                          render: function(data, type, row, meta) {
                              if (type === 'display') {
                                  data = '<a href="/testimonies/' + row.rg.replace (/\./g, "_") + '.html#' + row.sequence + '" target="_blank">' + data + '</a>';
                              }
                              return data;
                          }
                      }
                  } else if (key === 'link') {
                      return { title: key, data: key, visible: false };
                  } else {
                      return { title: key, data: key };
                  }
              });

              // Update the columns and data
              dataTable.clear();
              dataTable.destroy();
              dataTable = $('#results-table').DataTable({
                  data: data.similar_items,
                  columns: columns,
                  order: [],
                  autoWidth: false,
                  dom: 'Bfrtip',
                  buttons: [
                      {
                          extend: 'csvHtml5',
                          text: 'Download CSV',
                          exportOptions: {
                              modifier: {
                                  search: 'applied',
                                  order: 'applied'
                              }
                          }
                      }
                  ]
              });

              // Adjust column sizes after updating the data
              dataTable.columns.adjust().draw();
          } else {
              dataTable.clear().draw();
          }
      } catch (error) {
          dataTable.clear().draw();
      }
  });
});
