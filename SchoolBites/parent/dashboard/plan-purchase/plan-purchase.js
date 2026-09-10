function selectedPurchasePlan() {
  const queryPlan = new URLSearchParams(window.location.search).get('plan');
  let storedPlan = null;
  try { storedPlan = JSON.parse(localStorage.getItem('schoolbite_dashboard_selected_plan') || 'null'); } catch { storedPlan = null; }
  return subscriptionPagePlans.find(plan => plan.id === queryPlan) || subscriptionPagePlans.find(plan => plan.id === storedPlan?.id) || subscriptionPagePlans[0];
}

function purchaseDate(value) {
  return new Date(value).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function purchaseNextBilling(value) {
  const next = new Date(value);
  next.setMonth(next.getMonth() + 1);
  return purchaseDate(next);
}

function planPurchasePage() {
  const plan = selectedPurchasePlan();
  const data = SBStore.get();
  const children = data.children || [];
  const startDate = new Date();
  const selectedChild = localStorage.getItem('schoolbite_pending_child_id') || children[0]?.id || '';
  const featureMarkup = plan.features.map(feature => `<li class="${feature.included ? '' : 'is-disabled'}"><span>${feature.included ? '✓' : '×'}</span>${esc(feature.text)}</li>`).join('');
  const childMarkup = children.length ? children.map(child => `<option value="${esc(child.id)}" ${child.id === selectedChild ? 'selected' : ''}>${esc(child.name)}${child.className || child.school ? ` · ${esc(child.className || 'Class not set')} · ${esc(child.school || 'School not set')}` : ''}</option>`).join('') : '<option value="">No children added yet</option>';

  document.getElementById('page-content').innerHTML = `<div class="purchase-back-row"><a href="../plans/plans.html">← Back to Plans</a><div class="purchase-steps"><span class="is-active"><b>1</b> Plan Details</span><i></i><span><b>2</b> Payment</span><i></i><span><b>3</b> Confirmation</span></div></div><section class="purchase-heading"><h2>Complete Your Subscription</h2><p>You're one step closer to nutritious, happy school days.</p></section><div class="purchase-layout"><main class="purchase-main"><section class="selected-plan-card"><div class="selected-plan-copy"><span class="selected-plan-label">Selected Plan</span><h1>${esc(plan.name)}</h1><strong>${money(plan.price)} <small>${esc(plan.period)}</small></strong><p>${esc(plan.description)}</p></div><img src="../assets/images/meal_monday_idli.jpg" alt="Fresh SchoolBite meal" class="selected-plan-image"><span class="purchase-script">Healthy Kids<br>Happier Days</span></section><section class="purchase-panel plan-includes"><h3>Plan Includes</h3><ul>${featureMarkup}</ul></section><section class="tomorrow-card"><div class="tomorrow-icon">${icons.card}</div><div><h3>A Healthier Tomorrow for Your Child</h3><p>Fresh ingredients, expert nutrition and meals kids love.</p></div></section><section class="purchase-benefits">${[['Fresh Ingredients', 'High-quality, nutritious meals every day.', icons.settings], ['Loved by Kids', 'Delicious meals kids enjoy.', icons.user], ['Safe & Hygienic', 'Prepared with the highest standards.', icons.card], ['Expert Nutrition', 'Designed by nutritionists.', icons.grid]].map(item => `<article><div>${item[2]}</div><h3>${item[0]}</h3><p>${item[1]}</p></article>`).join('')}</section></main><aside class="purchase-side"><section class="purchase-panel order-summary"><h3>${icons.card} Order Summary</h3><dl><div><dt>Plan</dt><dd>${esc(plan.name)}</dd></div><div><dt>Price</dt><dd>${money(plan.price)}</dd></div><div><dt>Billing Period</dt><dd>Monthly</dd></div><div><dt>Start Date</dt><dd>${purchaseDate(startDate)}</dd></div><div><dt>Next Billing Date</dt><dd>${purchaseNextBilling(startDate)}</dd></div></dl><div class="summary-total"><span>Total Amount</span><strong>${money(plan.price)}</strong></div></section><section class="purchase-panel select-child"><h3>${icons.user} Select Child</h3><select id="purchase-child" aria-label="Select child">${childMarkup}</select></section><section class="purchase-panel payment-method"><h3>${icons.card} Payment Method</h3><label class="payment-option is-selected"><input type="radio" name="payment-method" value="card" checked><span class="payment-radio"></span><span><strong>Credit / Debit Card</strong><small>Visa, Mastercard, RuPay</small></span></label><label class="payment-option"><input type="radio" name="payment-method" value="upi"><span class="payment-radio"></span><span><strong>UPI</strong><small>Pay with any UPI app</small></span></label><label class="payment-option"><input type="radio" name="payment-method" value="netbanking"><span class="payment-radio"></span><span><strong>Net Banking</strong><small>All major banks supported</small></span></label><button class="btn purchase-submit" type="button" id="purchase-submit">🔒 Proceed to Payment <b>→</b></button><p class="secure-note">✓ Your payment information is secure and encrypted.</p></section></aside></div>`;

  document.querySelectorAll('.payment-option input').forEach(input => input.addEventListener('change', event => {
    document.querySelectorAll('.payment-option').forEach(option => option.classList.toggle('is-selected', option.querySelector('input').checked));
  }));
  document.getElementById('purchase-submit').addEventListener('click', () => {
    localStorage.setItem('schoolbite_pending_child_id', document.getElementById('purchase-child').value);
    localStorage.setItem('schoolbite_pending_payment_method', document.querySelector('input[name="payment-method"]:checked').value);
    localStorage.setItem('schoolbite_dashboard_selected_plan', JSON.stringify(plan));
    localStorage.setItem('schoolbite_pending_plan', plan.id);
    window.location.href = `../../payment.html?plan=${encodeURIComponent(plan.id)}`;
  });
}
