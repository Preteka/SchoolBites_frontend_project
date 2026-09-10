/**
 * SchoolBite Journal — Blog Data (blog-data.js)
 * Comprehensive, authoritative article datasets for the SchoolBite Journal.
 * Keys are accessible by slug (e.g. 'brain-food') or legacy ID ('blog-1').
 */

window.SCHOOLBITE_BLOGS = {
  "brain-food": {
    id: "blog-1",
    slug: "brain-food",
    category: "Child Nutrition",
    title: "Brain Food: What Really Fuels Your Child’s School Day Focus",
    date: "September 3, 2026",
    readTime: "4 min read",
    author: "Dr. Neha Sharma",
    authorRole: "Pediatric Nutrition Specialist & Consultant",
    authorAvatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80",
    imageCaption: "A balanced arrangement of micronutrient-dense berries, walnuts, whole grains, and fresh greens.",
    excerpt: "Discover how slow-release complex carbohydrates, cold-pressed omega fats, and micronutrients directly influence classroom alertness, mood regulation, and afternoon memory retention.",
    intro: "When a child sits down at their school desk at 8:30 AM, their developing brain accounts for up to 25% of their total metabolic energy consumption. During 6 hours of academic instruction, cognitive endurance depends not on quick spikes of sugar, but on a steady, continuous stream of clean glucose and essential neuro-nutrients.",
    highlights: [
      "Complex carbs prevent the dreaded 1:30 PM post-lunch classroom lethargy.",
      "Omega-3 DHA accounts for over 30% of total brain structural fats.",
      "Just 2% mild dehydration can decrease attention span and working memory by 15%."
    ],
    sections: [
      {
        id: "glucose-rollercoaster",
        heading: "The Glucose Rollercoaster: Simple Sugars vs. Complex Carbs",
        content: "Refined white flour, processed breakfast cereals, and sugary fruit juices break down into glucose almost instantly in the bloodstream. This triggers a sudden insulin surge followed by a sharp blood sugar crash within 90 minutes—often coinciding exactly with mid-morning math or reading periods.\n\nIn contrast, unpolished millets (like foxtail, ragi, and jowar), whole rolled oats, and fiber-rich legumes digest slowly over 4 to 5 hours. This sustained release ensures that children remain calm, alert, and receptive throughout their morning lessons without emotional volatility or hyperactivity spikes."
      },
      {
        id: "omega-3-fats",
        heading: "Omega-3 Fatty Acids: Building Cellular Memory Shields",
        content: "The human brain is roughly 60% fat, and Docosahexaenoic Acid (DHA)—a key Omega-3 polyunsaturated fat—is the primary structural component of cerebral synapses and retinal photoreceptors.\n\nDiets rich in cold-pressed seeds (flaxseed, chia), walnuts, and healthy plant fats help maintain neurotransmitter membrane fluidity. Clinical pediatric studies repeatedly demonstrate that children who receive adequate daily Omega-3s show significant improvements in reading speed, task switching, and spatial memory."
      },
      {
        id: "iron-and-b-vitamins",
        heading: "Iron & B-Vitamins: The Classroom Oxygen Carriers",
        content: "Even borderline, sub-clinical iron deficiencies can manifest as fatigue, short attention span, and irritability. Iron is essential for hemoglobin synthesis, carrying life-giving oxygen directly to brain tissues during focused study.\n\nPairing iron-rich foods (spinach, beetroot, lentils) with natural Vitamin C (lemon juice, bell peppers, amla) triples bioavailability. At SchoolBite, every meal plan is engineered by clinical dietitians to ensure natural bio-absorption synergies in every lunch container."
      },
      {
        id: "hydration-multiplier",
        heading: "Hydration: The Forgotten Cognitive Multiplier",
        content: "Children rarely recognize early thirst signals while engaged in school activities and play. By the time a student feels visibly thirsty, cognitive processing speed has already dropped.\n\nEncouraging water-rich foods like crisp cucumbers, seasonal citrus slices, and mild buttermilk alongside lunches provides natural intracellular hydration and prevents mid-day fatigue headaches."
      },
      {
        id: "smart-lunchbox-formula",
        heading: "The SchoolBite Smart Lunchbox Formula",
        content: "Building the ultimate brain-power lunch doesn't have to be complicated. Our culinary team adheres to the 4-part Golden Ratio:\n\n• 40% Slow-Release Complex Carbohydrates (Millet rotis, quinoa, red rice pulao)\n• 30% Clean Bioactive Proteins & Legumes (Sprouted moong, paneer, tofu cubes, lentil dal)\n• 20% Colorful Micronutrient Vegetables (Broccoli florets, bell peppers, sauteed greens)\n• 10% Healthy Fats & Seeds (Roasted pumpkin seeds, cold-pressed sesame dressing)"
      }
    ],
    quote: {
      text: "You cannot teach a brain that is fighting a glucose crash. Clean food is the most fundamental prerequisite for academic success.",
      author: "Dr. Neha Sharma, Pediatric Nutrition Specialist"
    },
    relatedSlugs: ["picky-eating", "sugar-crash", "morning-rush"]
  },

  "picky-eating": {
    id: "blog-2",
    slug: "picky-eating",
    category: "Healthy Habits",
    title: "5 Ways to Overcome Picky Eating Without Mealtime Tears",
    date: "August 28, 2026",
    readTime: "6 min read",
    author: "Priya Raman",
    authorRole: "Child Development Coach & Behavioral Therapist",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=1200&q=80",
    imageCaption: "Engaging, colorful bento presentation makes exploring new veggies an adventure rather than a chore.",
    excerpt: "Practical, stress-free strategies to gently introduce diverse colors, textures, and wholesome vegetables into your schooler’s diet.",
    intro: "For millions of parents, 7:00 AM lunchbox packing and 7:00 PM family dinners are battlegrounds of negotiation, bribery, and tearful standoffs. But behavioral child psychology reveals that fussy eating is rarely about defiance—it is almost always rooted in sensory overwhelm and a natural developmental phase called food neophobia.",
    highlights: [
      "It takes an average of 12 to 15 gentle, pressure-free exposures before a child accepts a new vegetable.",
      "The 'Division of Responsibility' removes 90% of mealtime emotional battles.",
      "Interactive visual presentation (shapes, dips, color sorting) increases trial rates by over 65%."
    ],
    sections: [
      {
        id: "division-of-responsibility",
        heading: "1. The Golden Rule: Division of Responsibility in Feeding",
        content: "Developed by renowned feeding specialist Ellyn Satter, this framework clearly divides mealtime roles:\n\n• The Parent's Job: Decide WHAT food is served, WHEN it is served, and WHERE it is served.\n• The Child's Job: Decide WHETHER to eat, and HOW MUCH to eat.\n\nWhen parents stop pressuring children to take 'just one more bite,' mealtime anxiety evaporates. Children instinctively tune into their internal satiety cues and become far more adventurous eaters."
      },
      {
        id: "rule-of-15-exposures",
        heading: "2. The Rule of 15 Micro-Exposures",
        content: "Most parents give up on a vegetable after 2 or 3 rejections. However, sensory science proves that children need 12 to 15 calm exposures before their taste buds and brain normalize a new flavor or texture.\n\nA micro-exposure doesn't even require eating. Simply seeing a baby carrot on their tray, smelling a roast cauliflower floret, or touching a bell pepper slice all count as successful sensory steps toward acceptance."
      },
      {
        id: "deconstruct-meals",
        heading: "3. Deconstruct Rather Than Mix",
        content: "Children are naturally suspicious of casseroles, complex mixed curries, and hidden sauces where ingredients cannot be visually verified.\n\nTry serving ingredients deconstructed side-by-side in separate compartments. Presenting diced steamed paneer, cucumber wheels, and dip separately allows children to control their eating experience with confidence."
      },
      {
        id: "involve-kids-in-plating",
        heading: "4. Let Them Customize Their Bento",
        content: "When children have agency in selecting from 2 parent-approved healthy options (e.g., 'Would you like sweet corn or steamed edamame in your box tomorrow?'), their psychological resistance drops dramatically. They feel ownership over their meal."
      },
      {
        id: "praise-curiosity-not-clearing-plates",
        heading: "5. Celebrate Curiosity Over Clean Plates",
        content: "Praise your child for trying a tiny nibble or describing a flavor ('That is tangy!') rather than demanding a completely empty container. Fostering a positive, fearless relationship with food will pay lifelong health dividends."
      }
    ],
    quote: {
      text: "Children do not need to be tricked into eating vegetables. They need a safe environment where curiosity is celebrated over compliance.",
      author: "Priya Raman, Child Development Coach"
    },
    relatedSlugs: ["brain-food", "cauliflower-alfredo", "morning-rush"]
  },

  "morning-rush": {
    id: "blog-3",
    slug: "morning-rush",
    category: "School Life",
    title: "Morning Rush Hacks: How Modern Parents Save 45 Minutes Daily",
    date: "August 19, 2026",
    readTime: "5 min read",
    author: "Sunita & Rahul Verma",
    authorRole: "SchoolBite Parents & Productivity Authors",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80",
    imageCaption: "Calm, organized mornings lead to happier classrooms and focused students.",
    excerpt: "How delegating school lunch logistics transformed one Bengaluru family’s morning routine from high-pressure chaos to peaceful breakfast chats.",
    intro: "Between 6:00 AM and 7:45 AM, the average household experiences peak daily cortisol levels. Packing school bags, finding matching socks, rushing breakfast, and chopping vegetables for multiple lunchboxes turns what should be a connecting family hour into an Olympic sprint.",
    highlights: [
      "The average parent spends 42 minutes every single school morning on lunch preparation and cleanup.",
      "Morning stress directly impacts a child’s emotional regulation during the first 2 hours of class.",
      "Outsourcing meal prep frees up 140+ hours across a single academic school year."
    ],
    sections: [
      {
        id: "morning-friction-audit",
        heading: "The 6:00 AM Friction Point: What Steals Your Time?",
        content: "A time-audit conducted across 500 urban working parents revealed that school lunch preparation accounts for over 50% of total morning stress. From washing and peeling vegetables, cooking fresh rotis, waiting for food to cool so containers don't create condensation, to washing sticky pans—the friction is relentless."
      },
      {
        id: "pre-staging-routine",
        heading: "Pre-Staging the Night Before: The 15-Minute Launchpad",
        content: "Establish a dedicated 'Launch Station' near the front door. Uniforms, ironed socks, signed permission slips, and water bottles are staged before bedtime. This removes 10 micro-decisions from tired morning brains."
      },
      {
        id: "outsourcing-school-lunch",
        heading: "Eliminating the Daily Kitchen Battle with SchoolBite",
        content: "When we switched to SchoolBite subscriptions, our morning dynamic changed overnight. Knowing that our daughter would receive a hot, chef-prepared, dietitian-approved meal delivered directly to her school desk at 12:15 PM eliminated the need to wake up at 5:45 AM."
      },
      {
        id: "the-peaceful-breakfast",
        heading: "Reclaiming the 20-Minute Family Breakfast",
        content: "Instead of shouting instructions while frying snacks over the stove, parents can sit down, share warm tea, and have meaningful conversations with their children before they head to the school bus. The emotional return on investment is priceless."
      }
    ],
    quote: {
      text: "Our mornings are no longer a sprint against the clock. We actually sit together, talk about the day ahead, and leave home with smiles.",
      author: "Sunita Verma, SchoolBite Parent"
    },
    relatedSlugs: ["picky-eating", "safe-food-standards", "brain-food"]
  },

  "cauliflower-alfredo": {
    id: "blog-4",
    slug: "cauliflower-alfredo",
    category: "Recipes",
    title: "Our Secret Cauliflower Alfredo: Kid-Approved & Fiber-Packed",
    date: "August 10, 2026",
    readTime: "3 min read",
    author: "Chef Rajesh Nair",
    authorRole: "Head of Culinary Operations & Master Chef",
    authorAvatar: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=200&q=80",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80",
    imageCaption: "Creamy, velvety whole-wheat fusilli coated in our signature nutrient-rich cauliflower cashew puree.",
    excerpt: "The exact recipe we use in our central kitchen to create creamy, velvety pasta sauce using pure steamed cauliflower and cashews.",
    intro: "Traditional restaurant Alfredo sauce relies on heavy double cream, excessive butter, and refined starches—delicious on the tongue, but notorious for causing severe afternoon food comas in young students. In our SchoolBite test kitchens, we perfected a velvety, luscious alternative that packs 2 full servings of vegetables and zero heavy dairy.",
    highlights: [
      "100% dairy-free or low-dairy adaptable, naturally rich in Vitamin C and Folate.",
      "Blended steamed cauliflower and soaked cashews create an indistinguishable velvety cream texture.",
      "Delivers 6g of prebiotic dietary fiber per child serving."
    ],
    sections: [
      {
        id: "why-cauliflower-works",
        heading: "Why Cauliflower Makes the Perfect Cream Sauce Base",
        content: "When gently steamed until fork-tender and blended at high RPM with nutritional yeast, garlic, and soaked whole cashews, cauliflower transforms into an impossibly smooth, glossy emulsion. It carries herbs and spices beautifully without the heavy saturated fat load of commercial cooking cream."
      },
      {
        id: "kitchen-ingredients",
        heading: "Ingredients for 4 Student Servings",
        content: "• 1 medium head of fresh white cauliflower (cut into small florets)\n• 1/2 cup raw cashews (soaked in warm water for 20 minutes)\n• 3 cloves roasted garlic (mellow and sweet)\n• 1.5 cups low-sodium vegetable broth or warm water\n• 2 tbsp nutritional yeast (for rich cheesy depth)\n• 1 tbsp cold-pressed extra virgin olive oil\n• 1/2 tsp crushed black pepper & 1/2 tsp pink rock salt\n• 300g whole wheat fusilli or penne pasta"
      },
      {
        id: "step-by-step-prep",
        heading: "Step-by-Step Preparation",
        content: "1. Steam the florets: Steam cauliflower over boiling water for 10-12 minutes until completely tender.\n2. High-speed blend: Transfer hot cauliflower, drained cashews, roasted garlic, broth, olive oil, and nutritional yeast to a blender. Blend for 90 seconds until glossy and silk-like.\n3. Fold into pasta: Toss with al-dente whole wheat pasta and folded baby spinach leaves until lightly wilted.\n4. Garnish: Top with toasted sunflower seeds for a satisfying crunch!"
      }
    ],
    quote: {
      text: "When food tastes like comfort food but fuels like superfood, kids eat every single forkful without ever asking what is inside.",
      author: "Chef Rajesh Nair, SchoolBite Executive Chef"
    },
    relatedSlugs: ["brain-food", "sugar-crash", "picky-eating"]
  },

  "sugar-crash": {
    id: "blog-5",
    slug: "sugar-crash",
    category: "Child Nutrition",
    title: "Sugar Crash Syndrome: Spotting Hidden Sweeteners in Kids’ Snacks",
    date: "July 30, 2026",
    readTime: "5 min read",
    author: "Dr. Neha Sharma",
    authorRole: "Pediatric Nutrition Specialist & Consultant",
    authorAvatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80",
    image: "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?auto=format&fit=crop&w=1200&q=80",
    imageCaption: "Whole fresh fruit provides natural fructose bound with dietary fiber, preventing insulin spikes.",
    excerpt: "Learn why supermarket juice boxes and packaged biscuits cause mid-morning lethargy and how whole fruits offer a steady release of energy.",
    intro: "Many parents conscientiously avoid giving candy or sodas to their children. Yet, everyday commercial 'healthy' snacks—including flavored yogurts, muesli bars, packaged fruit cups, and boxed juices—contain as much as 24 grams of added refined sugar per single portion.",
    highlights: [
      "A typical commercial juice box contains 5 to 6 teaspoons of concentrated free sugars.",
      "Hidden sugar names like maltodextrin, high-fructose corn syrup, and barley malt bypass common label inspections.",
      "Replacing refined snacks with whole berries and roasted seeds restores steady attention within 5 days."
    ],
    sections: [
      {
        id: "the-50-sugar-aliases",
        heading: "Decoding the 50 Aliases of Refined Sugar",
        content: "Food manufacturers frequently divide sugar among multiple ingredients so none appears as the primary item on the nutrition panel. Watch out for ingredients ending in '-ose' (sucrose, dextrose, maltose), as well as fruit juice concentrates, agave nectar, rice syrup, and dextrin."
      },
      {
        id: "the-ten-thirty-slump",
        heading: "The 10:30 AM Mid-Morning Behavioral Dip",
        content: "When blood glucose spikes rapidly from high-glycemic snacks, the pancreas releases an excessive wave of insulin. This drives glucose out of the blood and into storage faster than normal, resulting in reactive hypoglycemia. Symptoms include sudden irritability, fidgeting, brain fog, and classroom fatigue."
      },
      {
        id: "zero-sugar-promise",
        heading: "How SchoolBite Maintains Zero Refined Sugar",
        content: "All SchoolBite meals and afternoon snacks derive 100% of their sweetness from whole fruits, seed purees, dates, and slow-cooked cinnamon. By retaining natural fiber matrices, glucose absorption remains slow and steady throughout the academic day."
      }
    ],
    quote: {
      text: "Sugar is the single most common trigger for afternoon behavioral swings in elementary classrooms. Stabilize the glucose, and you stabilize the classroom.",
      author: "Dr. Neha Sharma, Pediatric Nutritionist"
    },
    relatedSlugs: ["brain-food", "cauliflower-alfredo", "picky-eating"]
  },

  "safe-food-standards": {
    id: "blog-6",
    slug: "safe-food-standards",
    category: "School Life",
    title: "Safe Food Standards: Inside Our Cleanroom Central Kitchens",
    date: "July 14, 2026",
    readTime: "4 min read",
    author: "Quality Assurance Team",
    authorRole: "SchoolBite Hygiene & Food Safety Board",
    authorAvatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80",
    imageCaption: "Hospital-grade stainless steel surfaces, automated ozone sanitization, and HEPA air filtration.",
    excerpt: "A transparent photographic look into our ozone wash stations, automated steam cooking vats, and strict temperature control logs.",
    intro: "Feeding thousands of students across dozens of schools every morning is a profound responsibility. At SchoolBite, our central kitchen facilities operate with the stringent sanitation protocols of pharmaceutical cleanrooms and international HACCP standards.",
    highlights: [
      "All raw vegetables undergo 3-stage ozone purification to eliminate 99.9% of microbial residues.",
      "Automated steam kettles maintain core cooking temperatures strictly above 75°C.",
      "Custom SS304 thermal containers are autoclaved and sealed under positive pressure."
    ],
    sections: [
      {
        id: "triple-ozone-wash",
        heading: "Triple-Ozone Vegetable & Fruit Purification",
        content: "Standard tap water washes cannot dislodge deep soil bacteria or agricultural residues. Every batch of fresh produce entering our preparation line undergoes a multi-stage ozone bubbling bath, neutralizing contaminants naturally without harmful chemical sanitizers."
      },
      {
        id: "thermal-lock-transit",
        heading: "Thermal Lock Packaging: Fresh from Stove to School",
        content: "Once prepared, meals are packed within 18 minutes into vacuum-insulated SS304 stainless steel tiffins. The lids are hermetically sealed, maintaining food above 65°C for 5 hours without microwave reheating, preserving delicate vitamins and authentic texture."
      },
      {
        id: "rfid-delivery-roster",
        heading: "RFID Tracking & Classroom Delivery Roster",
        content: "Each student's container is tagged with an encrypted RFID chip linked to their dietary profile, allergen notes, and school classroom number. This guarantees 100% accurate, zero-error distribution on school campuses."
      }
    ],
    quote: {
      text: "Parents trust us with their children's daily nourishment. Our zero-compromise safety protocols are our sacred pledge to every family.",
      author: "Quality Assurance Directorate, SchoolBite"
    },
    relatedSlugs: ["morning-rush", "brain-food", "sugar-crash"]
  }
};

// Map legacy IDs ('blog-1', 'blog-2', etc.) to slugs for compatibility
window.SCHOOLBITE_BLOG_MAP = {
  "blog-1": "brain-food",
  "blog-2": "picky-eating",
  "blog-3": "morning-rush",
  "blog-4": "cauliflower-alfredo",
  "blog-5": "sugar-crash",
  "blog-6": "safe-food-standards"
};