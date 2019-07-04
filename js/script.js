class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement; // The text element to show the typing texts
    this.words = words; // The words that are passed in
    this.txt = ""; // the output letter
    this.wordIndex = 0; // index of the words from the array of words
    this.wait = parseInt(wait, 10);
    this.type(); // method for the typing functionality
    this.isDeleting = false; // the state when the word is deleting after typing
  }

  type() {
    //  Get current index of word
    const current = this.wordIndex % this.words.length;

    // Get full text of current word
    const fullTxt = this.words[current];

    // Check if deleting
    if (this.isDeleting) {
      // Remove a char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add a char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into Element
    this.txtElement.innerHTML = `<br><span class="txt">${this.txt}</span>`;

    // Initial Type Speed
    let typeSpeed = 100;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    // if word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // Pause typing at end of a word
      typeSpeed = this.wait;
      // Set this.isDeleting to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      // after deleting the word
      this.isDeleting = false;
      // move to next word
      this.wordIndex++;

      // Pause before start typing
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Init on DOM load
document.addEventListener("DOMContentLoaded", init);

// Init App
function init() {
  const txtElement = document.querySelector(".txt-type"),
    // words = JSON.parse(txtElement.getAttribute('data-words')),
    words = [
      "Software Engineer",
      "NodeJs",
      "React and Redux",
      "Ruby Dev",
      "Ruby on Rails"
    ];
  wait = txtElement.getAttribute("data-wait");

  //  Initialize TypeWriter
  new TypeWriter(txtElement, words, wait);
}
