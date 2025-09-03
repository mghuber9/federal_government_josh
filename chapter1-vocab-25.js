// Chapter 1 — Vocabulary Quiz (25 Terms)
// Scope: Limited strictly to Chapter 1 study guide + textbook key terms
// Always shows ALL 25 items each time.

const QUESTIONS = [
  { term: "Politics", definition: "The process by which society settles conflicts and allocates benefits and costs." },
  { term: "Power", definition: "The ability of persons, groups, or institutions to influence political developments." },
  { term: "Authority", definition: "The recognized right of officials to exercise power." },
  { term: "Political Science", definition: "The systematic study of government and politics using analytical tools and evidence." },
  { term: "Critical Thinking", definition: "Carefully evaluating information and arguments to reach reasoned conclusions." },
  { term: "Confirmation Bias", definition: "The tendency to interpret information in ways that reinforce what one already believes." },
  { term: "Political Culture", definition: "The widely shared and deep-seated beliefs of a people about politics and government." },
  { term: "Liberty", definition: "The principle that individuals should be free to act and think as they choose, so long as they do not infringe on others." },
  { term: "Individualism", definition: "A commitment to personal initiative, self-reliance, and personal responsibility." },
  { term: "Equality", definition: "The notion that individuals are equal in moral worth and entitled to equal treatment under the law." },
  { term: "Self-Government", definition: "The idea that the people are the ultimate source of governing authority and should have a voice in their government." },
  { term: "Democracy", definition: "A system of majority rule through free and fair elections, usually via elected representatives." },
  { term: "Majoritarianism", definition: "The idea that the majority’s preferences have a primary influence on government policy." },
  { term: "Pluralism", definition: "The view that on most issues, policy is shaped by the competition among organized interests." },
  { term: "Elitism", definition: "The perspective that a small number of well-positioned, highly influential people hold most power." },
  { term: "Corporate Power", definition: "The influence of business firms on public policy and political outcomes." },
  { term: "Constitutionalism", definition: "The idea that government power is limited by law and must respect individual rights." },
  { term: "Legal Action", definition: "Using the courts to assert rights and interests under the law." },
  { term: "Free-Market System", definition: "An economic system where most transactions occur between private parties, with limited government intervention." },
  { term: "Public Policies", definition: "The decisions and actions of government to pursue particular courses of action." },
  { term: "Party (Partisan) Polarization", definition: "The deepening conflict and division between the Republican and Democratic parties." },
  { term: "Authoritarian Government", definition: "A regime that openly represses opponents, limits freedoms, and curtails fair elections and free expression." },
  // Added to align with study guide comparisons
  { term: "Oligarchy", definition: "A form of government in which control rests with a small group of elites." },
  { term: "Socialism", definition: "An economic system where government owns or controls major industries and guarantees a basic standard of living." },
  { term: "Communism", definition: "A system in which government owns nearly all major industries and centrally plans the economy." }
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
  document.querySelectorAll('#quizForm input[type=radio]').forEach(el => el.checked = false);
  document.getElementById('result').classList.add('hidden');
  document.getElementById('result').innerHTML = '';
  buildQuiz();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', () => {
  buildQuiz();
  document.getElementById('submitBtn').addEventListener('click', submitQuiz);
  document.getElementById('resetBtn').addEventListener('click', resetQuiz);
});
