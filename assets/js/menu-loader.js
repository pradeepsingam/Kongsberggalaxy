// Menu Loader - Load menu items from JSON
// Usage: Call loadMenuFromJSON() to populate menu dynamically from JSON
// or use the existing HTML-based menu

var menuData = null;

// Load menu JSON data
function loadMenuJSON() {
  return fetch('assets/data/menu.json')
    .then(response => response.json())
    .then(data => {
      menuData = data;
      return data;
    })
    .catch(error => {
      console.error('Error loading menu data:', error);
      return null;
    });
}

// Render menu from JSON data
function loadMenuFromJSON() {
  loadMenuJSON().then(data => {
    if (!data) return;
    renderMenuFromJSON(data.menu);
  });
}

function renderMenuFromJSON(menuCategories) {
  const tabContent = document.getElementById('foodTabContent');
  const tabList = document.querySelector('.nav-tabs');
  
  if (!tabContent || !tabList) {
    console.error('Tab containers not found');
    return;
  }

  // Clear existing content
  tabContent.innerHTML = '';
  
  // Find and preserve the tab list structure or recreate tabs
  const tabLinks = tabList.querySelectorAll('a[data-toggle="tab"]');
  
  // Render each category
  menuCategories.forEach((category, index) => {
    const categoryId = category.category;
    const isActive = index === 0;
    const tabPane = createTabPane(categoryId, category.items, isActive);
    tabContent.appendChild(tabPane);
  });
}

function createTabPane(categoryId, items, isActive = false) {
  const tabPane = document.createElement('div');
  tabPane.className = `tab-pane ${isActive ? 'active' : ''}`;
  tabPane.id = `${categoryId}-food`;
  tabPane.setAttribute('role', 'tabpanel');
  tabPane.setAttribute('aria-labelledby', `${categoryId}-food-tab`);

  const rowDiv = document.createElement('div');
  rowDiv.className = 'row justify-content-center';

  // Create menu cards for each item
  items.forEach(item => {
    const card = createMenuCard(item);
    rowDiv.appendChild(card);
  });

  tabPane.appendChild(rowDiv);
  return tabPane;
}

function createMenuCard(item) {
  const colDiv = document.createElement('div');
  colDiv.className = 'col-md-6 col-lg-4';

  const card = document.createElement('div');
  card.className = 'menu-card';

  const imageDiv = document.createElement('div');
  imageDiv.className = 'menu-card-image';
  
  const img = document.createElement('img');
  img.src = item.image;
  img.alt = item.name;
  
  imageDiv.appendChild(img);

  const contentDiv = document.createElement('div');
  contentDiv.className = 'menu-card-content';

  const headerDiv = document.createElement('div');
  headerDiv.className = 'menu-card-header';

  const title = document.createElement('h3');
  title.textContent = item.name;

  const priceDiv = document.createElement('div');
  priceDiv.className = 'menu-card-price';

  const oldPrice = document.createElement('span');
  oldPrice.className = 'menu-card-old';
  oldPrice.textContent = item.oldPrice;

  const newPrice = document.createElement('span');
  newPrice.className = 'menu-card-new';
  newPrice.textContent = 'Pris: ' + item.price;

  priceDiv.appendChild(oldPrice);
  priceDiv.appendChild(newPrice);

  headerDiv.appendChild(title);
  headerDiv.appendChild(priceDiv);

  const desc = document.createElement('p');
  desc.className = 'menu-card-desc';
  desc.textContent = item.description;

  const button = document.createElement('button');
  button.className = 'menu-card-order-btn';
  button.textContent = '+ Bestill nå';

  contentDiv.appendChild(headerDiv);
  contentDiv.appendChild(desc);
  contentDiv.appendChild(button);

  card.appendChild(imageDiv);
  card.appendChild(contentDiv);

  colDiv.appendChild(card);
  return colDiv;
}

// Initialize on page load - uncomment the line below to load from JSON
document.addEventListener('DOMContentLoaded', function() {
  // Load menu from JSON instead of using HTML data
  loadMenuFromJSON();
  
  // Pre-load JSON data for later use
  loadMenuJSON();
});
