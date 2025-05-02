
<!-- FILTER UI -->
<div style="margin-bottom: 20px; padding: 15px; background-color: var(--global-card-bg-color); box-shadow: 0 2px 10px rgba(0,0,0,0.1); border-radius: 5px; border: 1px solid var(--global-divider-color);">
  <label for="date-filter" style="font-weight: bold; margin-right: 10px; color: var(--global-text-color);">Date:</label>
  <select id="date-filter" style="padding: 5px; border: 1px solid var(--global-divider-color); color: var(--global-text-color); border-radius: 4px; width: 200px; margin-right: 20px;">
        <option value="apr-08" selected="selected">Apr-08</option>
        <option value="apr-12">Apr-12</option>
  </select>
  
  <label for="aggregation-filter" style="font-weight: bold; margin-right: 10px; color: var(--global-text-color);">Aggregation:</label>
  <select id="aggregation-filter" style="padding: 5px; border: 1px solid var(--global-divider-color); color: var(--global-text-color); border-radius: 4px; width: 200px; margin-right: 20px;">
        <option value="all" selected="selected">All</option>
        <option value="rest_of_world">Rest Of World</option>
        <option value="south_asia">South Asia</option>
        <option value="middle_east_and_north_africa">Middle East And North Africa</option>
        <option value="latin_america">Latin America</option>
        <option value="oceania">Oceania</option>
        <option value="western_europe">Western Europe</option>
        <option value="sub-saharan_africa">Sub-Saharan Africa</option>
        <option value="east_asia">East Asia</option>
        <option value="north_america">North America</option>
        <option value="southeast_asia">Southeast Asia</option>
  </select>
  
  <label for="retaliation_status-filter" style="font-weight: bold; margin-right: 10px; color: var(--global-text-color);">Retaliation Status:</label>
  <select id="retaliation_status-filter" style="padding: 5px; border: 1px solid var(--global-divider-color); color: var(--global-text-color); border-radius: 4px; width: 200px; margin-right: 20px;">
        <option value="all" selected="selected">All</option>
        <option value="no_retal">No Retal</option>
        <option value="retal">Retal</option>
  </select>
  
  <button id="recenter-map" style="margin-left: 10px; padding: 5px 10px; background-color: #grey; color: var(--global-text-color); border: 1px solid var(--global-divider-color); border-radius: 4px; cursor: pointer;">Reset View</button>
</div>

<!-- Debug Display (Hidden) -->
<pre id="debug-info" style="position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.8); padding: 5px; border-radius: 3px; font-size: 12px; z-index: 1000; max-width: 300px; max-height: 200px; overflow: auto; display: none;"></pre>

<!-- DISPLAY SECTIONS -->
<!-- Map Display -->
<div style="position: relative;">
  <div class="l-page">
    <iframe id="map-frame" src="/assets/blog/2025-04-06-us-reciprocal-tariff-measures/all_map.html" 
            frameborder="0" 
            scrolling="no" 
            height="600px" 
            width="100%" 
            style="border: 1px solid var(--global-divider-color); border-radius: 5px; background-color: var(--global-card-bg-color); box-shadow: 0 2px 10px rgba(0,0,0,0.1);"></iframe>
  </div>
</div>
<br>

<!-- Table Display -->
<div class="table-container" style="margin: 30px 0;">
  <iframe id="table-frame" src="/assets/blog/2025-04-06-us-reciprocal-tariff-measures/all_table.html" 
          frameborder="0" 
          scrolling="auto" 
          height="600px" 
          width="100%" 
          style="border: none; border-radius: 5px; background-color: var(--global-card-bg-color); box-shadow: 0 2px 10px rgba(0,0,0,0.1);"></iframe>
</div>

<!-- JavaScript -->
<script>
document.addEventListener('DOMContentLoaded', function () {
  const mapFrame = document.getElementById('map-frame');
  const tableFrame = document.getElementById('table-frame');
  const resetButton = document.getElementById('recenter-map');
  const debugInfo = document.getElementById('debug-info');
  const date_filter = document.getElementById('date-filter');
  const aggregation_filter = document.getElementById('aggregation-filter');
  const retaliation_status_filter = document.getElementById('retaliation_status-filter');

  const basePath = '/assets/blog/2025-04-06-us-reciprocal-tariff-measures/';
  const fallbackMap = '/assets/blog/2025-04-06-us-reciprocal-tariff-measures/all_map.html';
  const fallbackTable = '/assets/blog/2025-04-06-us-reciprocal-tariff-measures/all_table.html';
  const fallbackBarChart = '/assets/blog/2025-04-06-us-reciprocal-tariff-measures/all_bar_chart.html';

  function buildFilename(type) {
    // Build filename exactly matching the export pattern
    let parts = [];

    // Handle Date filter (no 'all' option)
    const date_filter_value = date_filter.value;
    parts.push(date_filter_value);

    // Handle Aggregation filter (with 'all' option)
    const aggregation_filter_value = aggregation_filter.value;
    if (aggregation_filter_value === 'all') {
      parts.push('all_aggregation');
    } else {
      parts.push(aggregation_filter_value);
    }

    // Handle Retaliation Status filter (with 'all' option)
    const retaliation_status_filter_value = retaliation_status_filter.value;
    if (retaliation_status_filter_value === 'all') {
      parts.push('all_retaliation_status');
    } else {
      parts.push(retaliation_status_filter_value);
    }

    // Join parts to create the exact filename
    const filename = parts.join('_') + '_' + type;
    
    // Handle special case for 'all' values in each filter
    let allCount = 0;
    const totalFilters = 3;
    
    // Count how many filters are set to 'all'
    parts.forEach(part => {
      if (part.startsWith('all_')) allCount++;
    });
    
    // If all filters are set to 'all', use the simple 'all' filename
    if (allCount === totalFilters) {
      return 'all_' + type;
    }
    
    // Show the generated filename in console
    console.log('Generated filename:', filename);
    
    return filename;
  }

  function tryLoadIframe(iframe, src, fallbackSrc) {
    if (!iframe) return; // Skip if iframe element doesn't exist
    
    console.log(`Attempting to load: ${src}`);
    
    // Set a timeout for fetch
    const fetchPromise = fetch(src, { method: 'HEAD' });
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Request timed out')), 3000)
    );
    
    Promise.race([fetchPromise, timeoutPromise])
      .then((response) => {
        if (response.ok) {
          console.log(`Successfully found file: ${src}`);
          iframe.src = src;
          
          // Show success in debug info
          if (debugInfo) debugInfo.innerHTML += `<br>✅ Loaded: ${src.split('/').pop()}`;
        } else {
          console.log(`File not found: ${src}, using fallback`);
          
          // Show error in debug info
          if (debugInfo) debugInfo.innerHTML += `<br>❌ Not found: ${src.split('/').pop()}`;
          
          // Use appropriate fallback based on file type
          iframe.src = fallbackSrc;
        }
      })
      .catch((error) => {
        console.log(`Error loading: ${src}, using fallback. Error: ${error.message}`);
        
        // Show error in debug info
        if (debugInfo) debugInfo.innerHTML += `<br>⚠️ Error: ${error.message.substring(0, 50)}`;
        
        // Use appropriate fallback based on file type
        iframe.src = fallbackSrc;
      });
  }

  function updateFrames() {
    // Clear debug info
    if (debugInfo) {
      // Keep debug info hidden by default unless manually toggled
      debugInfo.innerHTML = '<strong>Debug Info:</strong>';
    }
  
    // Generate filenames for each visualization type
    const mapFile = buildFilename('map.html');
    const tableFile = buildFilename('table.html');
    const barChartFile = buildFilename('bar_chart.html');
    
    // Build full paths
    const mapPath = basePath + mapFile;
    const tablePath = basePath + tableFile;
    const barChartPath = basePath + barChartFile;

    // Update iframes with new content if they exist
    tryLoadIframe(mapFrame, mapPath, fallbackMap);
    tryLoadIframe(tableFrame, tablePath, fallbackTable);

    // Display debug info
    if (debugInfo) {
      debugInfo.innerHTML += `<br>🔍 Looking for:<br>`;
      debugInfo.innerHTML += `🗺️ ${mapFile}<br>`;
      debugInfo.innerHTML += `📊 ${tableFile}<br>`;
    }
  }

  // Add event listeners to all filter selects
  date_filter.addEventListener('change', updateFrames);
  aggregation_filter.addEventListener('change', updateFrames);
  retaliation_status_filter.addEventListener('change', updateFrames);

  resetButton.addEventListener('click', function () {
    // Reset all filters to their first option (which might be 'all' if applicable)
    date_filter.selectedIndex = 0;
    aggregation_filter.selectedIndex = 0;
    retaliation_status_filter.selectedIndex = 0;
    updateFrames();
  });

  // Add debug toggle
  document.addEventListener('keydown', function(e) {
    // Press Ctrl+D to show/hide debug info
    if (e.ctrlKey && e.key === 'd' && debugInfo) {
      debugInfo.style.display = debugInfo.style.display === 'none' ? 'block' : 'none';
      e.preventDefault();
    }
  });

  // Initial load
  if (debugInfo) debugInfo.style.display = 'none'; // Hide debug by default
  updateFrames();
});
</script>

<style>
  /* Fallback styles */
  select, button {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  /* Make iframes responsive */
  @media (max-width: 768px) {
    iframe {
      height: 450px !important;
    }
    
    #debug-info {
      font-size: 10px !important;
      max-width: 200px !important;
    }
  }
</style>

<!-- Hidden note for users: Press Ctrl+D to show/hide debug info -->
