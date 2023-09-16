var currentIndex = 0;
var parsedData;
var totalFlashCards = 0;


/**
 * Parses a CSV string and returns the parsed data as an array of objects.
 *
 * @param {string} csvString - The CSV string to be parsed.
 * @return {array} The parsed data as an array of objects.
 */
function parseCSV(csvString) {
    if (csvString === null || csvString === undefined || csvString === "") {
      return;
    }
    var rows = csvString.split("\r\n");
    var headers = rows[0].split(",");

    var parsedData = rows.slice(1).map(function (row) {
      var columns = row.split(",");
      var rowData = {};
      headers.forEach(function (header, index) {
        var value = columns[index];
        console.log(value);
        
        if (value === "") {
          console.log("empty Value")
          return;
        } else if (value.charAt(0) === '"' && value.charAt(value.length - 1) === '"') {
          value = value.slice(1, -1);
        }
        rowData[header] = value;
      });
      return rowData;
    });
    return parsedData
  }

/**
 * Show a flashcard with parsed data.
 *
 * @return {undefined} There is no return value.
 */
  function showFlashCard() {
    const data = parsedData[currentIndex]

    // Update the flashcard content with the parsed data
    var flashcard_slideshow = document.querySelector('.flashcard-slideshow');
    var flashcard = flashcard_slideshow.querySelector('.flashcard');
    flashcard.querySelector('.front').textContent = data.question;
    flashcard.querySelector('.back').textContent = data.answer;
  }
  
  
  /**
   * Handles the file upload event.
   *
   * @param {Event} event - The file upload event.
   * @return {void} No return value.
   */
  function handleFileUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.readAsText(file);

    reader.onload = function (e) {
      parsedData = parseCSV(reader.result);
      showFlashCard();
    };
  
    reader.readAsText(file);
  }
  

/**
 * Displays the next flashcard.
 *
 * @param {none} None
 * @return {none} None
 */
  function showNextFlashcard() {
    if (currentIndex > parsedData.length - 1) {
      currentIndex = parsedData.length - 1;
      alert("You've reached the end");
      return;
    }
    currentIndex++;

    showFlashCard();
    updateFlashcard(1);
  }
  
  
  /**
   * Shows the previous flashcard.
   *
   * @return {undefined} There is no return value.
   */
  function showPrevFlashcard() {
    if (currentIndex < 0) {
        currentIndex = 0;
        alert("You've reached the start");
        return;
    }
    currentIndex--;
    
    showFlashCard();
    updateFlashcard(0);
  }

  
  /**
   * Initiates the function by handling a file upload event and adding a hover animation.
   *
   * @param {Event} event - The event object.
   */
  function initiate(event) {
    handleFileUpload(event);
  }


  /**
   * Updates the flashcard by rotating it to the front.
   *
   * @param {type} None - There are no parameters for this function.
   * @return {type} None - This function does not return anything.
   */
  function updateFlashcard(direction) {
    const flashcardContent = $(".flashcard-inner");
    
    if (direction == 0) {
      flashcardContent.addClass("slide-right");
      setTimeout(function () {
          flashcardContent.css("visibility", "hidden");
          flashcardContent.removeClass("slide-right").addClass("slide-left");
          setTimeout(function () {
              flashcardContent.css("visibility", "visible");
              flashcardContent.removeClass("slide-left");
          }, 500);
      }, 500);
    } else {
      flashcardContent.addClass("slide-left");
      setTimeout(function () {
          flashcardContent.css("visibility", "hidden");
          flashcardContent.removeClass("slide-left").addClass("slide-right");
          setTimeout(function () {
              flashcardContent.css("visibility", "visible");
              flashcardContent.removeClass("slide-right");
          }, 500);
      }, 500);
    }
  }

  // function updateIndex() {

  // }
  

  /**
   * Adds a hover animation to the flashcard element.
   *
   * @return {void} This function does not return any value.
   */
  function addHoverAnimation() {
    $(".flashcard").hover(
      function () {
          $(this).find(".front").css("transform", "rotateX(180deg)");
          $(this).find(".back").css("transform", "rotateX(0deg)");
      },
      function () {
          $(this).find(".front").css("transform", "rotateX(0deg)");
          $(this).find(".back").css("transform", "rotateX(180deg)");
      }
    );
  }

const LEFT_ARROW_KEY = 37;
const RIGHT_ARROW_KEY = 39;

$(document).ready(function () {
    window.dialog.showModal();
    // Event listener for previous key
    $(document).keydown(function(e) {
      if(e.which == LEFT_ARROW_KEY) {
        showPrevFlashcard();
      } else if(e.which == RIGHT_ARROW_KEY) {
        showNextFlashcard();
      }
    });

    // Event listener for file upload
    $('#csvFile').on('change', initiate);

    // Add hover animation on startup
    addHoverAnimation();
    
    // Event listener for previous button
    $('#prev').on('click', showPrevFlashcard);
    
    // Event listener for next button
    $('#next').on('click', showNextFlashcard);
});

