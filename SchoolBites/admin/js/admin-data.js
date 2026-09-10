// SchoolBite Admin Data Management Layer
// Reads from and syncs with parent localStorage keys, plus manages admin-specific state.

const AdminStore = {
  KEYS: {
    ADMIN_DATA: 'schoolbite_admin_data',
    SESSION: 'schoolbite_session',
    USERS: 'schoolbite_users',
    PARENT_PREFIX: 'schoolbite_dashboard_data_'
  },

  // Default seeds if empty
  getDefaultData() {
    return {
      adminUser: {
        name: 'Admin',
        email: 'admin@schoolbite.com',
        role: 'Administrator',
        avatar: 'A'
      },
      stats: {
        totalChildren: 248,
        childrenGrowth: '+12%',
        totalParents: 187,
        parentsGrowth: '+8%',
        activeSubscriptions: 162,
        subscriptionsGrowth: '+10%',
        mealsServedToday: 735,
        mealsGrowth: '+15%'
      },
      weeklyMeals: [
        { day: 'Mon', count: 620 },
        { day: 'Tue', count: 850 },
        { day: 'Wed', count: 660 },
        { day: 'Thu', count: 510 },
        { day: 'Fri', count: 700 }
      ],
      planDistribution: {
        weekly: 38,
        monthly: 42,
        term: 20,
        totalActive: 162
      },
      recentActivities: [
        { id: 1, type: 'subscription', icon: 'document', title: 'New subscription', desc: 'Priya S. subscribed to Monthly Plan', time: '10:24 AM' },
        { id: 2, type: 'delivery', icon: 'truck', title: 'Order delivered', desc: "St. Mary's International School", time: '9:15 AM' },
        { id: 3, type: 'child', icon: 'user', title: 'New child added', desc: 'Aravind K. added by parent', time: '8:40 AM' },
        { id: 4, type: 'menu', icon: 'calendar', title: 'Menu updated', desc: "Next week's menu published", time: '7:30 AM' },
        { id: 5, type: 'payment', icon: 'rupee', title: 'Payment received', desc: '₹2,999 via UPI', time: 'Yesterday' }
      ],
      deliveries: [
        { id: 1, childName: 'Aarav Sharma', school: 'Oakridge Intl. School', grade: 'Grade 4-B', meal: 'Veg Meal', status: 'Preparing', eta: '11:00 AM', driver: 'Ramesh Kumar', vehicle: 'KA-01-EA-4921' },
        { id: 2, childName: 'Diya R.', school: 'Greenfield School', grade: 'Grade 2-A', meal: 'Special Diet', status: 'Out for Delivery', eta: '11:15 AM', driver: 'Suresh V.', vehicle: 'KA-01-MJ-8822' },
        { id: 3, childName: 'Kavin M.', school: 'Sunrise Public School', grade: 'Grade 5-C', meal: 'Regular Meal', status: 'Packed', eta: '11:30 AM', driver: 'Manohar P.', vehicle: 'KA-05-XY-1090' },
        { id: 4, childName: 'Ananya S.', school: 'Maple Kids School', grade: 'Grade 1-B', meal: 'No Onion/Garlic', status: 'Preparing', eta: '11:45 AM', driver: 'Ramesh Kumar', vehicle: 'KA-01-EA-4921' },
        { id: 5, childName: 'Rohan Gupta', school: 'DPS North', grade: 'Grade 3-A', meal: 'High Protein', status: 'Delivered', eta: '10:30 AM', driver: 'Vikram Singh', vehicle: 'KA-03-PL-5511' },
        { id: 6, childName: 'Sara Khan', school: 'Oakridge Intl. School', grade: 'Grade 6-A', meal: 'Nut Free Diet', status: 'Out for Delivery', eta: '11:20 AM', driver: 'Suresh V.', vehicle: 'KA-01-MJ-8822' }
      ],
      todayMenu: [
        { id: 1, name: 'Veg Biryani', desc: 'with raita and fruits', category: 'Lunch', calories: '420 kcal', veg: true, image: '../parent/assets/images/meal-1.jpg' },
        { id: 2, name: 'Chapati & Paneer Curry', desc: 'with cucumber salad', category: 'Lunch', calories: '380 kcal', veg: true, image: '../parent/assets/images/meal-2.jpg' },
        { id: 3, name: 'Lemon Rice', desc: 'with boiled egg and veggies', category: 'Lunch', calories: '350 kcal', veg: false, image: '../parent/assets/images/meal-3.jpg' },
        { id: 4, name: 'Fruit Bowl', desc: 'Seasonal fresh fruits & seeds', category: 'Snack', calories: '180 kcal', veg: true, image: '../parent/assets/images/meal-4.jpg' }
      ],
      children: [
        { id: 'STU-001', name: 'Aarav Sharma', parent: 'Priya Sharma', parentEmail: 'priya.s@gmail.com', school: 'Oakridge Intl. School', grade: 'Grade 4-B', diet: 'Vegetarian', allergies: 'None', plan: 'Monthly Plan', status: 'Active' },
        { id: 'STU-002', name: 'Diya R.', parent: 'Rajesh Raman', parentEmail: 'rajesh.r@gmail.com', school: 'Greenfield School', grade: 'Grade 2-A', diet: 'Gluten Free', allergies: 'Peanuts', plan: 'Weekly Plan', status: 'Active' },
        { id: 'STU-003', name: 'Kavin M.', parent: 'Meera Kavin', parentEmail: 'meera.k@gmail.com', school: 'Sunrise Public School', grade: 'Grade 5-C', diet: 'Regular', allergies: 'Eggs', plan: 'Term Plan', status: 'Active' },
        { id: 'STU-004', name: 'Ananya S.', parent: 'Sanjay Kumar', parentEmail: 'sanjay.k@outlook.com', school: 'Maple Kids School', grade: 'Grade 1-B', diet: 'Jain Meal', allergies: 'None', plan: 'Monthly Plan', status: 'Active' },
        { id: 'STU-005', name: 'Rohan Gupta', parent: 'Anita Gupta', parentEmail: 'anita.g@yahoo.com', school: 'DPS North', grade: 'Grade 3-A', diet: 'High Protein', allergies: 'Dairy', plan: 'Term Plan', status: 'Active' },
        { id: 'STU-006', name: 'Sara Khan', parent: 'Farhan Khan', parentEmail: 'farhan.k@gmail.com', school: 'Oakridge Intl. School', grade: 'Grade 6-A', diet: 'Nut Free', allergies: 'Tree Nuts', plan: 'Monthly Plan', status: 'Active' },
        { id: 'STU-007', name: 'Tanvi Verma', parent: 'Sunil Verma', parentEmail: 'sunil.v@gmail.com', school: 'National Public School', grade: 'Grade 4-A', diet: 'Vegetarian', allergies: 'None', plan: 'Weekly Plan', status: 'Inactive' },
        { id: 'STU-008', name: 'Aditya Nair', parent: 'Deepa Nair', parentEmail: 'deepa.n@gmail.com', school: 'Greenfield School', grade: 'Grade 3-C', diet: 'Regular', allergies: 'None', plan: 'Monthly Plan', status: 'Active' }
      ],
      parents: [
        { id: 'PAR-101', name: 'Priya Sharma', email: 'priya.s@gmail.com', phone: '+91 98765 43210', childrenCount: 1, activePlans: 1, totalSpent: '₹8,997', joinedDate: '12 Jan 2026', status: 'Active' },
        { id: 'PAR-102', name: 'Rajesh Raman', email: 'rajesh.r@gmail.com', phone: '+91 98111 22334', childrenCount: 2, activePlans: 1, totalSpent: '₹5,593', joinedDate: '04 Feb 2026', status: 'Active' },
        { id: 'PAR-103', name: 'Meera Kavin', email: 'meera.k@gmail.com', phone: '+91 99000 88776', childrenCount: 1, activePlans: 1, totalSpent: '₹15,998', joinedDate: '18 Nov 2025', status: 'Active' },
        { id: 'PAR-104', name: 'Sanjay Kumar', email: 'sanjay.k@outlook.com', phone: '+91 97400 12345', childrenCount: 1, activePlans: 1, totalSpent: '₹2,999', joinedDate: '01 Mar 2026', status: 'Active' },
        { id: 'PAR-105', name: 'Anita Gupta', email: 'anita.g@yahoo.com', phone: '+91 98222 33445', childrenCount: 1, activePlans: 1, totalSpent: '₹7,999', joinedDate: '15 Feb 2026', status: 'Active' },
        { id: 'PAR-106', name: 'Farhan Khan', email: 'farhan.k@gmail.com', phone: '+91 99887 76655', childrenCount: 2, activePlans: 2, totalSpent: '₹11,996', joinedDate: '22 Dec 2025', status: 'Active' },
        { id: 'PAR-107', name: 'Sunil Verma', email: 'sunil.v@gmail.com', phone: '+91 98333 44556', childrenCount: 1, activePlans: 0, totalSpent: '₹2,397', joinedDate: '10 Jan 2026', status: 'Inactive' },
        { id: 'PAR-108', name: 'Deepa Nair', email: 'deepa.n@gmail.com', phone: '+91 97111 55667', childrenCount: 1, activePlans: 1, totalSpent: '₹5,998', joinedDate: '28 Jan 2026', status: 'Active' }
      ],
      subscriptions: [
        { id: 'SUB-901', childName: 'Aarav Sharma', parentName: 'Priya Sharma', school: 'Oakridge Intl. School', plan: 'Monthly Plan', price: '₹2,999', startDate: '01 Sep 2026', endDate: '30 Sep 2026', autoRenew: true, status: 'Active' },
        { id: 'SUB-902', childName: 'Diya R.', parentName: 'Rajesh Raman', school: 'Greenfield School', plan: 'Weekly Plan', price: '₹799', startDate: '08 Sep 2026', endDate: '14 Sep 2026', autoRenew: false, status: 'Active' },
        { id: 'SUB-903', childName: 'Kavin M.', parentName: 'Meera Kavin', school: 'Sunrise Public School', plan: 'Term Plan', price: '₹7,999', startDate: '01 Aug 2026', endDate: '30 Nov 2026', autoRenew: true, status: 'Active' },
        { id: 'SUB-904', childName: 'Ananya S.', parentName: 'Sanjay Kumar', school: 'Maple Kids School', plan: 'Monthly Plan', price: '₹2,999', startDate: '01 Sep 2026', endDate: '30 Sep 2026', autoRenew: true, status: 'Active' },
        { id: 'SUB-905', childName: 'Rohan Gupta', parentName: 'Anita Gupta', school: 'DPS North', plan: 'Term Plan', price: '₹7,999', startDate: '01 Jul 2026', endDate: '31 Oct 2026', autoRenew: false, status: 'Active' },
        { id: 'SUB-906', childName: 'Sara Khan', parentName: 'Farhan Khan', school: 'Oakridge Intl. School', plan: 'Monthly Plan', price: '₹2,999', startDate: '01 Sep 2026', endDate: '30 Sep 2026', autoRenew: true, status: 'Active' },
        { id: 'SUB-907', childName: 'Tanvi Verma', parentName: 'Sunil Verma', school: 'National Public School', plan: 'Weekly Plan', price: '₹799', startDate: '15 Aug 2026', endDate: '21 Aug 2026', autoRenew: false, status: 'Expired' }
      ],
      allMeals: [
        { id: 'MEL-1', name: 'Veg Biryani & Raita', category: 'Rice Dishes', calories: 420, protein: '12g', carbs: '65g', fats: '10g', dietary: 'Vegetarian', prepTime: '25 min', rating: '4.9', status: 'Active', image: '../parent/assets/images/meal-1.jpg' },
        { id: 'MEL-2', name: 'Chapati & Paneer Curry', category: 'Indian Breads', calories: 380, protein: '16g', carbs: '45g', fats: '14g', dietary: 'Vegetarian', prepTime: '20 min', rating: '4.8', status: 'Active', image: '../parent/assets/images/meal-2.jpg' },
        { id: 'MEL-3', name: 'Lemon Rice & Boiled Egg', category: 'Rice Dishes', calories: 350, protein: '14g', carbs: '52g', fats: '8g', dietary: 'Non-Veg', prepTime: '15 min', rating: '4.7', status: 'Active', image: '../parent/assets/images/meal-3.jpg' },
        { id: 'MEL-4', name: 'Rainbow Fruit & Nut Bowl', category: 'Snacks & Salads', calories: 180, protein: '4g', carbs: '32g', fats: '3g', dietary: 'Vegan', prepTime: '10 min', rating: '4.9', status: 'Active', image: '../parent/assets/images/meal-4.jpg' },
        { id: 'MEL-5', name: 'Idli, Sambar & Chutney', category: 'Breakfast', calories: 290, protein: '9g', carbs: '58g', fats: '2g', dietary: 'Vegetarian', prepTime: '15 min', rating: '4.9', status: 'Active', image: '../parent/assets/images/meal-5.jpg' },
        { id: 'MEL-6', name: 'Whole Wheat Veggie Pasta', category: 'Continental', calories: 410, protein: '11g', carbs: '68g', fats: '9g', dietary: 'Vegetarian', prepTime: '30 min', rating: '4.6', status: 'Active', image: '../parent/assets/images/meal-1.jpg' }
      ],
      orders: [
        { id: 'ORD-8492', date: '09 Sep 2026, 10:24 AM', parent: 'Priya Sharma', child: 'Aarav Sharma', plan: 'Monthly Subscription', amount: '₹2,999', method: 'UPI (Google Pay)', status: 'Success' },
        { id: 'ORD-8491', date: '08 Sep 2026, 04:12 PM', parent: 'Rajesh Raman', child: 'Diya R.', plan: 'Weekly Subscription', amount: '₹799', method: 'Credit Card', status: 'Success' },
        { id: 'ORD-8490', date: '08 Sep 2026, 11:30 AM', parent: 'Sanjay Kumar', child: 'Ananya S.', plan: 'Monthly Subscription', amount: '₹2,999', method: 'Net Banking', status: 'Success' },
        { id: 'ORD-8489', date: '07 Sep 2026, 09:15 AM', parent: 'Anita Gupta', child: 'Rohan Gupta', plan: 'Term Subscription', amount: '₹7,999', method: 'Debit Card', status: 'Success' },
        { id: 'ORD-8488', date: '06 Sep 2026, 08:55 PM', parent: 'Karthik Raja', child: 'Tara K.', plan: 'Weekly Subscription', amount: '₹799', method: 'UPI (PhonePe)', status: 'Refunded' },
        { id: 'ORD-8487', date: '05 Sep 2026, 02:40 PM', parent: 'Meera Kavin', child: 'Kavin M.', plan: 'Term Subscription', amount: '₹7,999', method: 'UPI (Paytm)', status: 'Success' }
      ],
      weeklySchedule: {
        Mon: { main: 'Veg Biryani & Raita', alt: 'Pulao & Mixed Veg Curry', snack: 'Seasonal Fruit Bowl', special: 'Gluten-Free Khichdi' },
        Tue: { main: 'Chapati & Paneer Butter Masala', alt: 'Jeera Rice & Dal Tadka', snack: 'Sprouted Moong Salad', special: 'Jain Paneer Curry' },
        Wed: { main: 'Lemon Rice & Crispy Veggies', alt: 'Curd Rice & Roasted Potatoes', snack: 'Carrot & Cucumber Sticks with Dip', special: 'Egg Salad Box' },
        Thu: { main: 'Whole Wheat Pasta with Veggies', alt: 'Methi Paratha & Curd', snack: 'Roasted Makhana & Dry Fruits', special: 'Nut-Free Pasta' },
        Fri: { main: 'South Indian Meal (Sambar Rice)', alt: 'Veg Hakka Noodles', snack: 'Mini Banana Muffins', special: 'Low Calorie Salad' }
      ],
      notifications: [
        { id: 1, title: 'Term Plan Registrations Surging', message: 'Over 40 new term plan subscriptions registered for Term 2.', time: '10 mins ago', date: 'Today', unread: true, type: 'subscription' },
        { id: 2, title: 'Delivery Route #3 Completed', message: 'All 48 school lunchboxes delivered to Oakridge International.', time: '45 mins ago', date: 'Today', unread: true, type: 'delivery' },
        { id: 3, title: 'Parent Feedback Received', message: 'Anita Gupta rated the new Fruit Bowl 5 stars.', time: '2 hours ago', date: 'Today', unread: false, type: 'feedback' },
        { id: 4, title: 'Kitchen Inventory Alert', message: 'Fresh Paneer and Organic Veggies restocked for tomorrow.', time: '5 hours ago', date: 'Today', unread: false, type: 'kitchen' },
        { id: 5, title: 'Weekly Menu Published', message: 'Menu for Sep 14 - Sep 18 published to parent portal.', time: 'Yesterday, 5:30 PM', date: 'Yesterday', unread: false, type: 'menu' },
        { id: 6, title: 'System Backup Complete', message: 'All student and subscription data backed up successfully.', time: '2 days ago', date: '07 Sep 2026', unread: false, type: 'system' }
      ],
      settings: {
        schoolName: 'SchoolBite Central Kitchen & Network',
        kitchenHours: '05:30 AM - 04:00 PM',
        deliveryCutoff: '07:30 AM Daily',
        supportEmail: 'care@schoolbite.com',
        supportPhone: '+91 80 4567 8900',
        autoAssignDeliveries: true,
        smsAlerts: true,
        emailReports: true
      }
    };
  },

  // Initialize and load
  init() {
    let data = this.loadData();
    if (!data) {
      data = this.getDefaultData();
      this.saveData(data);
    }
    this.syncParentData(data);
    return data;
  },

  loadData() {
    try {
      const raw = localStorage.getItem(this.KEYS.ADMIN_DATA);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.error('Error loading admin data:', e);
      return null;
    }
  },

  saveData(data) {
    try {
      localStorage.setItem(this.KEYS.ADMIN_DATA, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving admin data:', e);
    }
  },

  // Cross-dashboard sync: Reads children and subscriptions from parent localStorage
  syncParentData(adminData) {
    try {
      // Find all parent keys in localStorage
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.KEYS.PARENT_PREFIX)) {
          const raw = localStorage.getItem(key);
          if (raw) {
            const parentStore = JSON.parse(raw);
            if (parentStore.children && Array.isArray(parentStore.children)) {
              parentStore.children.forEach(c => {
                if (!adminData.children.some(ac => ac.name === c.name)) {
                  adminData.children.unshift({
                    id: 'STU-' + Math.floor(100 + Math.random() * 900),
                    name: c.name || 'Child',
                    parent: 'Parent (' + (key.replace(this.KEYS.PARENT_PREFIX, '') || 'User') + ')',
                    parentEmail: key.replace(this.KEYS.PARENT_PREFIX, ''),
                    school: c.school || 'Oakridge Intl. School',
                    grade: c.grade || 'Grade 3',
                    diet: c.diet || 'Regular',
                    allergies: c.allergies || 'None',
                    plan: c.plan || 'Monthly Plan',
                    status: 'Active'
                  });
                }
              });
            }
          }
        }
      }
      this.saveData(adminData);
    } catch (e) {
      console.warn('Could not sync parent data:', e);
    }
  },

  // Helpers
  getChildren() {
    const data = this.loadData() || this.init();
    return data.children || [];
  },

  addChild(child) {
    const data = this.loadData() || this.init();
    child.id = 'STU-' + Math.floor(100 + Math.random() * 900);
    data.children.unshift(child);
    data.stats.totalChildren = (data.stats.totalChildren || 248) + 1;
    this.saveData(data);
    return child;
  },

  updateDeliveryStatus(id, newStatus) {
    const data = this.loadData() || this.init();
    const item = data.deliveries.find(d => d.id === id);
    if (item) {
      item.status = newStatus;
      this.saveData(data);
    }
    return item;
  },

  addMeal(meal) {
    const data = this.loadData() || this.init();
    meal.id = 'MEL-' + (data.allMeals.length + 1);
    meal.rating = '5.0';
    data.allMeals.unshift(meal);
    this.saveData(data);
    return meal;
  },

  deleteMeal(id) {
    const data = this.loadData() || this.init();
    data.allMeals = data.allMeals.filter(m => m.id !== id);
    this.saveData(data);
  },

  sendNotification(notif) {
    const data = this.loadData() || this.init();
    notif.id = Date.now();
    notif.time = 'Just now';
    notif.date = 'Today';
    notif.unread = true;
    data.notifications.unshift(notif);
    this.saveData(data);
    return notif;
  }
};

window.AdminStore = AdminStore;
