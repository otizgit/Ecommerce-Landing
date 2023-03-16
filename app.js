// Data:
const product = [
  { name: "Fall Limited Edition Sneakers" },
  { price: 125 },
  { image: "./images/image-product-1.jpg" },
];

// The incrementing and decrementing:
const track = document.querySelector(".track");
const trackNum = track.querySelector(".track-number");

track.addEventListener("click", function (e) {
  let target = e.target.id;
  if (target) {
    switch (e.target.id) {
      case "plus":
        trackNum.innerText = parseInt(trackNum.innerText) + 1;
        break;
      case "minus":
        trackNum.innerText = parseInt(trackNum.innerText) - 1;
        if (parseInt(trackNum.innerText) < 1) {
          trackNum.innerText = "0";
        }
    }
  }
});

// The hamburger:
const hamburger = document.querySelector(".hamburger");
const links = document.querySelector("nav ul");
const navOverlay = document.querySelector(".nav-overlay");
const hamburgerCloseBtn = document.querySelector(".hamburger-close");

hamburger.addEventListener("click", function () {
  links.classList.toggle("show-nav");
  navOverlay.classList.toggle("show-nav-overlay");
});

// Close the nav overlay:
function closeNavOverlay() {
  navOverlay.classList.remove("show-nav-overlay");
  links.classList.remove("show-nav");
}

hamburgerCloseBtn.addEventListener("click", closeNavOverlay);
navOverlay.addEventListener("click", closeNavOverlay);

// Set the top position of the cart box:
const header = document.querySelector("header");
const headerHeight = header.getBoundingClientRect().height;

const cartBox = document.querySelector(".cart-box");
cartBox.style.top = headerHeight + 10 + "px";

// Add element to cart:
const addBtn = document.querySelector(".add-btn");
const cart = document.querySelector(".cart");
const cartContainer = document.querySelector(".cart-container");
let itemState = false;

// Open and close the cart:
cart.addEventListener("click", function () {
  cartBox.classList.toggle("show-cart-box");
});

function checkItemState() {
  if (itemState) {
    alert("This item is already in the cart.");
    addBtn.removeEventListener();
  }
}

addBtn.addEventListener("click", function () {
  checkItemState();

  if (trackNum.innerText === "0") {
    alert("Please select an amount for this item.");
  } else {
    itemState = true;
    alert("Item added to cart.");

    const cartCount = document.createElement("div");
    cartCount.classList.add("cart-count");
    cartCount.innerText = trackNum.innerText;
    cart.append(cartCount);

    const cartNotification = cartContainer.querySelector(".cart-notification");
    cartNotification.style.display = "none";

    const itemContainer = document.createElement("div");
    itemContainer.innerHTML = `
    <div class="item-content">
    <img class="cart-item-image" src=${product[2].image} alt="product">
    <div class="item-info">
        <p class="item-name">${product[0].name}</p>
        <p class="item-price">$${
          product[1].price
        } x <span class="selected-items">${
      cartCount.innerText
    } = </span> <span class="total-price">$${eval(
      product[1].price * Number(cartCount.innerText)
    )}.00</span></p>
    </div>
    <div class="delete-btn"><img src="./images/icon-delete.svg" alt="delete-btn"></div>
    </div>
    <button class="checkout">Checkout</button>`;

    cartContainer.appendChild(itemContainer);

    // Clicking the checkout button:
    const checkout = itemContainer.querySelector(".checkout");
    checkout.addEventListener("click", function () {
      alert(
        "Thanks for purchasing this product, your order will be processed shortly."
      );
      removeItem();
    });

    // Removing the cart item:
    const deleteBtn = itemContainer.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", function () {
      removeItem();
    });

    function removeItem() {
      itemState = false;
      itemContainer.classList.add("slide-off");
      itemContainer.addEventListener("animationend", function () {
        this.remove();
      });
      setTimeout(() => {
        cartNotification.style.display = "block";
        cart.removeChild(cartCount);
      }, 700);
    }
  }
});

// Opening and Closing the overlay for images:
const mainImages = [
  "./images/image-product-1.jpg",
  "./images/image-product-2.jpg",
  "./images/image-product-3.jpg",
  "./images/image-product-4.jpg",
];

let counter = 0;

const overlay = document.querySelector(".overlay");
const overlayImg = overlay.querySelector(".overlay-img");

const images = document.querySelectorAll(".images");
const closeBtn = document.querySelector(".close-btn");

images.forEach(function (image) {
  image.addEventListener("click", function () {
    overlayImg.src = mainImages[counter];
    overlay.classList.add("show-overlay");

    const rightBtn = overlay.querySelector(".right-btn");
    const leftBtn = overlay.querySelector(".left-btn");

    rightBtn.addEventListener("click", function () {
      counter++;
      overlayImageSwitch();
    });

    leftBtn.addEventListener("click", function () {
      counter--;
      overlayImageSwitch();
    });
  });
});

const imagesTray = document.querySelectorAll(".images-tray img");

function overlayImageSwitch() {
  if (counter > mainImages.length - 1) {
    counter = 0;
  }
  if (counter < 0) {
    counter = mainImages.length - 1;
  }
  overlayImg.src = mainImages[counter];

  imagesTray.forEach(function (image, index) {
    image.classList.remove("active-image");
  });

  imagesTray[counter].classList.add("active-image");
}

// Clicking on each image:
imagesTray.forEach(function (image, index) {
  image.addEventListener("click", function () {
    counter = index;
    overlayImageSwitch();
  });
});

overlay.addEventListener("click", function (e) {
  if (e.target === overlay) {
    removeOverlay();
  }
});

function removeOverlay() {
  overlay.classList.remove("show-overlay");
}
