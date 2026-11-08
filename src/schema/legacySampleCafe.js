export const legacySampleCafe = {
  brand: {
    name: "The Corner Café",
    tagline: "Good food. Great coffee. Your everyday café.",
    heroBlurb:
      "Freshly brewed coffee, comforting plates and a welcoming space to slow down. Join us for breakfast, lunch or a little break.",
    heroBlurbShort: "Fresh coffee. Comforting plates.",
    blurb: "Your neighbourhood spot for fresh food and good coffee.",
    heroSlides: [
      {
        url: "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=1600&q=80",
        alt: "Barista pouring latte art into cup",
      },
      {
        url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1600&q=80",
        alt: "Sunlit café interior and counter",
      },
      {
        url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1600&q=80",
        alt: "Artisan coffee and breakfast spread",
      },
      {
        url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1600&q=80",
        alt: "Cozy café seating and ambient lighting",
      },
      {
        url: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1600&q=80",
        alt: "Single-origin pour-over craft coffee",
      },
    ],
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
    address: "Egertn, Njoro hapo gate sides za Ng'ondu",
    email: "anyonaonchoke@gmail.com",
    phone: "(254) 0757611486",
    phoneRaw: "0757611486",
    mapsUrl: "https://maps.google.com/?q=123+Market+Street,+Brookside",
    whatsappUrl: "https://wa.me/254757611486",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.818379646453!2d36.7909!3d-1.2828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTYnNTguMSJTIDM2wrA0Nyc0Ny4yIkU!5e0!3m2!1sen!2ske!4v1620000000000!5m2!1sen!2ske",
  },
  navigation: [
    { label: "Home", href: "/" },
    { label: "About", href: "/#about" },
    { label: "Chef's picks", href: "/#chefs-picks" },
    { label: "Menu", href: "/menu" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/#contact" },
  ],
  socials: [
    { name: "Instagram", href: "https://instagram.com/_any_ona" },
    { name: "Facebook", href: "https://facebook.com" },
    { name: "Twitter", href: "https://twitter.com" },
    { name: "TikTok", href: "https://tiktok.com" },
  ],
  about: {
    historyTitle: "Our Story",
    historyText:
      "Founded in 2018 in Njoro, The Corner Café began with a single vintage espresso group and a passion for slow, honest mornings. What started as a modest neighborhood espresso corner has grown into a community hearth where neighbors, creators, and coffee lovers gather every day.",
    principles: [
      {
        title: "Ethical Direct Trade",
        description:
          "We source our single-origin coffees directly from sustainable cooperatives, paying above fair-trade premiums and roasting in small weekly batches.",
      },
      {
        title: "Slow Fermentation & Fresh Food",
        description:
          "Everything from our 36-hour sourdough to our house pasta and market salads is made from scratch with honest, seasonal ingredients.",
      },
      {
        title: "Community First",
        description:
          "More than great coffee, we are an unhurried sanctuary designed for genuine connection, warm hospitality, and lingering conversations.",
      },
    ],
  },
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
      price: "KSh 400",
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
      price: "KSh 300",
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
      price: "KSh 450",
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
      price: "KSh 200",
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
      price: "KSh 150",
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
      price: "KSh 350",
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
      price: "KSh 600",
      description: "Tomato sauce, basil, parmesan.",
      dietaryTag: "Vegetarian",
      image:
        "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "menu-avocado-toast",
      category: "Main course",
      name: "Avocado toast",
      price: "KSh 100",
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
      price: "KSh 150",
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
      price: "KSh 50",
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
      price: "KSh 10",
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
  menuHighlights: [
    {
      id: "highlight-1",
      name: "Avocado toast",
      price: "KSh 9.50",
      category: "Breads",
      description: "Sourdough, fresh sliced avocado, organic poached egg and chili flakes.",
      dietaryTag: "Vegetarian",
      image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "highlight-2",
      name: "House pasta",
      price: "KSh 14.00",
      category: "Main course",
      description: "Handmade tagliatelle in roasted tomato, garlic confit, basil and aged parmesan.",
      dietaryTag: "Signature",
      image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "highlight-3",
      name: "Margherita flatbread",
      price: "KSh 12.50",
      category: "Pizza",
      description: "San Marzano tomatoes, fresh mozzarella and sweet basil on stone-fired crust.",
      dietaryTag: "Vegetarian",
      image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "highlight-4",
      name: "Tiramisu cup",
      price: "KSh 7.00",
      category: "Dessert",
      description: "Espresso-soaked savoiardi, mascarpone cream and Dutch cocoa dust.",
      dietaryTag: "House favorite",
      image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "highlight-5",
      name: "Mediterranean bowl",
      price: "KSh 11.50",
      category: "Salad",
      description: "Quinoa, roasted chickpeas, avocado, baby spinach and lemon tahini dressing.",
      dietaryTag: "Vegan",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "highlight-6",
      name: "Garlic & rosemary focaccia",
      price: "KSh 6.00",
      category: "Breads",
      description: "House-baked focaccia finished with sea salt flakes and garlic herb oil.",
      dietaryTag: "Vegan",
      image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=800&q=80",
    },
  ],
  galleryCategories: ["All", "Customers & Moments", "Food & Treats", "The Space & Brews"],
  gallery: [
    // Customers & Moments
    {
      id: "gallery-1",
      title: "Morning coffee & conversation",
      category: "Customers & Moments",
      aspect: "aspect-[3/4]",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "gallery-2",
      title: "Quiet moments with a good book",
      category: "Customers & Moments",
      aspect: "aspect-[4/5]",
      image:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "gallery-3",
      title: "Warm smiles at the espresso bar",
      category: "Customers & Moments",
      aspect: "aspect-square",
      image:
        "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "gallery-4",
      title: "Weekend brunch with friends",
      category: "Customers & Moments",
      aspect: "aspect-[4/3]",
      image:
        "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "gallery-13",
      title: "Laptop sessions by the window",
      category: "Customers & Moments",
      aspect: "aspect-[3/4]",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    },

    // Food & Treats
    {
      id: "gallery-5",
      title: "Freshly baked artisan croissants",
      category: "Food & Treats",
      aspect: "aspect-[4/3]",
      image:
        "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "gallery-6",
      title: "Signature avocado & poached egg toast",
      category: "Food & Treats",
      aspect: "aspect-[3/4]",
      image:
        "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "gallery-7",
      title: "Fudgy chocolate brownie with vanilla gelato",
      category: "Food & Treats",
      aspect: "aspect-square",
      image:
        "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "gallery-8",
      title: "Crispy stone-baked margherita flatbread",
      category: "Food & Treats",
      aspect: "aspect-[4/5]",
      image:
        "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "gallery-14",
      title: "Handmade tagliatelle pasta bowl",
      category: "Food & Treats",
      aspect: "aspect-[3/4]",
      image:
        "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=80",
    },

    // The Space & Brews
    {
      id: "gallery-9",
      title: "Artisan espresso bar & craft gear",
      category: "The Space & Brews",
      aspect: "aspect-[4/3]",
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "gallery-10",
      title: "Sunlit dining room & natural oak tables",
      category: "The Space & Brews",
      aspect: "aspect-[3/4]",
      image:
        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "gallery-11",
      title: "Breezy garden patio seating",
      category: "The Space & Brews",
      aspect: "aspect-square",
      image:
        "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "gallery-12",
      title: "Slow pour-over bar",
      category: "The Space & Brews",
      aspect: "aspect-[4/5]",
      image:
        "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "gallery-15",
      title: "Hand-crafted ceramic latte cups",
      category: "The Space & Brews",
      aspect: "aspect-[3/4]",
      image:
        "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80",
    },
  ],
  copyrightYear: 2026,
};
