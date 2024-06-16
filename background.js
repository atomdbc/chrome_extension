chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed");
    // Open the IndexedDB database
    let request = indexedDB.open("helloWorldDB", 1);
  
    request.onupgradeneeded = function(event) {
      let db = event.target.result;
      // Create an object store to hold key-value pairs
      db.createObjectStore("keyValuePairs", { keyPath: "key" });
    };
  
    request.onsuccess = function(event) {
      let db = event.target.result;
  
      // Write "Hello World" to the database
      let transaction = db.transaction(["keyValuePairs"], "readwrite");
      let objectStore = transaction.objectStore("keyValuePairs");
      let request = objectStore.put({ key: "hello", value: "world" });
  
      request.onsuccess = function() {
        console.log("Hello World added to the database");
      };
  
      request.onerror = function() {
        console.error("Error adding Hello World to the database");
      };
    };
  
    request.onerror = function() {
      console.error("Error opening the database");
    };
  });
  