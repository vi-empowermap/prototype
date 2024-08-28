import { useEffect } from "react";

const Translator = () => {
  // useEffect(() => {
  //   const googleTranslateElementInit = () => {
  //     const translateElementContainer = document.getElementById("google_translate_element");

  //     // Clear the container in case it's being reused
  //     if (translateElementContainer) {
  //       translateElementContainer.innerHTML = '';
  //       translateElementContainer.innerHTML = 'Languages';
  //     }

  //     if (window.google && window.google.translate) {
  //       new window.google.translate.TranslateElement(
  //         {
  //           pageLanguage: "de",
  //           includedLanguages: "en,de,fr", 
  //           autoDisplay: true
  //         },
  //         "google_translate_element"
  //       );
  //     } else {
  //       console.error("Google Translate API not available.");
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
  //     if (document.getElementById("google_translate_element")) {
  //       document.getElementById("google_translate_element").innerHTML = '';
  //     }
  //   };
  // }, []);

  return (
    <div id="google_translate_element">
      Languages
    </div>
  );
};

export default Translator;
