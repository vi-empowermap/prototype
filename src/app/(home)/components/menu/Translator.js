import { useEffect } from "react";

const Translator = () => {
  // useEffect(() => {
  //   closeTranslator()
  //   const googleTranslateElementInit = () => {
  //     const translateElementContainer = document.getElementById("google_translate_element");

  //     // Clear the container in case it's being reused
  //     if (translateElementContainer) {
  //       translateElementContainer.innerHTML = '';
  //     }

  //     if (window.google && window.google.translate) {
  //       new window.google.translate.TranslateElement(
  //         {
  //           pageLanguage: "de",
  //           includedLanguages: "en,de,fr,ko", 
  //           autoDisplay: true
  //         },
  //         "google_translate_element"
  //       );
  //     }
  //   };

  //   const existingScript = document.getElementById("google_translate_script");

  //   if (!existingScript) {
  //     const script = document.createElement("script");
  //     script.id = "google_translate_script";
  //     script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  //     script.async = true;
  //     document.body.appendChild(script);

  //     // Attach the initialization function to the window for callback
  //     window.googleTranslateElementInit = googleTranslateElementInit;
  //   } else {
  //     googleTranslateElementInit();
  //   }

  //   // Cleanup function to avoid duplication or leftover HTML
  //   return () => {
  //     const translateElementContainer = document.getElementById("google_translate_element");
  //     if (translateElementContainer) {
  //       translateElementContainer.innerHTML = '';
  //     }
  //   };
  // }, []);

  // // Function to remove/close the Google Translate widget
  // const closeTranslator = () => {
  //   const translateElementContainer = document.getElementById("google_translate_element");
  //   if (translateElementContainer) {
  //     translateElementContainer.innerHTML = ''; // Clear the widget contents
  //   }

  //   const translateScript = document.getElementById("google_translate_script");
  //   if (translateScript) {
  //     translateScript.remove(); // Remove the script tag
  //   }

  //   // Optionally, remove any residual iframe or elements added by Google Translate
  //   const googleTranslateIframe = document.querySelector('.goog-te-banner-frame');
  //   if (googleTranslateIframe) {
  //     googleTranslateIframe.remove();
  //   }
  // };

  return (
    <div>
      <div id="google_translate_element">
        Languages
      </div>
      {/* <button onClick={closeTranslator}>Close Translator</button> */}
    </div>
  );
};

export default Translator;
