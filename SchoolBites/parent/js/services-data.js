/**
 * SchoolBite — Service Detail Data (services-data.js)
 * Central data store for all six service detail pages.
 * One UI template, six content sets.
 * Zero emojis. Lucide icon keys used throughout.
 */

const SERVICES_DETAIL_DATA = {

  /* ======================================================
     1. SCHOOL MEAL SERVICE
     ====================================================== */
  'school-meal': {
    key: 'school-meal',
    title: 'School Meal Service',
    category: 'SCHOOL MEAL SERVICE',
    heroTitle: 'Fresh, Nutritious Meals Delivered',
    heroTitleHighlight: 'to Schools.',
    heroDescription: 'Direct-to-classroom tiffin delivery right before the school lunch bell rings. Temperature-controlled insulated containers ensure meals stay fresh and warm.',
    heroImage: 'assets/images/hero_girl_lunchbox.jpg',
    heroImageAlt: 'A happy school girl with a nutritious tiffin lunchbox',
    heroImageFallback: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80',
    heroHighlights: [
      { icon: 'check-circle', label: 'Freshly Cooked' },
      { icon: 'shield-check',  label: 'Hygienic & Safe' },
      { icon: 'truck',         label: 'On-Time Delivery' }
    ],
    floatingCards: [
      { icon: 'flame',        line1: 'Hot & Fresh',      line2: 'Meals' },
      { icon: 'shield-check', line1: 'Safe & Hygienic',  line2: 'Delivery' },
      { icon: 'award',        line1: 'Loved by',         line2: 'Schools' }
    ],
    benefitsLabel: 'KEY BENEFITS',
    benefitsTitle: 'Why Choose Our School Meal Service?',
    benefitsDesc: 'We make school lunches simple, healthy and hassle-free for schools and parents.',
    benefits: [
      { icon: 'check-circle', title: 'Guaranteed Freshness',   desc: 'Meals delivered in a 30-minute window before lunch, keeping them fresh and warm.' },
      { icon: 'box',          title: 'Temperature Controlled', desc: 'Insulated, spill-proof containers maintain ideal temperature and quality.' },
      { icon: 'shield-check', title: 'Safe & Hygienic',        desc: 'Prepared in clean kitchens with strict hygiene and food safety standards.' },
      { icon: 'user',         title: 'School Coordination',    desc: 'Seamless coordination with school administration for smooth daily delivery.' }
    ],
    overviewLabel: 'OUR SERVICE',
    overviewTitle: 'Wholesome Meals for Growing Minds.',
    overviewText: 'Every meal is thoughtfully planned to provide balanced nutrition while keeping great taste in mind. Our school meal service ensures children receive healthy, home-style meals prepared with high-quality ingredients and care.',
    overviewImage: 'assets/images/meal_thursday_chapati.jpg',
    overviewImageAlt: 'Wholesome school meal in a tiffin box with vegetables',
    overviewImageFallback: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80',
    overviewHandwriting: 'Healthy\nMeals\nHappier\nKids',
    checklist: [
      'Balanced and nutritious meals',
      'Vegetarian and special dietary options',
      'Kid-friendly and tasty recipes',
      'Prepared under expert supervision'
    ],
    stepsTitle: 'How School Meal Service Works',
    steps: [
      { num: '01', icon: 'calendar',    title: 'Menu Planning',     desc: 'Menus are planned around balanced school meals by our nutritionist team.' },
      { num: '02', icon: 'flame',       title: 'Fresh Preparation', desc: 'Meals are freshly prepared every morning using quality, locally sourced ingredients.' },
      { num: '03', icon: 'truck',       title: 'On-Time Delivery',  desc: 'Meals reach classrooms 30 minutes before the lunch bell, hot and sealed.' },
      { num: '04', icon: 'heart',       title: 'Happy Students',    desc: 'Children enjoy fresh, nutritious meals that fuel their afternoon learning.' }
    ],
    highlightLabel: 'READY TO BRING HEALTHY MEALS TO YOUR SCHOOL?',
    highlightTitle: "Let's Make School Days Healthier.",
    highlightDesc: 'Partner with SchoolBite for fresh, nutritious and hassle-free school meal delivery.',
    highlightImage: 'assets/images/usecase_children.jpg',
    highlightImageAlt: 'Happy school children enjoying their meals',
    highlightImageFallback: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=600&q=80',
    highlightHandwriting: 'Good\nFood\nBrighter\nFutures',
    highlightItems: [
      { icon: 'check-circle', text: 'Zero Preservatives' },
      { icon: 'truck',        text: 'Reliable Daily Delivery' },
      { icon: 'shield-check', text: 'FSSAI Certified Kitchen' },
      { icon: 'heart',        text: 'Kids Love It' }
    ],
    ctaTitle: 'Ready to Make School Meals Easier?',
    ctaDesc: "Get started with SchoolBite and make your child's school meal experience simpler, healthier and hassle-free."
  },

  /* ======================================================
     2. WEEKLY MEAL PLANNING
     ====================================================== */
  'weekly-meal': {
    key: 'weekly-meal',
    title: 'Weekly Meal Planning',
    category: 'WEEKLY MEAL PLANNING',
    heroTitle: "Plan Your Child's Week of Meals",
    heroTitleHighlight: 'in Minutes.',
    heroDescription: "Intuitive parent dashboard to view and customise next week's menu by Saturday evening. Swap dishes easily according to your child's taste and nutritional needs.",
    heroImage: 'assets/images/usecase_parents.jpg',
    heroImageAlt: 'Parent planning school meals on a digital dashboard',
    heroImageFallback: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=800&q=80',
    heroHighlights: [
      { icon: 'calendar',     label: 'Plan Ahead' },
      { icon: 'refresh-cw',   label: 'Easy Swaps' },
      { icon: 'check-circle', label: 'Personalised' }
    ],
    floatingCards: [
      { icon: 'calendar',   line1: 'Plan Up To',    line2: '2 Weeks Ahead' },
      { icon: 'refresh-cw', line1: 'Swap Dishes',   line2: 'Instantly' },
      { icon: 'sparkles',   line1: 'Smart Meal',    line2: 'Suggestions' }
    ],
    benefitsLabel: 'KEY BENEFITS',
    benefitsTitle: 'Why Choose Our Weekly Meal Planning?',
    benefitsDesc: "Stay in complete control of what your child eats every school day from one simple dashboard.",
    benefits: [
      { icon: 'calendar',    title: 'Plan 2 Weeks Ahead',    desc: 'Select and customise meals up to two weeks in advance with a simple click.' },
      { icon: 'refresh-cw',  title: 'One-Click Dish Swaps',  desc: 'Replace any dish from the weekly menu with an alternative in seconds.' },
      { icon: 'sparkles',    title: 'Macro Breakdown',       desc: 'See daily calorie, protein, carb and fat breakdowns for each planned meal.' },
      { icon: 'clock',       title: 'Weekly Reminders',      desc: 'Get automatic reminders every Saturday to review and lock in your plan.' }
    ],
    overviewLabel: 'OUR SERVICE',
    overviewTitle: 'Complete Menu Visibility. Total Parental Control.',
    overviewText: "SchoolBite's Weekly Meal Planner gives parents full transparency over school menus. Browse nutritionist-curated options, personalise according to your child's preferences, and confirm plans before Sunday cutoff.",
    overviewImage: 'assets/images/meal_wednesday_rice.jpg',
    overviewImageAlt: 'Weekly meal plan grid with colourful nutritious meals',
    overviewImageFallback: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    overviewHandwriting: 'Plan\nAhead\nEat\nWell',
    checklist: [
      'View full weekly menu every Thursday',
      'Swap any dish before Saturday evening',
      'Detailed macro nutrition per meal',
      'Changes reflected instantly in delivery'
    ],
    stepsTitle: 'How Weekly Meal Planning Works',
    steps: [
      { num: '01', icon: 'calendar',     title: 'Browse the Menu',   desc: "Every Thursday, view next week's freshly planned nutritionist-approved menu." },
      { num: '02', icon: 'edit-3',       title: 'Customise Dishes',  desc: 'Swap any item or adjust portions before Saturday 8 PM via the parent app.' },
      { num: '03', icon: 'check-circle', title: 'Confirm Your Plan', desc: 'Lock in your selections. Our kitchen prepares accordingly each morning.' },
      { num: '04', icon: 'truck',        title: 'Meals Delivered',   desc: 'Your planned meals arrive fresh and on time at school every weekday.' }
    ],
    highlightLabel: "TAKE FULL CONTROL OF YOUR CHILD'S NUTRITION",
    highlightTitle: 'Meal Planning Made Effortless.',
    highlightDesc: "Say goodbye to guessing what your child ate at school. SchoolBite keeps you informed and in control every single week.",
    highlightImage: 'assets/images/usecase_parents.jpg',
    highlightImageAlt: 'Parent reviewing weekly meal plan on a phone',
    highlightImageFallback: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=600&q=80',
    highlightHandwriting: 'Plan\nBetter\nEat\nBetter',
    highlightItems: [
      { icon: 'calendar',    text: 'Weekly Advance Menu' },
      { icon: 'refresh-cw',  text: 'Flexible Dish Swaps' },
      { icon: 'sparkles',    text: 'Nutritionist Curated' },
      { icon: 'check-circle',text: 'One-Click Confirm' }
    ],
    ctaTitle: "Start Planning Your Child's Meals Today",
    ctaDesc: "Take the guesswork out of school lunches. Plan ahead with SchoolBite's easy weekly meal planning dashboard."
  },

  /* ======================================================
     3. MEAL SUBSCRIPTIONS
     ====================================================== */
  'meal-subscriptions': {
    key: 'meal-subscriptions',
    title: 'Meal Subscriptions',
    category: 'MEAL SUBSCRIPTIONS',
    heroTitle: 'Flexible Subscriptions With',
    heroTitleHighlight: 'Zero Lock-In.',
    heroDescription: 'Flexible monthly or term-based subscriptions with zero long-term locks. Pause deliveries on sick days, school holidays, or family vacations with one tap.',
    heroImage: 'assets/images/hero_school_girl.jpg',
    heroImageAlt: 'Happy student with a SchoolBite subscription meal',
    heroImageFallback: 'https://images.unsplash.com/photo-1581349485608-9469926a8e5e?auto=format&fit=crop&w=800&q=80',
    heroHighlights: [
      { icon: 'refresh-cw',   label: 'Pause Anytime' },
      { icon: 'rupee',  label: 'No Lock-In' },
      { icon: 'check-circle', label: 'Auto Credit' }
    ],
    floatingCards: [
      { icon: 'refresh-cw',  line1: 'Pause & Resume',  line2: 'Anytime' },
      { icon: 'rupee', line1: 'Credit Rollover', line2: 'Guaranteed' },
      { icon: 'shield',      line1: 'No Hidden',       line2: 'Charges' }
    ],
    benefitsLabel: 'KEY BENEFITS',
    benefitsTitle: 'Why Choose Our Meal Subscriptions?',
    benefitsDesc: 'A school meal subscription that works around your family — not the other way around.',
    benefits: [
      { icon: 'refresh-cw',  title: 'Pause Anytime',        desc: 'Pause deliveries for sick days, school holidays, or vacations via the parent portal.' },
      { icon: 'rupee', title: 'Credit Rollover',      desc: 'Unused meal credits automatically carry over to your next active period.' },
      { icon: 'shield',      title: 'No Lock-In Contracts', desc: 'Cancel any time without penalty fees or complicated exit procedures.' },
      { icon: 'sparkles',    title: 'Best Value Plans',     desc: 'Save up to 20% with term plans versus paying weekly. Transparent pricing always.' }
    ],
    overviewLabel: 'OUR SERVICE',
    overviewTitle: "Subscriptions That Fit Your Family's Rhythm.",
    overviewText: "Choose from Weekly, Monthly, or Term subscriptions based on what works best for your schedule. SchoolBite's subscription model is designed to be fully flexible giving families complete control with zero stress.",
    overviewImage: 'assets/images/meal_monday_idli.jpg',
    overviewImageAlt: 'Meal subscription plan selection on a parent dashboard',
    overviewImageFallback: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=600&q=80',
    overviewHandwriting: 'Flexible\nPlans\nZero\nStress',
    checklist: [
      'Weekly, Monthly, and Term plans available',
      'Pause and resume with one tap',
      'Automatic credit rollover for missed days',
      'No penalty for cancellations or changes'
    ],
    stepsTitle: 'How Meal Subscriptions Work',
    steps: [
      { num: '01', icon: 'rupee',  title: 'Choose a Plan',     desc: "Select Weekly, Monthly or Term based on your family's schedule and budget." },
      { num: '02', icon: 'check-circle', title: 'Set Preferences',   desc: 'Configure dietary preferences and delivery schedule on your first setup.' },
      { num: '03', icon: 'refresh-cw',   title: 'Manage Flexibly',   desc: 'Pause, skip or resume deliveries anytime from the SchoolBite parent portal.' },
      { num: '04', icon: 'sparkles',     title: 'Enjoy Savings',     desc: 'Longer plans unlock greater savings, and unused credits always roll forward.' }
    ],
    highlightLabel: 'BUILT AROUND YOUR FAMILY',
    highlightTitle: 'Subscriptions That Never Work Against You.',
    highlightDesc: 'Every SchoolBite subscription is designed to give families maximum control, zero stress and outstanding value.',
    highlightImage: 'assets/images/usecase_parents.jpg',
    highlightImageAlt: 'Parent managing meal subscription on a smartphone',
    highlightImageFallback: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=600&q=80',
    highlightHandwriting: 'Your\nPlan\nYour\nRules',
    highlightItems: [
      { icon: 'refresh-cw',  text: 'Pause Anytime' },
      { icon: 'rupee', text: 'Credit Rollover' },
      { icon: 'shield',      text: 'No Lock-In' },
      { icon: 'sparkles',    text: 'Save Up to 20%' }
    ],
    ctaTitle: 'Start a SchoolBite Subscription Today',
    ctaDesc: "Pick a plan, set your preferences, and let SchoolBite handle fresh, nutritious school lunches every single day."
  },

  /* ======================================================
     4. DIETARY PREFERENCES
     ====================================================== */
  'dietary-preferences': {
    key: 'dietary-preferences',
    title: 'Dietary Preferences',
    category: 'DIETARY PREFERENCES',
    heroTitle: "Meals Tailored to Every",
    heroTitleHighlight: "Child's Needs.",
    heroDescription: 'Specialised menus calibrated for unique dietary needs including pure vegetarian, gluten-sensitive, nut-free, dairy-free and Jain preferences. Every child deserves a meal made just for them.',
    heroImage: 'assets/images/usecase_chef.jpg',
    heroImageAlt: 'A chef carefully preparing specialised dietary meals',
    heroImageFallback: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80',
    heroHighlights: [
      { icon: 'shield-check', label: 'Allergen Safe' },
      { icon: 'heart',        label: 'Jain Friendly' },
      { icon: 'check-circle', label: 'Custom Menus' }
    ],
    floatingCards: [
      { icon: 'shield-check', line1: 'Allergen-Safe',  line2: 'Preparation' },
      { icon: 'heart',        line1: 'Jain & Vegan',   line2: 'Options' },
      { icon: 'check-circle', line1: 'Labelled',       line2: 'Every Box' }
    ],
    benefitsLabel: 'KEY BENEFITS',
    benefitsTitle: 'Why Choose Our Dietary Preferences Service?',
    benefitsDesc: 'No child is left behind. We accommodate every dietary need with care, precision and expert nutritional guidance.',
    benefits: [
      { icon: 'shield-check', title: 'Isolated Allergen Zones', desc: 'Strictly separated preparation zones for nut-free, dairy-free and gluten-sensitive meals.' },
      { icon: 'heart',        title: 'Jain & Vegan Menus',     desc: 'Dedicated Jain and vegan meal menus prepared with full compliance to dietary rules.' },
      { icon: 'check-circle', title: 'Allergen Labels',         desc: 'Clear allergen indicators on every lunch box for full transparency at every delivery.' },
      { icon: 'user',         title: 'Nutritionist Guidance',   desc: 'Paediatric nutritionist consultation available for complex dietary needs.' }
    ],
    overviewLabel: 'OUR SERVICE',
    overviewTitle: 'Every Preference. Every Child. Every Day.',
    overviewText: 'At SchoolBite, we believe every child deserves a meal that respects their dietary needs. From gluten-sensitive menus to Jain-compliant options, our kitchen team is trained to handle each requirement with precision, care and absolute hygiene standards.',
    overviewImage: 'assets/images/meal_tuesday_dosa.jpg',
    overviewImageAlt: 'Allergen-labelled dietary preference meal in a tiffin',
    overviewImageFallback: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=600&q=80',
    overviewHandwriting: 'Every\nChild\nEvery\nMeal',
    checklist: [
      'Nut-free, gluten-free and dairy-free menus',
      'Jain and vegan meal options available',
      'Allergen indicators on every lunch box',
      'Paediatric nutritionist on-call support'
    ],
    stepsTitle: 'How Dietary Preferences Work',
    steps: [
      { num: '01', icon: 'edit-3',       title: 'Set Preferences',   desc: "Mark your child's dietary needs and allergens during registration or via the app." },
      { num: '02', icon: 'shield-check', title: 'Safe Preparation',  desc: 'Our kitchen prepares allergen meals in dedicated isolated zones with full traceability.' },
      { num: '03', icon: 'check-circle', title: 'Allergen Labelling', desc: 'Each meal box is clearly labelled with dietary category and allergen-free certification.' },
      { num: '04', icon: 'truck',        title: 'Safe Delivery',      desc: 'Your child receives a meal that is safe, delicious and perfectly suited to their needs.' }
    ],
    highlightLabel: 'DIETARY SAFETY IS OUR PRIORITY',
    highlightTitle: 'Safe, Personalised Meals for Every Child.',
    highlightDesc: 'Our kitchen follows FSSAI allergen protocols and maintains dedicated zones to ensure every dietary requirement is met with absolute confidence.',
    highlightImage: 'assets/images/usecase_chef.jpg',
    highlightImageAlt: 'Chef handling allergen-safe meal preparation',
    highlightImageFallback: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=600&q=80',
    highlightHandwriting: 'Safe\nFor\nEvery\nChild',
    highlightItems: [
      { icon: 'shield-check', text: 'FSSAI Allergen Protocol' },
      { icon: 'heart',        text: 'Jain & Vegan Options' },
      { icon: 'check-circle', text: 'Clearly Labelled Boxes' },
      { icon: 'user',         text: 'Nutritionist Support' }
    ],
    ctaTitle: 'Get a Dietary-Safe Meal Plan for Your Child',
    ctaDesc: 'SchoolBite accommodates every dietary need with care and expertise. Set preferences today and let us handle the rest.'
  },

  /* ======================================================
     5. NUTRITION-FOCUSED MEALS
     ====================================================== */
  'nutrition-focused': {
    key: 'nutrition-focused',
    title: 'Nutrition-Focused Meals',
    category: 'NUTRITION-FOCUSED MEALS',
    heroTitle: 'Science-Backed Nutrition for',
    heroTitleHighlight: 'Growing Minds.',
    heroDescription: 'Every recipe is formulated in collaboration with paediatric nutritionists to meet ICMR growth benchmarks without artificial additives or preservatives.',
    heroImage: 'assets/images/meal_wednesday_rice.jpg',
    heroImageAlt: 'A balanced, nutritious school meal with vegetables and grains',
    heroImageFallback: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    heroHighlights: [
      { icon: 'award',        label: 'ICMR Benchmarks' },
      { icon: 'check-circle', label: 'Zero Additives' },
      { icon: 'heart',        label: 'Nutritionist Crafted' }
    ],
    floatingCards: [
      { icon: 'award',        line1: 'ICMR',              line2: 'Compliant' },
      { icon: 'shield-check', line1: 'Zero Preservatives',line2: 'Guaranteed' },
      { icon: 'sparkles',     line1: 'Nutritionist',      line2: 'Approved' }
    ],
    benefitsLabel: 'KEY BENEFITS',
    benefitsTitle: 'Why Choose Our Nutrition-Focused Meals?',
    benefitsDesc: "Every bite supports your child's growth, cognition and energy — backed by science, crafted with care.",
    benefits: [
      { icon: 'award',        title: 'ICMR Growth Standards', desc: 'All menus are aligned with Indian Council of Medical Research child nutrition benchmarks.' },
      { icon: 'shield-check', title: 'Zero Refined Sugars',   desc: 'No refined white sugar, maida or palm oil. Only wholesome, minimally processed ingredients.' },
      { icon: 'sparkles',     title: '2+ Vegetable Servings', desc: 'Every meal includes at least two servings of fresh seasonal vegetables for fibre and micronutrients.' },
      { icon: 'heart',        title: 'Steady Glycaemic Index',desc: 'Balanced GI meals support sustained classroom focus and avoid post-lunch energy crashes.' }
    ],
    overviewLabel: 'OUR SERVICE',
    overviewTitle: 'Nutrition You Can Trust. Every Single Day.',
    overviewText: 'Our nutrition team collaborates with paediatric nutritionists and FSSAI-certified chefs to design menus that go beyond filling stomachs — they support growth, immunity and cognitive development at every age group in school.',
    overviewImage: 'assets/images/meal_friday_noodles.jpg',
    overviewImageAlt: 'Nutritious school meal with vegetables, grains and protein',
    overviewImageFallback: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=600&q=80',
    overviewHandwriting: 'Good\nFood\nBrighter\nFutures',
    checklist: [
      'Zero refined sugar, maida or palm oil',
      'At least 2 fresh vegetable servings per meal',
      'Balanced glycaemic index for focus',
      'Paediatric nutritionist co-developed recipes'
    ],
    stepsTitle: 'How Nutrition-Focused Meals Are Made',
    steps: [
      { num: '01', icon: 'award',        title: 'Nutrition Research',  desc: 'Our nutritionists study ICMR benchmarks and child development data to design meal targets.' },
      { num: '02', icon: 'edit-3',       title: 'Recipe Development',  desc: 'Chefs and nutritionists co-create recipes that hit nutritional targets and taste great.' },
      { num: '03', icon: 'shield-check', title: 'Quality Testing',     desc: 'Each batch undergoes ingredient quality checks and calorie-macro verification before cooking.' },
      { num: '04', icon: 'sparkles',     title: 'Delivered Fresh',     desc: "Freshly prepared meals reach your child's classroom before the lunch bell rings." }
    ],
    highlightLabel: 'NUTRITION YOU CAN TRUST',
    highlightTitle: 'Every Meal is a Step Towards Better Health.',
    highlightDesc: "SchoolBite's nutrition-first approach ensures your child builds healthy eating habits that last a lifetime.",
    highlightImage: 'assets/images/usecase_children.jpg',
    highlightImageAlt: 'Children happily eating nutritious school meals',
    highlightImageFallback: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=600&q=80',
    highlightHandwriting: 'Good\nFood\nBrighter\nFutures',
    highlightItems: [
      { icon: 'award',        text: 'Essential Vitamins' },
      { icon: 'heart',        text: 'High Protein Options' },
      { icon: 'sparkles',     text: 'Wholesome Grains' },
      { icon: 'check-circle', text: 'Fresh Vegetables' }
    ],
    ctaTitle: "Give Your Child Nutrition That Supports Their Growth",
    ctaDesc: "SchoolBite's science-backed meals go beyond filling stomachs — they fuel growth, focus and wellbeing every single day."
  },

  /* ======================================================
     6. EASY DIGITAL PAYMENTS
     ====================================================== */
  'digital-payments': {
    key: 'digital-payments',
    title: 'Easy Digital Payments',
    category: 'EASY DIGITAL PAYMENTS',
    heroTitle: 'Hassle-Free Payments for',
    heroTitleHighlight: 'Busy Parents.',
    heroDescription: 'Hassle-free automated recurring payments through UPI, Net Banking, credit cards or digital wallets. Itemised GST invoices and instant receipts every month.',
    heroImage: 'assets/images/usecase_parents.jpg',
    heroImageAlt: 'Parent making a secure digital payment for school meals',
    heroImageFallback: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
    heroHighlights: [
      { icon: 'shield',       label: 'Secure Gateway' },
      { icon: 'rupee',  label: 'Auto Payments' },
      { icon: 'check-circle', label: 'GST Receipts' }
    ],
    floatingCards: [
      { icon: 'shield',       line1: 'Tokenised',    line2: 'Secure Gateway' },
      { icon: 'rupee',  line1: 'UPI / Cards',  line2: 'Wallets Accepted' },
      { icon: 'check-circle', line1: 'Instant GST',  line2: 'Receipts' }
    ],
    benefitsLabel: 'KEY BENEFITS',
    benefitsTitle: 'Why Choose Our Easy Digital Payments?',
    benefitsDesc: "SchoolBite's payment system is built for busy parents — secure, automatic and completely transparent.",
    benefits: [
      { icon: 'shield',       title: 'Tokenised Security',     desc: 'Payments processed through a PCI-DSS compliant tokenised gateway for maximum security.' },
      { icon: 'rupee',  title: 'Multiple Payment Modes', desc: 'UPI, Net Banking, credit cards, debit cards and popular digital wallets are all supported.' },
      { icon: 'check-circle', title: 'Instant GST Receipts',   desc: 'Receive instant digital receipts and monthly GST statements directly in your inbox.' },
      { icon: 'sparkles',     title: 'Auto-Renewal Alerts',    desc: 'Smart reminders 3 days before each billing cycle so you are always in control.' }
    ],
    overviewLabel: 'OUR SERVICE',
    overviewTitle: 'Pay Once. Enjoy All Month.',
    overviewText: "SchoolBite's digital payment system eliminates the burden of manual monthly transactions. Set up auto-pay once and forget about it. Every transaction is encrypted, every invoice is GST-compliant, and every payment history is accessible anytime.",
    overviewImage: 'assets/images/meal_monday_idli.jpg',
    overviewImageAlt: 'Secure digital payment confirmation on a smartphone',
    overviewImageFallback: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=600&q=80',
    overviewHandwriting: 'Easy\nPay\nZero\nWorry',
    checklist: [
      'UPI, credit/debit cards and wallets accepted',
      'Auto-pay setup with one-time authorisation',
      'Instant digital receipts and GST invoices',
      'Refunds processed within 3 business days'
    ],
    stepsTitle: 'How Easy Digital Payments Work',
    steps: [
      { num: '01', icon: 'rupee',  title: 'Choose Payment Mode',   desc: 'Select your preferred payment method — UPI, card, net banking or wallet.' },
      { num: '02', icon: 'shield',       title: 'Secure Authorisation',  desc: 'One-time secure authorisation sets up auto-pay for your chosen subscription plan.' },
      { num: '03', icon: 'refresh-cw',   title: 'Auto Renewal',          desc: 'Payments are automatically collected at the start of each subscription cycle.' },
      { num: '04', icon: 'check-circle', title: 'Receipts Delivered',    desc: 'Instant digital GST receipt and itemised invoice sent to your registered email.' }
    ],
    highlightLabel: 'PAYMENTS THAT WORK FOR PARENTS',
    highlightTitle: 'Secure, Automatic and Completely Transparent.',
    highlightDesc: "SchoolBite's payment system gives you complete financial visibility and control with zero friction or hidden charges.",
    highlightImage: 'assets/images/cta_child_thumbsup.jpg',
    highlightImageAlt: 'Happy child giving thumbs up after a school meal',
    highlightImageFallback: 'https://images.unsplash.com/photo-1569878308 Kel?auto=format&fit=crop&w=600&q=80',
    highlightHandwriting: 'Easy\nPay\nZero\nWorry',
    highlightItems: [
      { icon: 'shield',       text: 'PCI-DSS Secure' },
      { icon: 'rupee',  text: 'All Payment Modes' },
      { icon: 'check-circle', text: 'GST Invoices' },
      { icon: 'sparkles',     text: 'Zero Hidden Fees' }
    ],
    ctaTitle: 'Set Up Easy Payments for School Meals',
    ctaDesc: 'Automate your school meal payments with SchoolBite. One-time setup, zero monthly hassle and full financial transparency.'
  }
};

/**
 * Ordered list of service keys for prev/next navigation
 */
const SERVICES_ORDER = [
  'school-meal',
  'weekly-meal',
  'meal-subscriptions',
  'dietary-preferences',
  'nutrition-focused',
  'digital-payments'
];

/**
 * Global testimonials used across all service detail pages
 */
const SERVICE_TESTIMONIALS = [
  {
    name: 'Priya Ramesh',
    role: 'Parent of Class 4 Student',
    avatar: 'assets/images/team_priya_sharma.jpg',
    rating: 5,
    text: 'SchoolBite has been a life-changer. My daughter always comes home energetic and says her lunch was the best in class. The delivery is perfectly timed every single day.'
  },
  {
    name: 'Arjun Menon',
    role: 'Father of Two School Children',
    avatar: 'assets/images/team_rahul_mehta.jpg',
    rating: 5,
    text: 'The weekly planning feature is incredible. I can swap meals based on what my sons feel like eating. No more wasted lunches. Completely worth every rupee.'
  },
  {
    name: 'Kavitha Suresh',
    role: 'Parent, School PTA Member',
    avatar: 'assets/images/team_sneha_iyer.jpg',
    rating: 5,
    text: 'As someone who advocated for better school nutrition in our PTA, I am thrilled SchoolBite delivers on every promise — fresh food, timely delivery and excellent hygiene.'
  }
];
