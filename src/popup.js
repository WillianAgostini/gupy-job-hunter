let hasStarted = false;

export function createPopup(onClick) {
    if (hasStarted) return;
    hasStarted = true;
    document.body.innerHTML += `
    <!-- Popup Structure -->
    <div id="popup" style="display:none; position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); width:300px; padding:20px; background-color:white; box-shadow:0 0 10px rgba(0,0,0,0.1); z-index:1000;">
    <h3>Enter Keywords</h3>
    <textarea id="keywords" rows="5" style="width:100%;"></textarea>
    <button id="findButton" style="margin-top:10px; padding:10px; background-color:#007bff; color:white; border:none; cursor:pointer;">Find</button>
    </div>
    <!-- Overlay to darken the background -->
    <div id="overlay" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background-color:rgba(0,0,0,0.5); z-index:999;"></div>
    <!-- Loading Indicator -->
    <div id="loading" style="display:none; position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); padding:20px; background-color:white; box-shadow:0 0 10px rgba(0,0,0,0.1); z-index:1001;">
    Loading...
    </div>`;

    document.getElementById("findButton").addEventListener("click", onClick);

    document.getElementById("overlay").addEventListener("click", function () {
        document.getElementById("popup").style.display = "none";
        document.getElementById("overlay").style.display = "none";
        document.getElementById("loading").style.display = "none";
    });

}