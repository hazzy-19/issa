export const cafeData = {
  brand: {
    name: "The Corner Café",
    tagline: "Good food. Great coffee. Your everyday café.",
    heroBlurb:
      "Freshly brewed coffee, comforting plates and a welcoming space to slow down. Join us for breakfast, lunch or a little break.",
    heroBlurbShort: "Fresh coffee. Comforting plates.",
    blurb: "Your neighbourhood spot for fresh food and good coffee.",
    heroImage:
      "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=1600&q=80",
  },
  hours: {
    display: "Mon to Fri 8:00 am to 8:00 pm, Sat to Sun 9:00 am to 8:00 pm",
    lines: [
      { days: "Mon-Fri", hours: "8:00 am - 8:00 pm" },
      { days: "Sat-Sun", hours: "9:00 am - 8:00 pm" },
    ],
    kitchenNotice: "Kitchen serves 11:00 am to 8:00 pm",
    allergyNotice:
      "Please tell our team about any allergies. Plant-based options are available on request.",
  },
  contact: {
    address: "123 Market Street, Brookside",
    email: "hello@cornercafe.example",
    phone: "(555) 012-3456",
    phoneRaw: "5550123456",
    mapsUrl: "https://maps.google.com/?q=123+Market+Street,+Brookside",
    whatsappUrl: "https://wa.me/15550123456",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.818379646453!2d36.7909!3d-1.2828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTYnNTguMSJTIDM2wrA0Nyc0Ny4yIkU!5e0!3m2!1sen!2ske!4v1620000000000!5m2!1sen!2ske",
  },
  navigation: [
    { label: "Home", href: "#home" },
    { label: "Chef's picks", href: "#chefs-picks" },
    { label: "Menu", href: "#menu" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ],
  socials: [
    { name: "Instagram", href: "https://instagram.com" },
    { name: "Facebook", href: "https://facebook.com" },
    { name: "Twitter", href: "https://twitter.com" },
    { name: "TikTok", href: "https://tiktok.com" },
  ],
  chefsPicks: [
    {
      id: "avocado-toast",
      name: "Avocado toast",
      price: "KSh 9.50",
      description: "Sourdough, avocado, poached egg",
      image:
        "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
      menuItemId: "menu-avocado-toast",
    },
    {
      id: "house-pasta",
      name: "House pasta",
      price: "KSh 16.00",
      description: "Tomato sauce, basil, parmesan",
      image:
        "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80",
      menuItemId: "menu-house-pasta",
    },
    {
      id: "garden-salad",
      name: "Garden salad",
      price: "KSh 10.00",
      description: "Seasonal greens, lemon dressing",
      image:
        "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
      menuItemId: "menu-garden-salad",
    },
    {
      id: "chocolate-brownie",
      name: "Chocolate brownie",
      price: "KSh 6.50",
      description: "Warm chocolate, vanilla ice cream",
      image:
        "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
      menuItemId: "menu-chocolate-brownie",
    },
  ],
  menuCategories: ["Main course", "Dessert", "Salad", "Pizza", "Breads"],
  menuItems: [
    // Main course
    {
      id: "menu-grilled-chicken-sandwich",
      category: "Main course",
      name: "Grilled chicken sandwich",
      price: "KSh 12.00",
      description:
        "Grilled chicken, lettuce, tomato and house mayo on toasted sourdough.",
      dietaryTag: "",
      image:
        "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "menu-creamy-mushroom-pasta",
      category: "Main course",
      name: "Creamy mushroom pasta",
      price: "KSh 13.50",
      description:
        "Penne, sautéed mushrooms, garlic cream and parmesan.",
      dietaryTag: "Vegetarian",
      image:
        "https://images.unsplash.com/photo-1621996346565-e3d5d62817e4?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "menu-classic-cafe-burger",
      category: "Main course",
      name: "Classic café burger",
      price: "KSh 14.00",
      description:
        "Beef patty, cheddar, lettuce and pickles. Served with fries.",
      dietaryTag: "",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "menu-roasted-vegetable-bowl",
      category: "Main course",
      name: "Roasted vegetable bowl",
      price: "KSh 11.50",
      description:
        "Seasonal vegetables, quinoa, chickpeas and a lemon tahini dressing.",
      dietaryTag: "Vegan",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "menu-margherita-flatbread",
      category: "Main course",
      name: "Margherita flatbread",
      price: "KSh 12.50",
      description:
        "Tomato, mozzarella and fresh basil on our house flatbread.",
      dietaryTag: "Vegetarian",
      image:
        "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "menu-soup-and-sourdough",
      category: "Main course",
      name: "Soup & sourdough",
      price: "KSh 8.50",
      description:
        "Our soup of the day, served with toasted sourdough and butter.",
      dietaryTag: "Ask for today's soup",
      image:
        "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "menu-house-pasta",
      category: "Main course",
      name: "House pasta",
      price: "KSh 16.00",
      description: "Tomato sauce, basil, parmesan.",
      dietaryTag: "Vegetarian",
      image:
        "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "menu-avocado-toast",
      category: "Main course",
      name: "Avocado toast",
      price: "KSh 9.50",
      description: "Sourdough, avocado, poached egg.",
      dietaryTag: "Vegetarian",
      image:
        "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80",
    },

    // Dessert
    {
      id: "menu-chocolate-brownie",
      category: "Dessert",
      name: "Chocolate brownie",
      price: "KSh 6.50",
      description: "Warm chocolate, vanilla ice cream.",
      dietaryTag: "Vegetarian",
      image:
        "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "menu-berry-cheesecake",
      category: "Dessert",
      name: "Berry cheesecake",
      price: "KSh 8.00",
      description:
        "Vanilla cream cheese base topped with seasonal berry compote.",
      dietaryTag: "Vegetarian",
      image:
        "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "menu-warm-apple-tart",
      category: "Dessert",
      name: "Warm apple tart",
      price: "KSh 7.50",
      description:
        "Caramelised spiced apples on flaky pastry with custard.",
      dietaryTag: "Vegetarian",
      image:
        "https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "menu-affogato",
      category: "Dessert",
      name: "Affogato al caffè",
      price: "KSh 5.50",
      description:
        "Freshly extracted espresso poured over Madagascar vanilla gelato.",
      dietaryTag: "Vegetarian",
      image:
        "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80",
    },

    // Salad
    {
      id: "menu-garden-salad",
      category: "Salad",
      name: "Garden salad",
      price: "KSh 10.00",
      description: "Seasonal greens, lemon dressing.",
      dietaryTag: "Vegan",
      image:
        "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "menu-roasted-veg-salad",
      category: "Salad",
      name: "Roasted vegetable bowl",
      price: "KSh 11.50",
      description:
        "Seasonal vegetables, quinoa, chickpeas and a lemon tahini dressing.",
      dietaryTag: "Vegan",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "menu-caesar-salad",
      category: "Salad",
      name: "Classic Caesar salad",
      price: "KSh 11.00",
      description:
        "Crisp romaine, parmesan shavings, garlic croutons and house dressing.",
      dietaryTag: "Vegetarian",
      image:
        "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "menu-quinoa-salad",
      category: "Salad",
      name: "Mediterranean quinoa salad",
      price: "KSh 10.50",
      description:
        "Cucumbers, kalamata olives, cherry tomatoes and crumbled feta.",
      dietaryTag: "Vegetarian",
      image:
        "https://images.unsplash.com/photo-1505253758473-96b3015f240a?auto=format&fit=crop&w=600&q=80",
    },

    // Pizza
    {
      id: "menu-margherita-pizza",
      category: "Pizza",
      name: "Margherita flatbread",
      price: "KSh 12.50",
      description:
        "Tomato, mozzarella and fresh basil on our house flatbread.",
      dietaryTag: "Vegetarian",
      image:
        "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "menu-truffle-mushroom-pizza",
      category: "Pizza",
      name: "Truffle mushroom pizza",
      price: "KSh 14.50",
      description:
        "Sautéed wild mushrooms, white cream sauce, mozzarella and thyme.",
      dietaryTag: "Vegetarian",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "menu-spicy-pepperoni-pizza",
      category: "Pizza",
      name: "Spicy pepperoni flatbread",
      price: "KSh 15.00",
      description:
        "Artisan pepperoni, crushed red pepper, mozzarella and honey drizzle.",
      dietaryTag: "",
      image:
        "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "menu-four-cheese-pizza",
      category: "Pizza",
      name: "Four cheese flatbread",
      price: "KSh 13.50",
      description:
        "Mozzarella, gorgonzola, parmesan and ricotta with fresh rosemary.",
      dietaryTag: "Vegetarian",
      image:
        "https://images.unsplash.com/photo-1573821663912-569905455b1c?auto=format&fit=crop&w=600&q=80",
    },

    // Breads
    {
      id: "menu-soup-bread",
      category: "Breads",
      name: "Soup & sourdough",
      price: "KSh 8.50",
      description:
        "Our soup of the day, served with toasted sourdough and butter.",
      dietaryTag: "Ask for today's soup",
      image:
        "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "menu-avocado-toast-bread",
      category: "Breads",
      name: "Avocado toast",
      price: "KSh 9.50",
      description: "Sourdough, avocado, poached egg.",
      dietaryTag: "Vegetarian",
      image:
        "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "menu-garlic-focaccia",
      category: "Breads",
      name: "Garlic & rosemary focaccia",
      price: "KSh 6.00",
      description:
        "House-baked focaccia finished with sea salt flakes and garlic oil.",
      dietaryTag: "Vegan",
      image:
        "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "menu-artisan-bread-basket",
      category: "Breads",
      name: "Artisan bread basket",
      price: "KSh 5.50",
      description:
        "Warm sourdough slices, mini baguettes and salted butter.",
      dietaryTag: "Vegetarian",
      image:
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
    },
  ],
  gallery: [
    {
      id: "interior",
      title: "Café interior",
      image:
        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "coffee-counter",
      title: "Coffee counter",
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "outdoor-seating",
      title: "Outdoor seating",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    },
  ],
  copyrightYear: 2026,
};
