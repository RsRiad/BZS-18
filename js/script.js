const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

//voca buttons

const loadSections = () => {
  fetch("./json/sections.json")
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      displaySections(data);
    });
};
let activeButton = null;
const displaySections = (sections) => {
  const btnContainer = document.getElementById("sections");
  const names = sections.data;
  //console.log(names);
  names.forEach((element) => {
    // console.log(element)
    let div = document.createElement("div");
    div.innerHTML = `
        <button class="btn btn-outline btn-primary" id="${element.id}">
        <i class="fa-solid fa-book-open"></i>${element.sectionName} 
        </button>
       `;
    btnContainer.appendChild(div);

    let button = div.querySelector(".btn");
    button.addEventListener("click", () => {
      if (activeButton) {
        activeButton.classList.remove("btn-active");
      }
      button.classList.add("btn-active");
      activeButton = button;
      loadContacts(element.section_no);
    });
  });
};

const loadContacts = (id) => {
  //console.log(id);
  fetch(`./json/section-${id}.json`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      displayContacts(data.data);
    });
};

const displayContacts = (contact) => {
  const contactArea = document.getElementById("contacts-container");
  contactArea.innerHTML = ``;

  if (contact.length == 0) {
    document.getElementById("contacts-container").classList.remove("grid");
    document.getElementById("no-lesson").classList.add("hidden");
    contactArea.innerHTML = `
      <div class="bg-gray-50 text-center py-20 rounded-2xl grid place-items-center gap-3">
        <img src="./assets/alert-error.png" alt="alert">
        <p class="text-sm text-gray-400">এই Lesson এ এখনো কোন Contacts যুক্ত করা হয়নি।</p>
        <h1 class="text-2xl">নেক্সট Section এ যান</h1>
      </div>
    `;
    return;
  }

  contact.forEach((man) => {
    document.getElementById("no-contact").classList.add("hidden");
    let div = document.createElement("div");

    div.innerHTML = `
      <div class="contact-box p-5 border-4 border-red-300 items-center bg-white rounded-lg shadow-lg">
        <div class="text-center">
          <!-- Avatar -->
          <div class="avatar flex justify-center mb-4">
            <div class="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
              <img src="./assets/profile.png" alt="User Avatar" />
            </div>
          </div>

          <!-- Name -->
          <h1 class="font-bold text-xl mb-2" id="name">${man.name}</h1>

          <!-- Phone Number -->
          <div class="flex justify-center">
            <div class="input m-2 font-bold rounded-2xl">
              <div class="flex items-center">
                <i class="fa-solid fa-address-book mr-3"></i>
                <input id="number" disabled value="${man.phone}" class="w-48 sm:w-72 p-2 " type="text" placeholder="017********" />
              </div>
            </div>
          </div>

          <!-- Buttons: Call & Copy -->
          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <button id="call" class="btn bg-[#FF9900] text-black border-[#e17d00] w-full sm:w-auto flex items-center justify-center py-2 px-4 rounded-lg">
            <a href="tel:${man.phone}" class="btn bg-[#FF9900] text-black border-[#e17d00] w-full sm:w-auto flex items-center justify-center py-2 px-4 rounded-lg">
              <i class="fa-solid fa-phone mr-2"></i> Call
            </button>
            <button id="${man.id}" onClick="cpy('${man.phone}')" class="btn bg-[#FF9900] text-black border-[#e17d00] w-full sm:w-auto flex items-center justify-center py-2 px-4 rounded-lg">
              <i class="fa-solid fa-copy mr-2"></i> Copy Number
            </button>
          </div>
        </div>
      </div>
    `;

    contactArea.appendChild(div);
  });
};

// Copy to clipboard function
const cpy = (phoneNumber) => {
  navigator.clipboard
    .writeText(phoneNumber)
    .then(() => {
      Swal.fire(
        "Copy Successful",
        `Phone number ${phoneNumber} copied to clipboard!`,
        "success"
      );
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
      Swal.fire(
        "Copy Failed",
        "Something went wrong, please try again.",
        "error"
      );
    });
};

loadSections();
