// Menu Loader - Load menu items from JSON
// Usage: Call loadMenuFromJSON() to populate menu dynamically from JSON
// or use the existing HTML-based menu

var menuData = null;

// Load menu JSON data
function loadMenuJSON() {
  return fetch('assets/data/menu.json?v=' + new Date().getTime())
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

  // Clear existing content and tabs
  tabContent.innerHTML = '';
  tabList.innerHTML = '';

  // Helper to create safe id slugs from category names
  function slugify(text) {
    return String(text)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-') // spaces to hyphens
      .replace(/[^a-z0-9\-]/g, ''); // remove invalid chars
  }

  // Render each category and create corresponding tab button
  menuCategories.forEach((category, index) => {
    const rawName = category.category || ('category-' + index);
    const slug = slugify(rawName);
    const isActive = index === 0;

    // create tab button
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.className = 'vs-btn mask-style3' + (isActive ? ' active' : '');
    a.id = `${slug}-food-tab`;
    a.setAttribute('data-toggle', 'tab');
    a.setAttribute('href', `#${slug}-food`);
    a.setAttribute('role', 'tab');
    a.setAttribute('aria-controls', `${slug}-food`);
    a.setAttribute('aria-selected', isActive ? 'true' : 'false');
    a.textContent = rawName.trim();
    li.appendChild(a);
    tabList.appendChild(li);

    // create pane
    const tabPane = createTabPane(slug, category.items, isActive);
    tabContent.appendChild(tabPane);
  });
}

function createTabPane(categorySlug, items, isActive = false) {
  const tabPane = document.createElement('div');
  tabPane.className = `tab-pane ${isActive ? 'active show' : ''}`;
  tabPane.id = `${categorySlug}-food`;
  tabPane.setAttribute('role', 'tabpanel');
  tabPane.setAttribute('aria-labelledby', `${categorySlug}-food-tab`);

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
  // available fallback images from assets/img/food-menu
  const fallbackImages = [
    'assets/img/food-menu/food-menu-img-1-1.jpg',
    'assets/img/food-menu/food-menu-img-1-2.jpg',
    'assets/img/food-menu/food-menu-img-1-3.jpg',
    'assets/img/food-menu/food-menu-img-2-1.jpg',
    'assets/img/food-menu/food-menu-img-3-1.jpg',
    'assets/img/food-menu/food-menu-img-4-1.jpg',
    'assets/img/food-menu/food-menu-img-5-1.jpg',
    'assets/img/food-menu/food-menu-img-6-1.jpg',
    'assets/img/food-menu/food-menu-img-7-1.jpg',
    'assets/img/food-menu/food-menu-img-8-1.jpg',
    'assets/img/food-menu/food-menu-img-13-1.jpg'
  ];

  // pick a fallback based on id or index
  const fallback = (typeof item.id === 'number')
    ? fallbackImages[item.id % fallbackImages.length]
    : fallbackImages[0];

  const requested = (item.image || '').toString().trim();
  img.alt = item.name || '';
  img.src = requested || fallback;
  // if the requested image fails, replace with a sensible fallback
  img.onerror = function() {
    img.onerror = null;
    img.src = fallback;
  };
  
  imageDiv.appendChild(img);

  const contentDiv = document.createElement('div');
  contentDiv.className = 'menu-card-content';

  const headerDiv = document.createElement('div');
  headerDiv.className = 'menu-card-header';

  const title = document.createElement('h3');
  title.textContent = item.name;

  headerDiv.appendChild(title);

  const desc = document.createElement('p');
  desc.className = 'menu-card-desc';
  desc.textContent = item.description;

  const button = document.createElement('button');
  button.className = 'menu-card-order-btn';
  button.textContent = '+ Bestill nå';

  // Create container for multiple prices
  const pricesDiv = document.createElement('div');
  pricesDiv.className = 'menu-card-prices';

  // Loop through price1 to price4
  for (let i = 1; i <= 4; i++) {
    const priceKey = 'price' + i;
    if (item[priceKey]) {
      const pItem = document.createElement('div');
      pItem.className = 'menu-price-item';
      pItem.textContent = item[priceKey];
      pricesDiv.appendChild(pItem);
    }
  }

  contentDiv.appendChild(headerDiv);
  contentDiv.appendChild(desc);
  contentDiv.appendChild(pricesDiv); // Add prices after description
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
