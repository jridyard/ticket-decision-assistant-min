// // // // manage timers
// // // console.log('sdsdsd')

// // // const timers = Bindly({
// // //     'runBeforeComplete': true, // if there's no chance of the elm breaking while other elements load in, runBeforeComplete creates a slightly higher UX. However, in some rare  cases, you will want to make sure it all loads in first. (to prevent issues, the default is to await document readyState 'complete' status to handle the edge case potential)
// // //     'mode': 'jquery',
// // //     'el': 'div:contains("7:32 (9:35:44 CST)")', // pass a selector
// // //     // 'parentToBind': 'div', // if you need to duplicate the parent instead of the target selector itself, pass a second selector to bind the parent. (note: "newElm" will be the parent. The 'el' selector just helps Bindly get the right parent to duplicate, but the parent is the element Bindly is now using.)
// // //     // 'parentToBind': '', // if you need to duplicate the parent instead of the target selector itself, pass a second selector to bind the parent. (note: "newElm" will be the parent. The 'el' selector just helps Bindly get the right parent to duplicate, but the parent is the element Bindly is now using.)
// // //     'bindAll': true, // if bindAll is true, it will bind every element with the 'el' selector params. If you only want to bind 1, pass 'false' for bindAll.
// // //     'hideOriginal': false, // this will hide the original element if set to true, if you want to keep the original element, pass false
// // //     'insert': 'after', // insert the element after or before the element we're binding to.
// // //     'adjustElm': (newElm) => { // adjust the element(s) after the element(s) become present.
// // //         // const startDateTime = newElm.textContent.split('(')[1].slice(0, newElm.textContent.split('(')[1].length - 1)
        
// // //     }
// // // });

// // // async function startTimer(duration, newElm) {
// // //     var start = Date.now(),
// // //         diff,
// // //         minutes,
// // //         seconds;
// // //     async function timer() {
// // //         // get the number of seconds that have elapsed since
// // //         // startTimer() was called
// // //         diff = duration - (((Date.now() - start) / 1000) | 0);

// // //         // does the same job as parseInt truncates the float
// // //         minutes = (diff / 60) | 0;
// // //         seconds = (diff % 60) | 0;

// // //         minutes = minutes < 10 ? "0" + minutes : minutes;
// // //         seconds = seconds < 10 ? "0" + seconds : seconds;

// // //         newElm.textContent = `${minutes}:${seconds}`

// // //         if (diff <= 0) {
// // //             clearInterval(timerInterval)
// // //         }
// // //     };
// // //     // we don't want to wait a full second before the timer starts
// // //     timer();
// // //     var timerInterval = setInterval(timer, 1000);
// // // }
