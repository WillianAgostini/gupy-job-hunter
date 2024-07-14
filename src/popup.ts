import Tagify from "@yaireo/tagify";

export function createPopup(onClick: { (): Promise<void>; (this: HTMLElement, ev: MouseEvent): any }) {
    const popup = document.createElement("div");
    popup.id = "popup";
    popup.style.display = "none";
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.width = "300px";
    popup.style.padding = "20px";
    popup.style.backgroundColor = "white";
    popup.style.boxShadow = "0 0 10px rgba(0,0,0,0.1)";
    popup.style.zIndex = "1000";
    popup.innerHTML = `
        <h3>Enter Keywords</h3>
        <input id='keywords' value='' autofocus>
        <button id="findButton" style="margin-top:10px; padding:10px; background-color:#007bff; color:white; border:none; cursor:pointer;">Find</button>
    `;

    const overlay = document.createElement("div");
    overlay.id = "overlay";
    overlay.style.display = "none";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
    overlay.style.zIndex = "999";

    const loading = document.createElement("div");
    loading.id = "loading";
    loading.style.display = "none";
    loading.style.position = "fixed";
    loading.style.top = "50%";
    loading.style.left = "50%";
    loading.style.transform = "translate(-50%, -50%)";
    loading.style.padding = "20px";
    loading.style.backgroundColor = "white";
    loading.style.boxShadow = "0 0 10px rgba(0,0,0,0.1)";
    loading.style.zIndex = "1001";
    loading.textContent = "Loading...";

    document.body.appendChild(popup);
    document.body.appendChild(overlay);
    document.body.appendChild(loading);

    const keywordComponent = createKeywordComponent();

    document.getElementById("findButton")?.addEventListener("click", onClick);

    document.getElementById("overlay")?.addEventListener("click", function () {
        document.getElementById("popup")!.style.display = "none";
        document.getElementById("overlay")!.style.display = "none";
        document.getElementById("loading")!.style.display = "none";
    });

    return { keywordComponent };
}
function createKeywordComponent() {
    const keywords = document.getElementById("keywords") as HTMLInputElement;
    const keywordComponent = new Tagify(keywords, {
        id: "keywords",
    });
    return keywordComponent;
}