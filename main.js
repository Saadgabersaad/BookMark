var webSiteName = document.getElementById("siteName");
var webSiteUrl = document.getElementById("webURL");
var btn = document.getElementById("btn");
var deleteBtn = document.getElementById("deleteBtn");
var closeBtn = document.getElementById("closeBtn");
var boxModal = document.querySelector(".box-info");
wList = [];
// ?111111111111111111111111111111111

if (localStorage.getItem("web") !== null) {
  wList = JSON.parse(localStorage.getItem("web"));
  displayUrl();
} else {
  wList = [];
}

function addWeb() {
  if (webSiteName.value == "" || webSiteUrl.value == "") {
    boxModal.classList.remove("d-none");
    return;
  }

  console.log(validateURL(webSiteUrl.value));

  if (validateURL(webSiteUrl.value) == false) {
    check();
    boxModal.classList.remove("d-none");
    return;
  }
  if (validateName(webSiteName.value) == false) {
    checkName();
    boxModal.classList.remove("d-none");
    return;
  }

  var webURL = {
    name: webSiteName.value,
    wURL: addHttps(webSiteUrl.value),
  };
  wList.push(webURL);
  console.log(wList);
  displayUrl();
  clearForm();

  localStorage.setItem("web", JSON.stringify(wList));
}
btn.addEventListener("click", addWeb);

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function displayUrl() {
  var string = "";
  for (let i = 0; i < wList.length; i++) {
    string += `<tr ">
    <td> ${[i + 1]}</td>
    <td> ${wList[i].name}</td>

    <td>  <button class=" btn-visit btn "> <a class="text-decoration-none text-white" target="_blank"  href="${
      wList[i].wURL
    }"><i class="fa-solid fa-eye pe-2"></i>Visit </a> </button> </td>
   <td> <button id='deleteBtn' onclick="deleteWebSite(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> Delete</button> </td>
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

function addHttps(value) {
  if (value) {
    return "https://www." + value;
  }

  return value;
}

function validateURL(value) {
  const validator = /^[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;
  return validator.test(value);
}

function validateName(nVlaue) {
  const validator1 = /^\w{3,}(\s+\w+)*$/;
  return validator1.test(nVlaue);
}
webSiteName.addEventListener("input", checkName);
webSiteUrl.addEventListener("input", check);

function check() {
  webSiteUrl;
  webSiteUrl.classList.remove("is-valid", "is-invalid");
  if (validateURL(webSiteUrl.value)) {
    webSiteUrl.classList.add("is-valid");
    webSiteUrl.nextElementSibling.classList.replace("d-block", "d-none");
  } else {
    webSiteUrl.classList.add("is-invalid");

    webSiteUrl.nextElementSibling.classList.replace("d-none", "d-block");
  }
}
function checkName() {
  webSiteName;
  webSiteName.classList.remove("is-valid", "is-invalid");
  if (validateName(webSiteName.value)) {
    webSiteName.classList.add("is-valid");
    webSiteName.nextElementSibling.classList.replace("d-block", "d-none");
  } else {
    webSiteName.classList.add("is-invalid");
    webSiteName.nextElementSibling.classList.replace("d-none", "d-block");
  }
}

function closeModal() {
  boxModal.classList.add("d-none");
}

// 3 ways to close modal => close button -  Esc key - clicking outside modal

closeBtn.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key == "Escape") {
    closeModal();
  }
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("box-info")) {
    closeModal();
  }
});
