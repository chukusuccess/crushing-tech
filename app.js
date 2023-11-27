"use strict";

// ------------ GET DOM ELEMENTS ------------ //
const toggleAccordion = document.getElementById("expand-setup-guide-panel");
const progressNumber = document.getElementById("progress-number");
const progressContainer = document.getElementById("progress-container");
const progressBar = document.getElementById("progress-bar");
const allStepsContainer = document.getElementById("setup-guide-steps");
const stepCheckbox = document.getElementById("step-checkbox");
const stepInformation = document.getElementById("step-information");
const stepImage = document.getElementById("step-image");
const adDismissButton = document.getElementById("dismiss-button");
const mainSection = document.getElementById("main-section");
const ad = document.getElementById("plan-card");
const notificationsButton = document.getElementById("notifications-button");
const profileButton = document.getElementById("profile-button");
const profile = document.getElementById("profile");
const notifications = document.getElementById("notifications");
const shopName = document.getElementById("shop-name");
const modalShopName = document.getElementById("modal-shop-name");
const userId = document.getElementById("user-id");
const modalUserId = document.getElementById("modal-user-id");

// ------------ LOGGED-IN USER (DUMMY) ------------ //
let user = {
  fullName: "David Michael",
  email: "davidmichael@gmail.com",
  shopName: "Davii Collections",
  hasNotifications: false,
  authenticated: true,
};

// ------------ STEPS DATA ------------ //
let stepsData = [
  {
    elementId: "step1",
    stepNumber: 1,
    stepTitle: "Customize your online store",
    stepDescription:
      "Choose a theme and add your logo, colors, and images to reflect your brand.",
    stepImage:
      "https://res.cloudinary.com/dtqx2jvcg/image/upload/v1700815802/shopify/rsjufwrvpz4q6igyupnz.png",
    stepImageAlt: "Step1: Customize your online store",
    showDescription: true,
    completed: false,
    learnMore:
      "https://help.shopify.com/en/manual/online-store/themes/customizing-themes",
    actionButton: "Customize theme",
    nextAction: "",
  },
  {
    elementId: "step2",
    stepNumber: 2,
    stepTitle: "Add your first product",
    stepDescription:
      "Write a description, add photos, and set pricing for the products you plan to sell.",
    stepImage:
      "https://res.cloudinary.com/dtqx2jvcg/image/upload/v1700815802/shopify/cnsrzpyqtlvi4zto8vsy.png",
    stepImageAlt: "Step2: Add your first product",
    showDescription: false,
    completed: false,
    learnMore:
      "https://help.shopify.com/en/manual/products/add-update-products",
    actionButton: "Add product",
    nextAction: "Import product",
  },
  {
    elementId: "step3",
    stepNumber: 3,
    stepTitle: "Add a custom domain",
    stepDescription:
      "Your current domain is 222219.myshopify.com but you can add a custom domain to help customers find your online store.",
    stepImage:
      "https://res.cloudinary.com/dtqx2jvcg/image/upload/v1700815802/shopify/ovulc4mlotc2vpxhaes6.png",
    stepImageAlt: "Step3: Add a custom domain",
    showDescription: false,
    completed: false,
    learnMore: "https://help.shopify.com/en/manual/domains",
    actionButton: "Add domain",
    nextAction: "",
  },
  {
    elementId: "step4",
    stepNumber: 4,
    stepTitle: "Name your store",
    stepDescription:
      "Your temporary store name is currently Davii collections. The store name appears in your admin and your online store",
    stepImage:
      "https://res.cloudinary.com/dtqx2jvcg/image/upload/v1700815802/shopify/adefn3e55lbidzhiipii.png",
    stepImageAlt: "Step4: Name your store",
    showDescription: false,
    completed: false,
    learnMore:
      "https://help.shopify.com/en/manual/intro-to-shopify/initial-setup/setup-business-settings#set-or-change-your-online-store-name-and-legal-business-name",
    actionButton: "Name store",
    nextAction: "",
  },
  {
    elementId: "step5",
    stepNumber: 5,
    stepTitle: "Set up a payment provider",
    stepDescription:
      "Choose a payment provider to start accepting payments. You will need to create an account with the payment provider and set it up with your Shopify store.",
    stepImage:
      "https://res.cloudinary.com/dtqx2jvcg/image/upload/v1700815802/shopify/hzomiojgdxg4f77jkb6o.png",
    stepImageAlt: "Step5: Set up a payment provider",
    showDescription: false,
    completed: false,
    learnMore: "https://help.shopify.com/en/manual/payments",
    actionButton: "Set up payment",
    nextAction: "",
  },
];

// ------------ CREATE USER PROFILE ------------ //
const createUserProfile = async (user) => {
  try {
    user.userID = await user.shopName
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase();
    userId.innerHTML = user.userID;
    modalUserId.innerHTML = user.userID;
    shopName.innerHTML = user.shopName;
    modalShopName.innerHTML = user.shopName;
  } catch (error) {
    console.log(error);
    alert("Oops! failed to login dummy user \n Please refresh page.");
  } finally {
    return user;
  }
};
window.addEventListener("load", function () {
  createUserProfile(user);
});

// ------------ DISMISS AD ------------ //
adDismissButton.addEventListener("click", () => {
  try {
    ad.classList.add("fade-out");
    mainSection.style.cssText = "padding: 0px 0px;";
  } catch (error) {
    console.log(error);
    alert("Oops!, cannot dismiss ad");
  }
});

// ------------ TOGGLE ACCORDION AND GENERATE STEP CARDS ------------ //
toggleAccordion.addEventListener("click", () => {
  stepsData.map((item, index) => {
    try {
      allStepsContainer.insertAdjacentHTML(
        "beforeend",
        `
              <li aria-description="Step guide ${item.stepNumber}: ${
          item.stepTitle
        }" tabindex="0" id="${
          item.elementId
        }" onclick="handleStepGuides(this.id, event)"
        onkeydown="handleStepGuides(this.id, event)"
              style="${
                index > 0
                  ? "background: #ffffff; overflow: hidden; height: 40px; cursor: pointer;"
                  : "display: flex; background: #f3f3f3; overflow: visible; min-height: fit-content; cursor: pointer;"
              }" class="step">
                  <div>
                      <svg
                      tabindex="0"
                      role="checkbox" id="step-checkbox${
                        item.stepNumber
                      }" onclick="handleCompleted(event, ${item.elementId}, ${
          item.stepNumber
        }, ${item.completed})"
                        onkeydown="handleCompleted(event, ${item.elementId}, ${
          item.stepNumber
        }, ${item.completed})"
                        style="display: ${
                          item.completed === true ? "none" : "flex"
                        }"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 32 32"
                      fill="none"
                      >
                      <title>Checkbox for ${item.stepTitle}</title>
                          <circle
                          cx="16"
                          cy="16"
                          r="12"
                          stroke="#8a8a8a"
                          stroke-width="2.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-dasharray="4 6"
                          />
                      </svg>
                      <svg
                      tabindex="0"
                      role="checkbox" id="step-checkbox-checked${
                        item.stepNumber
                      }" onclick="reverseCompleted(event, ${item.elementId}, ${
          item.stepNumber
        }, ${item.completed})"
                        onkeydown="reverseCompleted(event, ${item.elementId}, ${
          item.stepNumber
        }, ${item.completed})"
                        style="display: ${
                          item.completed === true ? "flex" : "none"
                        }"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                    <title>You have marked this checkbox for ${
                      item.stepTitle
                    }</title>
                      <circle cx="12" cy="12" r="10" fill="#303030"></circle>
                      <path
                        d="M17.2738 8.52629C17.6643 8.91682 17.6643 9.54998 17.2738 9.94051L11.4405 15.7738C11.05 16.1644 10.4168 16.1644 10.0263 15.7738L7.3596 13.1072C6.96908 12.7166 6.96908 12.0835 7.3596 11.693C7.75013 11.3024 8.38329 11.3024 8.77382 11.693L10.7334 13.6525L15.8596 8.52629C16.2501 8.13577 16.8833 8.13577 17.2738 8.52629Z"
                        fill="#fff"
                      ></path>
                    </svg>
                  </div>
                  <div id="step-information">
                      <h3>${item.stepTitle}</h3>
                      <summary aria-hidden="true" tabindex="-1" id="summary${
                        item.stepNumber
                      }" >
                      ${item.stepDescription}
                      </summary>
                      <a aria-hidden="true" tabindex="-1" id="link${
                        item.stepNumber
                      }" 
                      href=${item.learnMore}
                      target="_blank"
                      >
                      Learn more
                      </a>
                      <div id="btn-div${
                        item.stepNumber
                      }" aria-hidden="true" tabindex="-1" >
                          <button aria-hidden="true" tabindex="-1"  id="first-button">${
                            item.actionButton
                          }</button>
                          ${
                            item.nextAction
                              ? `<button aria-hidden="true" tabindex="-1"  id="second-button">${item.nextAction}</button>`
                              : ""
                          }
                      </div>
                  </div>
                  <div id="step-image">
                  <div></div>
                      <img
                      id="img${item.stepNumber}"
                      style="${index > 0 ? "display: none;" : "display: flex;"}"
                      src=${item.stepImage}
                      alt=${item.stepImageAlt}
                      />
                  </div>
              </li>
              `
      );
    } catch (error) {
      console.log(error);
      alert("Oops!, Error loading setup guides. \n Please refresh page.");
    }
  });

  allStepsContainer.classList.toggle("hide");
  allStepsContainer.classList.toggle("full-height");
  toggleAccordion.classList.toggle("rotate");
  if (allStepsContainer.classList.contains("hide")) {
    allStepsContainer.innerHTML = "";
    return;
  }
  return;
});

// ------------ CONDITIONALLY ALLOW ACCESSIBILITY ------------ //
const isStepAccessible = (elementId) => {
  const element = document.getElementById(elementId);

  const computedStyle = window.getComputedStyle(element);

  const isBackgroundWhite = computedStyle.backgroundColor === "#ffffff";
  const isOverflowHidden = computedStyle.overflow === "hidden";
  const isHeight40px = computedStyle.height === "40px";
  const isCursorPointer = computedStyle.cursor === "pointer";

  if (
    isBackgroundWhite &&
    isOverflowHidden &&
    isHeight40px &&
    isCursorPointer
  ) {
    element.tabIndex === -1;
    element.ariaHidden === true;
  } else {
    element.tabIndex === 0;
    element.ariaHidden === false;
  }
  return elementId;
};

// ------------ TOGGLE STEP-GUIDE STEPS ------------ //
const handleStepGuides = (stepId, event) => {
  if (
    event.type === "click" ||
    (event.type === "keydown" && event.key === "Enter") ||
    (event.type === "keydown" && event.key === " ")
  ) {
    try {
      stepsData.map((item) => {
        document.getElementById(`img${item.stepNumber}`).style.cssText =
          "display: none;";
        document.getElementById(`step${item.stepNumber}`).style.cssText =
          "background: #ffffff; overflow: hidden; height: 40px; cursor: pointer;";
      });
      document.getElementById(stepId).style.cssText =
        "display: flex; background: #f3f3f3; overflow: visible; min-height: fit-content; cursor: pointer;";
      document.getElementById(
        `${stepId.replace("step", "img")}`
      ).style.cssText = "display: flex;";
    } catch (error) {
      console.log(error);
      alert(
        "Oops!, There was a problem navigating step guides. \n Please refresh page."
      );
    }
  }
};

// ------------ TOGGLE PROFILE ------------ //
profileButton.addEventListener("click", (event) => {
  event.stopPropagation();
  notifications.classList.add("hide");
  profile.classList.toggle("hide");
});

// ------------ CHECK IF CLICK OCCURED OUTSIDE PROFILE MODAL ------------ //
const isClickOutsideProfileModal = (event) => {
  return !profile.contains(event.target);
};

// ------------ ENSURE ONLY PROFILE MODAL IS OPEN AT A TIME ------------ //
document.addEventListener("click", (event) => {
  isClickOutsideProfileModal(event)
    ? profile.classList.add("hide")
    : profile.classList.remove("hide");
});

// ------------ TOGGLE NOTIFICATIONS ------------ //
notificationsButton.addEventListener("click", (event) => {
  event.stopPropagation();
  profile.classList.add("hide");
  notifications.classList.toggle("hide");
});

// ------------ STOP NOTIFICATIONS CLICK PROPAGATION ------------ //
notifications.addEventListener("click", (event) => {
  event.stopPropagation();
});

// ------------ CHECK IF CLICK OCCURED OUTSIDE NOTIFICATIONS MODAL ------------ //
const isClickOutsideNotificationsModal = (event) => {
  return !notifications.contains(event.target);
};

// ------------ ENSURE ONLY NOTIFICATIONS MODAL IS OPEN AT A TIME ------------ //
document.addEventListener("click", (event) => {
  isClickOutsideNotificationsModal(event)
    ? notifications.classList.add("hide")
    : notifications.classList.remove("hide");
});

// ------------ TRACK COMPLETED STEPS ------------ //
let completedSteps = [];
let count = 0;
let barPercentage = 0;

const updateProgress = (value) => {
  if (value === "increase") {
    count = count + 1;
    barPercentage = barPercentage + 100 / stepsData.length;
    progressNumber.innerHTML = `${count} / ${stepsData.length} completed`;
    progressBar.style.cssText = `width: ${barPercentage}%`;
    progressBar.setAttribute("aria-valuenow", barPercentage);
  }

  if (value === "decrease") {
    count = count - 1;
    barPercentage = barPercentage - 100 / stepsData.length;
    progressNumber.innerHTML = `${count} / ${stepsData.length} completed`;
    progressBar.style.cssText = `width: ${barPercentage}%`;
    progressBar.setAttribute("aria-valuenow", barPercentage);
  }
  return;
};

const handleCompleted = (event, _elementId, stepNumber, _completed) => {
  event.stopPropagation();
  if (
    event.type === "click" ||
    (event.type === "keydown" && event.key === "Enter") ||
    (event.type === "keydown" && event.key === " ")
  ) {
    document.getElementById(`step-checkbox${stepNumber}`).style.cssText =
      "display: none;";
    document.getElementById(
      `step-checkbox-checked${stepNumber}`
    ).style.cssText = "display: block;";
    stepsData.forEach((item) => {
      stepNumber === item.stepNumber ? (item.completed = true) : null;
      document.getElementById(`img${item.stepNumber}`).style.cssText =
        "display: none;";
      document.getElementById(item.elementId).style.cssText =
        "background: #ffffff; overflow: hidden; height: 40px; cursor: pointer;";
    });
    try {
      for (let count = 0; count < stepsData.length; count++) {
        if (stepsData[count].completed === false) {
          document.getElementById(
            `${stepsData[count].elementId}`
          ).style.cssText =
            "display: flex; background: #f3f3f3; overflow: visible; min-height: fit-content; cursor: pointer;";
          document.getElementById(
            `img${stepsData[count].stepNumber}`
          ).style.cssText = "display: flex;";
          break;
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      updateProgress("increase");
    }
  }
};

const reverseCompleted = (event, elementId, stepNumber, _completed) => {
  event.stopPropagation();
  if (
    event.type === "click" ||
    (event.type === "keydown" && event.key === "Enter") ||
    (event.type === "keydown" && event.key === " ")
  ) {
    document.getElementById(`step-checkbox${stepNumber}`).style.cssText =
      "display: block;";
    document.getElementById(
      `step-checkbox-checked${stepNumber}`
    ).style.cssText = "display: none;";
    stepsData.forEach((item) => {
      stepNumber === item.stepNumber ? (item.completed = false) : null;
      document.getElementById(`img${item.stepNumber}`).style.cssText =
        "display: none;";
      document.getElementById(item.elementId).style.cssText =
        "background: #ffffff; overflow: hidden; height: 40px; cursor: pointer;";
    });
    try {
      for (let count = 0; count < stepsData.length; count++) {
        if (stepsData[count].completed === true) {
          document.getElementById(
            `${stepsData[count].elementId}`
          ).style.cssText =
            "display: flex; background: #f3f3f3; overflow: visible; min-height: fit-content; cursor: pointer;";
          document.getElementById(
            `img${stepsData[count].stepNumber}`
          ).style.cssText = "display: none;";
          break;
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      updateProgress("decrease");
    }
  }
};

// ------------ RETRIEVE USER CHECKED STEPS TO BE SENT TO BACKEND ------------ //
