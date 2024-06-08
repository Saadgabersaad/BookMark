var webSiteName = document.getElementById("siteName");
var webSiteUrl = document.getElementById("webURL");
var btn = document.getElementById("btn");
var deleteBtn = document.getElementById("deleteBtn");
wList = [];
// ?111111111111111111111111111111111

if (localStorage.getItem("web") !== null) {
  wList = JSON.parse(localStorage.getItem("web"));
  displayUrl();
} else {
  wList = [];
}

function addWeb() {
  if (webSiteName.value == "" || webSiteUrl.value == "") return;

  var webURL = {
    name: webSiteName.value,
    wURL: webSiteUrl.value,
  };
  wList.push(webURL);
  console.log(wList);
  displayUrl();
  clearForm();
  localStorage.setItem("web", JSON.stringify(wList));
  addHttps();
}
btn.addEventListener("click", addWeb);

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function displayUrl() {
  var string = "";
  for (let i = 0; i < wList.length; i++) {
    string += `<tr ">
    <td> ${[i + 1]}</td>
    <td> ${wList[i].name}</td>

    <td> <a target="_blank"  href="${
      wList[i].wURL
    }">Visit<i class="fa-solid fa-eye pe-2"></i> </a> </td>
   <td> <button id='deleteBtn' onclick="deleteWebSite(${i})" class="btn btn-outline-warning"><i class="fa-solid fa-trash-can"></i> Delete</button> </td>
    </tr>
    `;
  }
  rowData.innerHTML = string;
}

// ??!!!!!!!!!!!? Clear form

function clearForm() {
  webSiteName.value = "";
  webSiteUrl.value = "";
}
// !!!!!!!!!!!!!!!!!!!!!!!!!!

function deleteWebSite(index) {
  wList.splice(index, 1);
  displayUrl();
  localStorage.setItem("web", JSON.stringify(wList));
}
// ???/
function addHttps() {
  if (!webSiteUrl.value.startsWith("https://")) {
    webSiteUrl.value = "https://www." + webSiteUrl.value;
  }
}
