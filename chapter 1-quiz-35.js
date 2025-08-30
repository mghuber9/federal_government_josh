// Data: 35 term-definition pairs
const QUESTIONS = [{"term": "Politics", "definition": "The process by which society settles conflicts and decides who gets what, when, and how."}, {"term": "Social Contract Theory", "definition": "Idea that government originates from an agreement: Hobbes argued for strong central authority to avoid chaos; Locke emphasized natural rights and consent of the governed."}, {"term": "Natural Rights", "definition": "Fundamental rights inherent to all people (life, liberty, property); championed by John Locke."}, {"term": "Federalists", "definition": "Supporters of the Constitution and strong national government; included Madison, Hamilton, and Jay (authors of the Federalist Papers)."}, {"term": "Anti-Federalists", "definition": "Opposed ratification, favored states’ rights, and demanded Bill of Rights; Patrick Henry was a leading figure."}, {"term": "Declaration of Independence (1776)", "definition": "Asserted independence from Britain; emphasized liberty, equality, and self-government."}, {"term": "Articles of Confederation (1781–1789)", "definition": "First U.S. governing framework with weak national powers."}, {"term": "Shays’ Rebellion (1786–87)", "definition": "Uprising that revealed weaknesses of the Articles of Confederation."}, {"term": "Constitutional Convention (1787)", "definition": "Philadelphia meeting that created the U.S. Constitution."}, {"term": "Great Compromise", "definition": "Created bicameral legislature: House (population) and Senate (equal representation)."}, {"term": "Three-Fifths Compromise", "definition": "Counted enslaved persons as 3/5 for representation and taxation."}, {"term": "Unitary System", "definition": "Power centralized in the national government."}, {"term": "Confederation", "definition": "Loose alliance of sovereign states with weak central authority."}, {"term": "Federal System", "definition": "Power shared between national and state governments."}, {"term": "Democracy", "definition": "Rule by the people; includes Direct Democracy (citizens vote directly) and Representative Democracy/Republic (citizens elect officials)."}, {"term": "Dictatorship", "definition": "Government controlled by one ruler or small group with absolute power."}, {"term": "Anarchism", "definition": "Belief in abolishing government entirely."}, {"term": "Separation of Powers", "definition": "Division of government into legislative, executive, and judicial branches."}, {"term": "Checks and Balances", "definition": "System where each branch limits the power of the others."}, {"term": "Judicial Review", "definition": "Courts’ power to strike down unconstitutional laws."}, {"term": "Supreme Court", "definition": "The only court established directly by the Constitution."}, {"term": "Amendment Process (Article V)", "definition": "Procedure for changing the Constitution."}, {"term": "Expressed (Enumerated) Powers", "definition": "Powers specifically listed in the Constitution for the national government."}, {"term": "Implied Powers", "definition": "Powers inferred from the Necessary and Proper Clause."}, {"term": "Inherent Powers", "definition": "Powers held by any sovereign nation (e.g., foreign affairs)."}, {"term": "Concurrent Powers", "definition": "Powers shared by state and federal governments (e.g., taxation, courts)."}, {"term": "Reserved Powers", "definition": "Powers not given to the national government, kept by the states (10th Amendment)."}, {"term": "Eminent Domain", "definition": "Government power to take private property for public use with just compensation."}, {"term": "Supremacy Clause", "definition": "Federal law is the supreme law of the land."}, {"term": "Necessary and Proper Clause (Elastic Clause)", "definition": "Gives Congress flexibility to carry out duties; basis of implied powers."}, {"term": "Full Faith and Credit Clause", "definition": "Requires states to honor public acts, records, and judicial rulings of other states."}, {"term": "Privileges and Immunities Clause", "definition": "Prevents states from discriminating against citizens of other states."}, {"term": "Commerce Clause", "definition": "Grants Congress power to regulate trade among states and with foreign nations."}, {"term": "Bill of Rights", "definition": "First ten amendments protecting individual liberties; bans Ex Post Facto Laws (retroactive punishment) and Bills of Attainder (punishment without trial)."}, {"term": "Core Democratic Values & Ideologies", "definition": "Liberty, Equality, Self-Government, Majority Rule, Minority Rights, plus Political Culture, Political Ideology, Liberalism (government action for equality), Conservatism (limited government, tradition), and Pluralism (power spread among groups)."},{"term": "Core Democratic Values & Ideologies", "definition": "Liberty, Equality, Self-Government, Majority Rule, Minority Rights, plus Political Culture, Political Ideology, Liberalism (government action for equality), Conservatism (limited government, tradition), and Pluralism (power spread among groups)."},

{"term": "Force Theory", "definition": "Idea that government originated when stronger individuals or groups imposed their will on others."},
{"term": "Patriarchal/Matriarchal Theory", "definition": "Belief that government developed out of family, clan, or tribal structures."},
{"term": "Marxist Theory of Government", "definition": "Theory that government is a tool created by the wealthy to preserve their power and control over society."},
{"term": "Historical School (Origins of Government)", "definition": "View that modern governments formed through a combination of force, family, religion, and economics."},
{"term": "Libertarianism", "definition": "Belief in very limited government focused only on protecting from invasion and maintaining order, emphasizing personal responsibility."},
{"term": "Democratic Socialism", "definition": "System where government controls key industries vital to the nation while leaving most of the economy to the free market."},
{"term": "Dillon Rule", "definition": "Principle that local governments are created by and dependent upon state governments."},
{"term": "Texas v. White (1869)", "definition": "Supreme Court case establishing that states cannot secede from the Union once admitted."},
{"term": "Dual Federalism", "definition": "‘Layer cake’ federalism; state and national governments operate separately with distinct powers."},
{"term": "Cooperative Federalism", "definition": "‘Marble cake’ federalism; overlapping powers and responsibilities shared between state and national governments."},
{"term": "Requirements for Democracy", "definition": "Freedom of expression, fair and frequent elections, rule of law, minority rights, informed citizens, and a strong middle class."},
{"term": "Autocracy", "definition": "Dictatorship controlled by a single individual with absolute power."},
{"term": "Oligarchy", "definition": "Dictatorship controlled by a small group of elites with concentrated power."},
{"term": "Totalitarianism", "definition": "A form of dictatorship where government seeks to control nearly every aspect of life, as in Nazi Germany or the Soviet Union."}
];
];

// Utility: shuffle array (Fisher-Yates)
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Build the quiz with 4 choices each (1 correct + 3 distractors)
function buildQuiz() {
  const form = document.getElementById('quizForm');
  form.innerHTML = '';
  const defs = QUESTIONS.map(q => q.definition);

  QUESTIONS.forEach((q, idx) => {
    // pick 3 random distractors not equal to correct definition
    let distractors = shuffle(defs.filter(d => d !== q.definition)).slice(0, 3);
    const choices = shuffle([q.definition, ...distractors]);

    const qDiv = document.createElement('div');
    qDiv.className = 'question';

    const prompt = document.createElement('p');
    const termText = String(q.term).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    prompt.innerHTML = '<strong>Q' + (idx+1) + '. ' + termText + '</strong>';
    qDiv.appendChild(prompt);

    const choicesDiv = document.createElement('div');
    choicesDiv.className = 'choices';

    choices.forEach((choice, cIdx) => {
      const id = 'q' + idx + '_opt' + cIdx;
      const label = document.createElement('label');
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'q' + idx;
      input.value = choice;
      input.id = id;

      const span = document.createElement('span');
      span.textContent = ' ' + choice;

      label.appendChild(input);
      label.appendChild(span);
      choicesDiv.appendChild(label);
    });

    qDiv.appendChild(choicesDiv);
    form.appendChild(qDiv);
  });
}

function submitQuiz() {
  const form = document.getElementById('quizForm');
  const resultDiv = document.getElementById('result');
  let correct = 0;
  const missed = [];

  QUESTIONS.forEach((q, idx) => {
    const selected = form.querySelector('input[name="q' + idx + '"]:checked');
    const answer = selected ? selected.value : null;
    if (answer === q.definition) {
      correct += 1;
    } else {
      missed.push({ index: idx+1, term: q.term, your: answer, correct: q.definition });
    }
  });

  // Build feedback: only missed questions
  let html = '<p class="score">Score: ' + correct + ' / ' + QUESTIONS.length + '</p>';
  if (missed.length === 0) {
    html += '<p>Perfect! 🎉</p>';
  } else {
    html += '<div class="section-title">Review the ones to study:</div>';
    missed.forEach(m => {
      const safeTerm = String(m.term).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      html += '<div class="question">'
           +  '<p><strong>Q' + m.index + '. ' + safeTerm + '</strong></p>'
           +  '<p class="your-answer">Your answer: ' + (m.your ? m.your : '(no answer)') + '</p>'
           +  '<p class="correct-answer">Correct: ' + m.correct + '</p>'
           +  '</div>';
    });
  }

  resultDiv.innerHTML = html;
  resultDiv.classList.remove('hidden');
  window.scrollTo({ top: resultDiv.offsetTop, behavior: 'smooth' });
}

function resetQuiz() {
  // Clear selections
  document.querySelectorAll('#quizForm input[type=radio]').forEach(el => el.checked = false);
  document.getElementById('result').classList.add('hidden');
  document.getElementById('result').innerHTML = '';
  // rebuild to reshuffle
  buildQuiz();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', () => {
  buildQuiz();
  document.getElementById('submitBtn').addEventListener('click', submitQuiz);
  document.getElementById('resetBtn').addEventListener('click', resetQuiz);
});
