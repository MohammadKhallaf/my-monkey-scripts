/**
 * A script for showing the total lessons of the course
 * and the count of the finished lessons
 */

// @author       Mohammed Khallaf
// @match        https://frontendmasters.com/courses/*/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=frontendmasters.com

(function () {
  "use strict";
  // initialize counters
  let allLessons = 0;
  let completedLessons = 0;

  // initialize the variable that will hold the lesson list
  let lessonList;

  const doneSpan = document.createElement("span");

  // observe the changes in the lesson list
  const listObserver = new MutationObserver((_, observer) => {
    const completed = document.querySelectorAll(".lesson.completed").length;

    if (completedLessons == completed) {
      return;
    }

    // update counters
    allLessons = document.querySelectorAll(".lesson").length;
    completedLessons = completed;

    doneSpan.innerHTML = `<b>${completedLessons}</b> of ${allLessons}`;
    doneSpan.style.cssText = `
        position:absolute;
        top:1rem;
        right:1rem;
        background:black;
        padding:0.3rem;
        box-shadow:black 4px 6px 13px -3px;
        border-radius:1rem;`;

    document.querySelector("video").after(doneSpan);
  });

  const DOMobserver = new MutationObserver((_, observer) => {
    // observe the DOM till the lesson list is rendered
    if (document.querySelector("[data-id='lessonList']")) {
      observer.disconnect();
      lessonList = document.querySelector("[data-id='lessonList']");
      listObserver.observe(lessonList, {
        subtree: true,
        attributes: true,
      });
    }
  });

  DOMobserver.observe(document, {
    subtree: true,
    attributes: true,
  });
})();
