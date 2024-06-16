document.addEventListener("DOMContentLoaded", () => {
    let request = indexedDB.open("helloWorldDB", 1);
  
    request.onsuccess = function(event) {
      let db = event.target.result;
  
      // Read "Hello World" from the database
      let transaction = db.transaction(["keyValuePairs"], "readonly");
      let objectStore = transaction.objectStore("keyValuePairs");
      let request = objectStore.get("hello");
  
      request.onsuccess = function(event) {
        let result = event.target.result;
        if (result) {
          document.getElementById("message").textContent = `Hello ${result.value}!`;
        } else {
          document.getElementById("message").textContent = "Hello World not found";
        }
      };
  
      request.onerror = function() {
        console.error("Error reading Hello World from the database");
      };
    };
  
    request.onerror = function() {
      console.error("Error opening the database");
    };
  });
  