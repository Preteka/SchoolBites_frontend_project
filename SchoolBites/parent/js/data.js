/**
 * SchoolBite - Central Data Store (data.js)
 * Contains reusable data structures for Meals, Services, Pricing, Blogs, Testimonials, and FAQs.
 * Strictly no emojis used.
 */

const SCHOOLBITE_DATA = {
  // Weekly meals organized by day (SchoolBite Menu: Mon-Fri)
  meals: [
    {
      id: 'meal-mon-1',
      day: 'Monday',
      dateLabel: 'Every Monday',
      category: 'Lunch',
      name: 'Idli with Sambar & Fresh Fruits',
      image: 'assets/images/meal_monday_idli.jpg',
      description: 'Fluffy steamed traditional rice idlis served with vegetable-rich drumstick sambar, fresh coconut chutney, and seasonal fruit slices.',
      calories: 390,
      protein: '14g',
      carbs: '58g',
      fat: '8g',
      dietary: '100% Vegetarian',
      nutritionTag: 'Nutritious & Balanced',
      allergens: [],
      rating: 4.9,
      chefNote: 'Steamed, easily digestible, and packed with plant-based protein.'
    },
    {
      id: 'meal-tue-1',
      day: 'Tuesday',
      dateLabel: 'Every Tuesday',
      category: 'Lunch',
      name: 'Masala Dosa & Banana',
      image: 'assets/images/meal_tuesday_dosa.jpg',
      description: 'Crispy golden crepe filled with mild spiced potato masala, paired with roasted tomato chutney, coconut dip, and a fresh ripe banana.',
      calories: 420,
      protein: '12g',
      carbs: '64g',
      fat: '11g',
      dietary: '100% Vegetarian',
      nutritionTag: 'Kid Approved',
      allergens: [],
      rating: 5.0,
      chefNote: 'A kid-favorite classic made with minimal oil and farm-fresh ingredients.'
    },
    {
      id: 'meal-wed-1',
      day: 'Wednesday',
      dateLabel: 'Every Wednesday',
      category: 'Lunch',
      name: 'Veg Rice, Dal & Salad',
      image: 'assets/images/meal_wednesday_rice.jpg',
      description: 'Fragrant basmati rice tossed with colorful carrots and peas, paired with homestyle yellow dal tadka, crunchy cucumber salad, and yogurt.',
      calories: 440,
      protein: '16g',
      carbs: '62g',
      fat: '10g',
      dietary: '100% Vegetarian',
      nutritionTag: 'High Fiber',
      allergens: ['Dairy'],
      rating: 4.8,
      chefNote: 'Complete amino acid profile with comforting homestyle lentils and grains.'
    },
    {
      id: 'meal-thu-1',
      day: 'Thursday',
      dateLabel: 'Every Thursday',
      category: 'Lunch',
      name: 'Chapati with Veg Curry & Curd',
      image: 'assets/images/meal_thursday_chapati.jpg',
      description: 'Soft whole-wheat chapatis served with rich cottage cheese and mixed vegetable curry, cooling spiced curd, and fresh salad slices.',
      calories: 460,
      protein: '18g',
      carbs: '56g',
      fat: '14g',
      dietary: '100% Vegetarian',
      nutritionTag: 'High Protein',
      allergens: ['Dairy', 'Gluten'],
      rating: 4.9,
      chefNote: 'Slow-burning complex carbs for sustained afternoon sports and learning.'
    },
    {
      id: 'meal-fri-1',
      day: 'Friday',
      dateLabel: 'Every Friday',
      category: 'Lunch',
      name: 'Veg Noodles & Fruits',
      image: 'assets/images/meal_friday_noodles.jpg',
      description: 'Stir-fried whole wheat hakka noodles loaded with bell peppers, green beans, and carrots, paired with sweet watermelon and kiwi slices.',
      calories: 410,
      protein: '13g',
      carbs: '60g',
      fat: '9g',
      dietary: '100% Vegetarian',
      nutritionTag: 'Fun Friday Feast',
      allergens: ['Gluten'],
      rating: 5.0,
      chefNote: 'Made with zero MSG and cold-pressed sesame oil for clean wholesome energy.'
    }
  ],

  // Parent-focused services available through SchoolBite
  services: [
    {
      id: 'service-school-meals',
      icon: 'box',
      title: 'School Meal Service',
      description: 'Direct-to-classroom tiffin delivery right before the school lunch bell rings. Temperature-controlled insulated containers ensure meals stay fresh and warm.',
      perks: [
        'Guaranteed 30-minute delivery window before lunch',
        'Spill-proof stainless steel eco-containers',
        'Direct coordination with school administration'
      ]
    },
    {
      id: 'service-weekly-planning',
      icon: 'calendar',
      title: 'Weekly Meal Planning',
      description: 'Intuitive parent dashboard to view and customize next week’s menu by Saturday evening. Swap dishes easily according to your child’s taste.',
      perks: [
        'Select dishes up to 2 weeks in advance',
        'Detailed macronutrient breakdown per day',
        'Simple one-click dish substitutions'
      ]
    },
    {
      id: 'service-subscriptions',
      icon: 'shield-check',
      title: 'Meal Subscriptions',
      description: 'Flexible monthly or term-based subscriptions with zero long-term locks. Pause deliveries on sick days, school holidays, or family vacations.',
      perks: [
        'Pause and resume anytime via parent portal',
        'Automatic credit rollover for unused meals',
        'No lock-in contracts or penalty fees'
      ]
    },
    {
      id: 'service-dietary-preferences',
      icon: 'heart',
      title: 'Dietary Preferences',
      description: 'Specialized menus calibrated for unique dietary needs including pure vegetarian, gluten-sensitive, nut-free, dairy-free, and Jain preferences.',
      perks: [
        'Strictly isolated preparation zones for allergens',
        'Clear allergen indicators on every lunch box',
        'Pediatric nutritionist consultation available'
      ]
    },
    {
      id: 'service-nutrition-focus',
      icon: 'award',
      title: 'Nutrition-Focused Meals',
      description: 'Every recipe is formulated in collaboration with pediatric nutritionists to meet ICMR growth benchmarks without artificial additives or preservatives.',
      perks: [
        'Zero refined white sugar, maida, or palm oil',
        'At least 2 servings of fresh vegetables per meal',
        'Balanced glycemic index for steady classroom focus'
      ]
    },
    {
      id: 'service-digital-payments',
      icon: 'rupee',
      title: 'Easy Digital Payments',
      description: 'Hassle-free automated recurring payments through UPI, Net Banking, credit cards, or digital wallets with itemized GST invoices.',
      perks: [
        'Secure tokenized payment gateway',
        'Instant digital receipts and monthly statements',
        'Auto-renewal reminders 3 days before cycle'
      ]
    },
    {
      id: 'service-child-profiles',
      icon: 'user',
      title: 'Child Profile Management',
      description: 'Add multiple children and keep their school, class, dietary preferences, allergies and meal requirements organized in one place.',
      perks: [
        'Create a profile for every child',
        'Manage school and class details',
        'Keep preferences ready for every order'
      ]
    },
    {
      id: 'service-delivery-tracking',
      icon: 'truck',
      title: 'Delivery Tracking',
      description: 'See upcoming classroom deliveries and check the current delivery status from your Parent Dashboard whenever you need an update.',
      perks: [
        'View the next scheduled delivery',
        'Follow preparation and delivery progress',
        'Get clear status updates in your dashboard'
      ]
    }
  ],

  // Pricing plans
  pricingPlans: [
    {
      id: 'plan-weekly',
      name: 'Weekly Plan',
      tier: 'Starter',
      featured: false,
      badge: 'Flexible',
      icon: 'calendar',
      price: 799,
      period: '/ week',
      priceMonthly: 799,
      frequencyLabel: 'per week',
      description: 'Ideal for trying out our fresh, dietitian-curated school meals with complete flexibility.',
      features: [
        { name: '5 Days of Fresh School Meals (Mon-Fri)', included: true },
        { name: 'Customized Dietary & Allergen Preferences', included: true },
        { name: 'Morning Hot Delivery to School Desk', included: true },
        { name: 'Pause or Cancel Anytime with 1 Click', included: true },
        { name: 'Eco-Friendly Stainless Steel Tiffin Kit', included: true },
        { name: 'Dedicated Nutritionist Consultation', included: false },
        { name: 'VIP Priority Delivery Window', included: false }
      ],
      ctaText: 'Choose Weekly',
      planCode: 'WEEKLY-799'
    },
    {
      id: 'plan-monthly',
      name: 'Monthly Plan',
      tier: 'Most Popular',
      featured: true,
      badge: 'Most Popular',
      icon: 'award',
      price: 2999,
      period: '/ month',
      priceMonthly: 2999,
      frequencyLabel: 'per month',
      description: 'Our most loved plan for uninterrupted, wholesome daily school nutrition with maximum consistency.',
      features: [
        { name: '20 Days of Balanced, Delicious Lunches', included: true },
        { name: 'Priority Allergy & Dietary Management', included: true },
        { name: 'Free Insulated Thermos Lunch Bag', included: true },
        { name: 'Live Delivery Tracking & Notifications', included: true },
        { name: '10% Savings vs Weekly Subscription', included: true },
        { name: 'Unlimited Menu Dish Swapping', included: true },
        { name: 'Quarterly Child Nutrition Report Card', included: true }
      ],
      ctaText: 'Choose Monthly',
      planCode: 'MONTHLY-2999'
    },
    {
      id: 'plan-term',
      name: 'Term Plan',
      tier: 'Best Value',
      featured: false,
      badge: 'Best Value',
      icon: 'shield-check',
      price: 7999,
      period: '/ term',
      priceMonthly: 7999,
      frequencyLabel: 'per term',
      description: 'Full school term coverage with maximum 20% savings and premium personalized perks.',
      features: [
        { name: 'Complete 60-Day School Term Coverage', included: true },
        { name: 'Dedicated 1-on-1 Nutritionist Consultation', included: true },
        { name: 'Custom Weekend Meal Swap Options', included: true },
        { name: 'VIP Parent Portal Priority Support', included: true },
        { name: 'Premium RFID-Tracked Sanitized Tiffin Kit', included: true },
        { name: 'Maximum 20% Savings Guaranteed', included: true },
        { name: 'Zero Re-enrollment Hassle All Term', included: true }
      ],
      ctaText: 'Choose Term Plan',
      planCode: 'TERM-7999'
    }
  ],

  // Blog articles
  blogPosts: [
    {
      id: 'blog-1',
      category: 'Child Nutrition',
      title: 'Brain Food: What Really Fuels Your Child’s School Day Focus',
      readTime: '4 min read',
      date: 'September 3, 2026',
      author: 'Dr. Neha Sharma, Pediatric Nutritionist',
      image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80',
      description: 'Discover how complex carbohydrates, healthy omega fats, and micronutrients directly influence classroom stamina and memory retention.'
    },
    {
      id: 'blog-2',
      category: 'Healthy Habits',
      title: '5 Ways to Overcome Picky Eating Without Mealtime Tears',
      readTime: '6 min read',
      date: 'August 28, 2026',
      author: 'Priya Raman, Child Development Coach',
      image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=800&q=80',
      description: 'Practical, stress-free strategies to gently introduce diverse colors, textures, and wholesome vegetables into your schooler’s diet.'
    },
    {
      id: 'blog-3',
      category: 'School Life',
      title: 'Morning Rush Hacks: How Modern Parents Save 45 Minutes Daily',
      readTime: '5 min read',
      date: 'August 19, 2026',
      author: 'Sunita & Rahul Verma, SchoolBite Parents',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
      description: 'How delegating school lunch logistics transformed one Bangalore family’s morning routine from high-pressure chaos to peaceful breakfast chats.'
    },
    {
      id: 'blog-4',
      category: 'Recipes',
      title: 'Our Secret Cauliflower Alfredo: Kid-Approved & Fiber-Packed',
      readTime: '3 min read',
      date: 'August 10, 2026',
      author: 'Chef Rajesh Nair, Head of Culinary Operations',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
      description: 'The exact recipe we use in our central kitchen to create creamy, velvety pasta sauce using pure steamed cauliflower and cashews.'
    },
    {
      id: 'blog-5',
      category: 'Child Nutrition',
      title: 'Sugar Crash Syndrome: Spotting Hidden Sweeteners in Kids’ Snacks',
      readTime: '5 min read',
      date: 'July 30, 2026',
      author: 'Dr. Neha Sharma, Pediatric Nutritionist',
      image: 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?auto=format&fit=crop&w=800&q=80',
      description: 'Learn why supermarket juice boxes and packaged biscuits cause mid-morning lethargy and how whole fruits offer a steady release of energy.'
    },
    {
      id: 'blog-6',
      category: 'School Life',
      title: 'Safe Food Standards: Inside Our Cleanroom Central Kitchens',
      readTime: '4 min read',
      date: 'July 14, 2026',
      author: 'Quality Assurance Team, SchoolBite',
      image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80',
      description: 'A transparent photographic look into our ozone wash stations, automated steam cooking vats, and strict temperature control logs.'
    }
  ],

  // Real parent testimonials
  testimonials: [
    {
      id: 'test-1',
      parentName: 'Ananya Deshmukh',
      role: 'Mother of Aarav (Grade 4)',
      school: 'The Valley School, Bengaluru',
      rating: 5,
      quote: 'Before SchoolBite, 6:00 AM mornings were a nightmare of packing food that Aarav would bring back untouched. Now he finishes every single bite. The paneer wraps and fruit skewers are his absolute favorites!',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 'test-2',
      parentName: 'Vikram & Radhika Sethi',
      role: 'Parents of Kabir (Grade 2) & Meera (Grade 6)',
      school: 'St. Paul’s International Academy',
      rating: 5,
      quote: 'The allergen management gives us immense peace of mind. Meera has a mild peanut allergy, and SchoolBite handles cross-contamination protocols with pharmaceutical-level precision. Truly trustworthy.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 'test-3',
      parentName: 'Deepa Krishnan',
      role: 'Working Mother of Tanya (Grade 5)',
      school: 'Oakridge International School',
      rating: 5,
      quote: 'As a pediatric doctor, I inspect every ingredient. SchoolBite passes with flying colors: zero palm oil, real vegetables, genuine whole grains. It is the best subscription investment we have made this academic year.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
    }
  ],

  // Frequently Asked Questions
  faqs: [
    {
      question: 'How do meals get delivered to my child at school?',
      answer: 'Our dedicated delivery personnel transport sanitized, insulated stainless steel tiffin containers directly to partner schools in temperature-controlled vans. Meals arrive 30 minutes before the scheduled school lunch bell, sorted by grade and classroom section, and are handed over directly to designated school floor coordinators.'
    },
    {
      question: 'Can I swap a meal if my child dislikes a specific dish?',
      answer: 'Yes! Every Friday, parents receive a notification to review the upcoming week’s menu in the parent portal. You can swap any scheduled lunch or snack with an alternate option from our seasonal catalog up to 6:00 PM on Sunday evening.'
    },
    {
      question: 'What happens if my child falls sick or the school is closed?',
      answer: 'You can pause your subscription with a single click in your parent dashboard before 7:00 AM on the day of delivery. Unused meal credits automatically roll over to the following month or your next billing cycle with zero deductions.'
    },
    {
      question: 'How do you handle food allergies and dietary restrictions?',
      answer: 'During registration, parents create a detailed dietary profile for each child. Our central kitchen features isolated allergen-safe preparation stations. Every tiffin container is labeled with the child’s name, classroom, and high-visibility dietary alerts (e.g. Nut-Free, Dairy-Free, Pure Jain).'
    },
    {
      question: 'Are the food containers hygienic and eco-friendly?',
      answer: 'Absolutely. We use 100% food-grade SS304 stainless steel insulated tiffins that keep food warm above 65°C without single-use plastics. Containers are collected after lunch, commercially sanitized using triple-stage high-heat commercial dishwashers, and UV sterilized daily.'
    },
    {
      question: 'How do subscriptions and payments work?',
      answer: 'Subscriptions can be billed monthly or per school term (with a 10% discount). Payments are processed securely via UPI, credit/debit card, or net banking. You can cancel or pause anytime without hidden cancellation fees.'
    }
  ],

  // Key performance statistics
  stats: [
    { value: 18500, suffix: '+', label: 'Nutritious Meals Served Monthly' },
    { value: 48, suffix: '+', label: 'Partner Schools in City' },
    { value: 99.6, suffix: '%', label: 'On-Time Classroom Delivery' },
    { value: 100, suffix: '%', label: 'Fresh Chef-Crafted Ingredients' }
  ],

  // Enrolled children mock data for Profile page
  mockChildren: [
    {
      id: 'child-1',
      name: 'Aarav Sharma',
      age: 9,
      grade: 'Class 4-B',
      school: 'Oakridge International School',
      studentId: 'OIS-2024-8821',
      currentPlan: 'Standard Plan (Veg)',
      allergies: ['Peanuts (Mild)'],
      spicePreference: 'Mild',
      avatar: 'https://images.unsplash.com/photo-1595454223600-91fbdd77e58a?auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 'child-2',
      name: 'Ananya Sharma',
      age: 6,
      grade: 'Class 1-A',
      school: 'Oakridge International School',
      studentId: 'OIS-2025-1104',
      currentPlan: 'Standard Plan (Veg + Fruit)',
      allergies: ['None'],
      spicePreference: 'Very Mild',
      avatar: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=200&q=80'
    }
  ]
};

// Make available in browser global scope
if (typeof window !== 'undefined') {
  window.SCHOOLBITE_DATA = SCHOOLBITE_DATA;
}
