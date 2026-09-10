const SBStore = (() => {
  const user = () => {
    try {
      const session = JSON.parse(localStorage.getItem('schoolbite_session') || 'null');
      const users = JSON.parse(localStorage.getItem('schoolbite_users') || '[]');
      if (session && session.loggedIn && Array.isArray(users)) {
        return users.find(item => item.email.toLowerCase() === session.email.toLowerCase()) || session;
      }
      const localU = JSON.parse(localStorage.getItem('schoolbite_user') || 'null');
      if (localU && localU.email) return localU;
      return { name: 'Preteka', email: 'preteka@example.com', loggedIn: true };
    } catch { return { name: 'Preteka', email: 'preteka@example.com', loggedIn: true }; }
  };
  const key = () => 'schoolbite_dashboard_data_' + encodeURIComponent((user().email || 'guest').toLowerCase());
  const read = (fallback) => { try { return JSON.parse(localStorage.getItem(key())) || fallback; } catch { return fallback; } };
  const save = data => localStorage.setItem(key(), JSON.stringify(data));
  const defaults = () => ({ children: [], subscriptions: [], payments: [], notifications: [], preferences: { theme: 'light', email: true, sms: true }, selectedMeals: [] });
  function get() {
    const data = { ...defaults(), ...read({}) };
    const setup = (() => { try { return JSON.parse(localStorage.getItem('schoolbite_subscription_setup') || 'null'); } catch { return null; } })();
    if (setup && setup.childrenList && data.children.length === 0) {
      data.children = setup.childrenList.map((child, index) => ({
        id: child.id || 'child-' + index + '-' + Date.now(),
        name: child.name || child.label || 'Child ' + (index + 1),
        school: setup.school || '',
        className: child.className || child.class || '',
        diet: setup.dietType === 'non-veg' ? 'Non-vegetarian' : 'Vegetarian',
        allergies: (setup.allergens || []).join(', ')
      }));
      save(data);
    }
    const legacyPlan = localStorage.getItem('schoolbite_order_plan');
    const legacyTotal = Number(localStorage.getItem('schoolbite_order_total'));
    if (localStorage.getItem('schoolbite_payment_done') === '1' && legacyPlan && !data.subscriptions.length) {
      const now = new Date().toISOString();
      const pendingChildId = localStorage.getItem('schoolbite_pending_child_id');
      const child = data.children.find(item => item.id === pendingChildId) || data.children[0] || null;
      data.subscriptions = [{ id: 'sub-' + Date.now(), plan: legacyPlan, childId: child && child.id, price: legacyTotal || 0, cycle: localStorage.getItem('schoolbite_order_cycle') || 'month', startDate: now, status: 'Active' }];
      data.payments = [{ id: 'SB-' + new Date().getFullYear() + '-' + Math.floor(100000 + Math.random() * 899999), date: now, childId: child && child.id, plan: legacyPlan, amount: legacyTotal || 0, status: 'Paid', method: 'UPI' }];
      data.notifications.unshift({ id: 'n-' + Date.now(), type: 'payment', title: 'Payment successful', text: 'Your ' + legacyPlan + ' is ready.', date: now, read: false });
      save(data);
      localStorage.removeItem('schoolbite_payment_done');
    }
    return data;
  }
  function update(mutator) { const data = get(); mutator(data); save(data); return data; }
  function name() { return user().name || (user().email || 'Parent').split('@')[0]; }
  function loggedIn() { const current = user(); return !!(current && current.email); }
  function logout() { localStorage.removeItem('schoolbite_session'); localStorage.removeItem('schoolbite_user'); window.location.href = window.location.pathname.includes('/plans/') ? '../../index.html' : '../index.html'; }
  return { get, update, save, name, user, loggedIn, logout };
})();
