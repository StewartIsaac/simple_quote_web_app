const quoteInput = document.getElementById("quote-input");
const quoteAuthor = document.getElementById("quote-author");
const submitBtn = document.getElementById("submit");
const quoteDisplay = document.getElementById("quote-display");

submitBtn.addEventListener("click", addQuote);

function addQuote() {
    let quoteText = quoteInput.value.trim();
    let authorName = quoteAuthor.value.trim();

    if (quoteText === "" || authorName === "") {
        alert("Please enter a quote and author name. If you don't know the author, type 'Anonymous'");
    } else {
        const newQuote = {
            text: quoteText,
            author: authorName
        };
        const quoteJSON = JSON.stringify(newQuote);
        const key = Date.now().toString();
        localStorage.setItem(key, quoteJSON);
        quoteInput.value = "";
        quoteAuthor.value = "";
        displayQuotes();
    }
}

function displayQuotes() {
    quoteDisplay.innerHTML = "";
    for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            const quoteJSON = localStorage.getItem(key);
            const quoteObject = JSON.parse(quoteJSON);
            const newQuoteElement = document.createElement("p");;
            newQuoteElement.textContent = `"${quoteObject.text}" — ${quoteObject.author}`;
            const removeBtn = document.createElement("button");
            removeBtn.textContent = "Remove";
            removeBtn.classList.add("remove-button");
            removeBtn.addEventListener("click", () => removeQuote(key));
            newQuoteElement.appendChild(removeBtn);
            quoteDisplay.appendChild(newQuoteElement);
        }
    }
}

function removeQuote(key) {
    localStorage.removeItem(key);
    displayQuotes();
}

displayQuotes();
