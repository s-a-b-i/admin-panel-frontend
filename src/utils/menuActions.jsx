// src/utils/menuActions.js
import { uploadImageToCloudinary } from './cloudinaryHelper';

export const handleMenuAction = async (cardId, action, setActiveMenu, deleteCard, setFiles, setShowFilePopup) => {
  switch (action) {
    case "handleFiles":
      console.log("Handle files for card", cardId);
      setShowFilePopup(true);
      break;

    case "upload":
      console.log("Upload files action for card", cardId);
      try {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (e) => {
          const file = e.target.files[0];
          if (file) {
            const imageUrl = await uploadImageToCloudinary(file);
            console.log("Uploaded image URL:", imageUrl);
            setFiles(prevFiles => [...prevFiles, { name: file.name, url: imageUrl }]);
          }
        };
        input.click();
      } catch (error) {
        console.error("Error uploading file:", error);
      }
      break;

    case "approval":
      console.log("Admin approval action for card", cardId);
      // Empty space for API handling
      break;

    case "delete":
      console.log("Delete card action for card", cardId);
      if (cardId !== "card-1") {
        deleteCard(cardId);
      } else {
        alert("The first card cannot be deleted.");
      }
      break;

    default:
      console.log("Unknown action", action);
  }
  
  setActiveMenu(null);
};