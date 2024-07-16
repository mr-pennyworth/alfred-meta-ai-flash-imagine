// Create an image tag with "finalImg" as ID, and then
// every 20 milliseconds, look for the latest AI generated image,
// and copy it over to the "finalImg".
(function() {
  var img = document.getElementById("finalImg");
  if (img == null) {
    img = document.createElement("img");
    img.setAttribute("id", "finalImg");
    document.body.insertBefore(img, document.body.firstChild);
    setInterval(function() {
      // The latest image happens to be the last image tag in the webpage.
      let genImgSrc = [...document.getElementsByTagName('img')].reverse()[0].src;

      // handle the case where there aren't any AI generated images.
      if (genImgSrc.startsWith("data:")) {
        img.setAttribute('src', genImgSrc);

        // scroll to the top of the webpage, not really sure what's
        // causing the scrolling down in the first place, but always
        // scrolling to the top means we don't have to worry about it.
        window.scrollTo(0, 0);
      }
    }, 20);
  }
})();

function flashImagine(query) {
  let textArea = document.getElementsByTagName('textarea')[0];

  // Calling textArea.value = query won't do as the webpage uses the
  // ReactJS framework.
  // See https://stackoverflow.com/a/46012210 for details.
  // The following code is conceptually equivalent to setting the value
  // of the text area:
  Object.getOwnPropertyDescriptor(
    window.HTMLTextAreaElement.prototype,
    'value'
  ).set.call(textArea, "imagine " + query);

  // When a user manually types in the text area, an "input" event
  // is generated. There's code in the webpage that listens to this
  // event to load the AI generated image. Since in this script, we
  // are setting the value in code (as opposed to manual entry by user),
  // we need to generate the "input" event in code too.
  textArea.dispatchEvent(
    new Event('input', {bubbles: true, cancelable: true})
  );
}
