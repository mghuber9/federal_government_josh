(function(){
  // Escape HTML helper
  function esc(s){ return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }

  const items = [
    // Politics Defined (5)
    {q:"Define politics in one sentence.", a:"The process of resolving conflicts over values and resources."},
    {q:"State Harold Lasswell’s famous definition of politics.", a:"Who gets what, when, and how."},
    {q:"Describe what politics often includes regarding government decision‑making.", a:"The struggle for influence over government decision‑making."},
    {q:"Name the two modes politics usually involves.", a:"Compromise and competition."},
    {q:"Explain why politics is necessary.", a:"People have differing priorities and beliefs."},

    // Declaration of Independence (5)
    {q:"Name the primary author of the Declaration of Independence.", a:"Thomas Jefferson."},
    {q:"Say what the Declaration of Independence declared.", a:"Independence from Great Britain and a justification for revolution."},
    {q:"Identify the philosopher who most influenced the Declaration.", a:"John Locke."},
    {q:"List the three core values emphasized in the Declaration.", a:"Liberty, equality, and self‑government."},
    {q:"Describe the role the Declaration served for American government.", a:"A moral and political blueprint for American government."},

    // Shays' Rebellion (5)
    {q:"Name the leader of Shays’ Rebellion.", a:"Daniel Shays."},
    {q:"State what triggered Shays’ Rebellion.", a:"Debt, foreclosures, and high taxes after the Revolution."},
    {q:"Explain what weakness the rebellion revealed.", a:"Weaknesses of the Articles of Confederation in maintaining order."},
    {q:"Say why the rebellion alarmed national leaders.", a:"It showed the need for a stronger national government."},
    {q:"Give one long‑term result of Shays’ Rebellion.", a:"Momentum toward the Constitutional Convention."},

    // Articles of Confederation (5)
    {q:"What were the Articles of Confederation?", a:"America’s first governing document."},
    {q:"What kind of national government did the Articles create?", a:"A weak national government with most power in the states."},
    {q:"Name three powers Congress lacked under the Articles.", a:"Taxation, regulation of trade, and enforcement of laws."},
    {q:"What approval level was required for amendments under the Articles?", a:"Unanimous consent."},
    {q:"What did the failures of the Articles highlight?", a:"The need for a new Constitution."},

    // Constitutional Convention (5)
    {q:"Where and when did the Constitutional Convention meet?", a:"Philadelphia in 1787."},
    {q:"What was the original purpose of the Convention?", a:"To revise the Articles of Confederation."},
    {q:"Name two major issues addressed at the Convention.", a:"Representation, slavery, executive power, and federal vs. state authority."},
    {q:"What compromise resolved the dispute over representation?", a:"The Great Compromise."},
    {q:"Name two structural features included in the Constitution.", a:"Separation of powers and checks and balances."},

    // Virginia Plan (5)
    {q:"Who proposed the Virginia Plan?", a:"James Madison."},
    {q:"What kind of legislature did the Virginia Plan support?", a:"A bicameral legislature based on population."},
    {q:"Which level of authority did the Virginia Plan favor?", a:"Strong national authority."},
    {q:"What key design principle did the Virginia Plan introduce?", a:"Separation of powers into three branches."},
    {q:"What did the Virginia Plan become for the final Constitution?", a:"A basis for the final Constitution."},

    // New Jersey Plan (5)
    {q:"Who proposed the New Jersey Plan?", a:"William Paterson."},
    {q:"What type of representation did the New Jersey Plan favor?", a:"Equal representation for each state in Congress."},
    {q:"What kind of legislature did the New Jersey Plan propose?", a:"A unicameral legislature."},
    {q:"Did the New Jersey Plan replace or strengthen the Articles?", a:"Strengthen, not replace, the Articles."},
    {q:"How did the New Jersey Plan influence the final Constitution?", a:"It was rejected, but influenced the Great Compromise."},

    // Concurrent Powers (5)
    {q:"Define concurrent powers.", a:"Powers shared by both state and federal governments."},
    {q:"Give two examples of concurrent powers.", a:"Taxation, law enforcement, and establishing courts."},
    {q:"Explain what concurrent powers allow for.", a:"Cooperation between levels of government."},
    {q:"How are conflicts over concurrent powers resolved?", a:"By the courts."},
    {q:"What principle do concurrent powers reflect?", a:"The federal principle of shared sovereignty."},

    // Reserved Powers (5)
    {q:"Define reserved powers.", a:"Powers not granted to the federal government, reserved to the states."},
    {q:"Give two examples of reserved powers.", a:"Education, local elections, and intrastate commerce."},
    {q:"What do reserved powers ensure?", a:"State sovereignty within the federal system."},
    {q:"What do reserved powers provide for the states?", a:"Flexibility for state‑level policies."},
    {q:"What balance do reserved powers help maintain?", a:"Power between national and state governments."}
  ];

  function render() {
    const container = document.getElementById('quizContainer');
    container.innerHTML = '';
    items.forEach((it, idx) => {
      const q = document.createElement('div');
      q.className = 'question';
      const id = 'q' + idx;
      q.innerHTML = '<label for="'+id+'">'+esc((idx+1)+'. '+it.q)+'</label>' +
                    '<textarea id="'+id+'" rows="2" placeholder="Type your answer..."></textarea>';
      container.appendChild(q);
    });
  }

  function onSubmit(){
    const container = document.getElementById('quizContainer');
    const results = document.createElement('div');
    results.innerHTML = '<h3>Results</h3><p class="muted">Compare your answer with the correct answer below. Self‑grade as needed.</p>';
    items.forEach((it, idx) => {
      const val = (document.getElementById('q'+idx).value || '').trim();
      const r = document.createElement('div');
      r.className = 'result';
      r.innerHTML = '<div><strong>'+esc((idx+1)+'. '+it.q)+'</strong></div>' +
                    '<div class="user">Your answer: ' + (val ? esc(val) : '<em>(blank)</em>') + '</div>' +
                    '<div class="correct">Correct answer: ' + esc(it.a) + '</div>';
      results.appendChild(r);
    });
    container.innerHTML = '';
    container.appendChild(results);

    document.getElementById('submitBtn').style.display = 'none';
    const pb = document.getElementById('printBtn');
    pb.style.display = 'inline-block';
    pb.onclick = () => window.print();
  }

  document.addEventListener('DOMContentLoaded', function(){
    render();
    document.getElementById('submitBtn').addEventListener('click', onSubmit);
  });
})();