let quotes = [];

function loadQuotes() {
  const storedQuotes = localStorage.getItem("quotes");
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  } else {
    quotes = [
      { text: "The only way to do great work is to love what you do.", category: "Motivation" },
      { text: "In the middle of difficulty lies opportunity.", category: "Inspiration" },
      { text: "Success usually comes to those who are too busy to be looking for it.", category: "Success" }
    ];
  }
  populateCategories();
}

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function showRandomQuote() {
  const category = document.getElementById("categoryFilter").value;
  let filteredQuotes = quotes;
  if (category !== "all") {
    filteredQuotes = quotes.filter(quote => quote.category === category);
  }

  const quoteDisplay = document.getElementById("quoteDisplay");
  if (filteredQuotes.length > 0) {
    const randomQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
    quoteDisplay.textContent = `"${randomQuote.text}" — [${randomQuote.category}]`;
    sessionStorage.setItem("lastViewedQuote", JSON.stringify(randomQuote));
  } else {
    quoteDisplay.textContent = "No quotes found for this category.";
  }
}

function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (text && category) {
    quotes.push({ text, category });
    saveQuotes();
    populateCategories();
    alert("New quote added!");
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  } else {
    alert("Please fill in both fields.");
  }
}

function populateCategories() {
  const dropdown = document.getElementById("categoryFilter");
  const selected = localStorage.getItem("selectedCategory") || "all";
  dropdown.innerHTML = '<option value="all">All Categories</option>';
  const categories = [...new Set(quotes.map(q => q.category))];
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    dropdown.appendChild(option);
  });
  dropdown.value = selected;
}

function filterQuotes() {
  const selected = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", selected);
  showRandomQuote();
}

document.getElementById("newQuote").addEventListener("click", showRandomQuote);

loadQuotes();
showRandomQuote();
