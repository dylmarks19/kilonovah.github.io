/* ===========================================================
   HOLDINGS REGISTRY
   Load this first. Each holding file (e.g. easysmith.js) pushes
   its own record onto window.HOLDINGS. To add a new holding:
     1. Copy holdings/_template.js -> holdings/your-company.js
     2. Fill in the fields
     3. Add one <script src="holdings/your-company.js"></script>
        tag to index.html and portfolio.html, after this file
   Nothing else needs to change — both pages render from this
   array automatically.
   =========================================================== */

window.HOLDINGS = [];
