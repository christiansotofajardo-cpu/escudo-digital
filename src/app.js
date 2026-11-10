
/**
 * ESCUDO Digital v0.3
 * Interfaz interactiva bilingüe.
 * Análisis local de mensajes.
 * SPDX-License-Identifier: MIT
 */

(() => {
  'use strict';

  const $ = id => document.getElementById(id);

  const node = (tag, cls, text) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  };

  const originals = new Map(
    [...document.querySelectorAll('[data-i18n]')]
      .map(e => [e, e.textContent])
  );

  const en = {
    skip: 'Skip to content',
    brandDesc: 'Safety in digital conversations',
    eyebrow: 'ONLINE SAFETY PROTOTYPE',
    heroTitle: 'If a message worries you, you deserve to understand why.',
    heroLead: 'Explore possible signs of pressure, threats or manipulation. No surveillance, accounts or messages sent to a server.',
    trust1: 'On-device analysis',
    trust2: 'We do not store messages',
    trust3: 'Español / English',
    tabAnalyze: 'Analyze',
    tabLearn: 'Learn',
    tabAbout: 'Privacy and support',
    stepOne: '01 / OBSERVE',
    stepTwo: '02 / UNDERSTAND',
    analyzeTitle: 'What does the message say?',
    analyzeDesc: 'Type or paste a concerning message. Analysis stays on your device.',
    fieldLabel: 'Message to analyze',
    privacyTip: 'Tip: avoid names, numbers or addresses.',
    analyzeButton: 'Analyze message',
    clearButton: 'Clear',
    examplesHeading: 'TRY FICTIONAL EXAMPLES',
    guideTitle: 'What is ESCUDO looking for?',
    guideDesc: 'It identifies possible language patterns, not anyone’s intention or whether a crime happened.',
    signal1Title: 'Threats and blackmail',
    signal1Desc: 'Threats to share images or cause harm.',
    signal2Title: 'Manipulation and secrets',
    signal2Desc: 'Conditional affection or imposed silence.',
    signal3Title: 'Personal information',
    signal3Desc: 'Requests for passwords, location or private data.',
    signal4Title: 'Intimacy and consent',
    signal4Desc: 'Requests to undress or expose the body.',
    guideNoteTitle: 'Important',
    guideNote: 'No alert does not mean a message is safe. Context matters.',
    resultEyebrow: 'ANALYSIS RESULT',
    nextTitle: 'What can you do?',
    resultFoot: 'Experimental rules and local statistical AI. It may miss cues or give false alarms. It does not replace human support or emergency services.',
    learnEyebrow: 'DECISION LAB',
    learnTitle: 'Practice with fictional situations',
    learnIntro: 'Choose the safer first response. Do not share personal experiences.',
    scenarioQuestion: 'What would be safer to do first?',
    nextScenario: 'Next situation',
    privacyEyebrow: 'PRIVACY BY DESIGN',
    privacyTitle: 'Your words stay on your device.',
    privacyText: 'Analysis runs in the browser. No accounts, analytics or message storage. You can clear the text. Offline installation requires static app files.',
    limitTitle: 'Limitations',
    limitText: 'Rules plus a statistical classifier trained on fictional examples. It cannot reliably interpret irony, images, context or entire conversations.',
    researchTitle: 'Research status',
    researchText: 'Experimental v0.3 prototype. Not independently validated with adolescents, schools or clinical samples.',
    installTitle: 'Do I need to install it?',
    installText: 'No. Use your browser or add it to your home screen on compatible devices.',
    supportEyebrow: 'PEOPLE AND SUPPORT',
    supportTitle: 'You do not have to face this alone.',
    supportIntro: 'If you feel threatened, speak to a trusted adult or a local protection service. For immediate danger, call local emergency services.',
    chileLabel: 'IF YOU ARE IN CHILE',
    chileTitle: 'Fono Niños — Chilean Police',
    chileDesc: 'Free confidential support for children and adolescents, 24/7.',
    chileLink: 'Official information ↗',
    supportNote: '147 serves Chile. Elsewhere, find your local child protection helpline.',
    footer: 'Experimental tool, not automatic monitoring.'
  };

  const strings = {
    es: {
      headings: [
        'Hay señales que merecen atención prioritaria',
        'Se identificaron posibles señales de presión',
        'No se identificaron señales concluyentes'
      ],
      tags: [
        'ATENCIÓN PRIORITARIA',
        'REVISAR CON APOYO',
        'RESULTADO NO CONCLUYENTE'
      ],
      summaries: [
        'El mensaje contiene expresiones que merecen atención. ESCUDO no puede determinar la intención ni el peligro real.',
        'Se encontraron señales posibles; el contexto es esencial.',
        'No se identificaron señales claras. Esto NO demuestra que el mensaje sea seguro.'
      ],
      methodYes: 'La IA estadística local identificó semejanzas con ejemplos ficticios de presión. No es un diagnóstico.',
      methodNo: 'La IA estadística local no añadió alertas; también se aplicaron reglas lingüísticas.',
      noMatch: 'Sin coincidencias concluyentes. Ante una inquietud, busca apoyo de confianza.',
      combined: 'Se detectó una combinación de señales.',
      steps: [
        'Puedes detener la conversación. No tienes obligación de responder ni de hacer algo que te incomode.',
        'No compartas más imágenes, claves, códigos ni ubicación bajo presión.',
        'Busca apoyo de una persona adulta de confianza o de un servicio de protección.',
        'Conserva evidencia de forma segura si es necesario, pero no descargues ni reenvíes imágenes íntimas de menores.',
        'En Chile, el Fono Niños 147 ofrece orientación.'
      ],
      situation: 'SITUACIÓN',
      correct: 'Respuesta protectora',
      review: 'Revisemos esta opción',
      next: 'Siguiente situación',
      restart: 'Volver a empezar',
      scenarios: [
        [
          '“Si no haces lo que digo, voy a publicar tus fotos”.',
          [
            'Enviar otra foto para calmar a la persona.',
            'Buscar apoyo de una persona adulta de confianza y no ceder a la amenaza.',
            'Reenviar las fotos para pedir opinión.'
          ],
          1,
          'No cedas a amenazas. Busca apoyo y no redistribuyas imágenes íntimas.'
        ],
        [
          '“No se lo digas a tus padres, esto queda entre nosotros”.',
          [
            'Reconocer que imponer secretos puede ser una alerta y pedir apoyo.',
            'Aceptar el secreto.',
            'Borrar todo sin consultar.'
          ],
          0,
          'Un secreto impuesto para impedir pedir ayuda puede ser manipulación.'
        ],
        [
          '“Envíame tu contraseña y tu ubicación”.',
          [
            'Compartir los datos.',
            'Entregar solamente la contraseña.',
            'No compartir y buscar apoyo si hay presión.'
          ],
          2,
          'La contraseña y la ubicación son datos sensibles.'
        ],
        [
          '“Muéstrame tus fotos privadas, no se lo diré a nadie”.',
          [
            'Enviar las fotos.',
            'Reconocer posibles señales y buscar apoyo si hay presión.',
            'Publicar toda la conversación.'
          ],
          1,
          'Las promesas de secreto no garantizan protección.'
        ],
        [
          '“Hola, ¿nos vemos mañana para estudiar?”.',
          [
            'Toda invitación es peligrosa.',
            'Considerar el contexto; esta frase sola no prueba daño.',
            'El mensaje es siempre seguro.'
          ],
          1,
          'Un mensaje cotidiano requiere contexto; ninguna clasificación garantiza seguridad.'
        ]
      ]
    },

    en: {
      headings: [
        'Signals needing priority attention',
        'Possible pressure cues identified',
        'No conclusive cues identified'
      ],
      tags: [
        'PRIORITY ATTENTION',
        'REVIEW WITH SUPPORT',
        'INCONCLUSIVE RESULT'
      ],
      summaries: [
        'This text contains cues requiring attention. ESCUDO cannot determine intent or actual danger.',
        'Possible warning signs were found; context is essential.',
        'No clear cues were found. This does NOT mean the message is safe.'
      ],
      methodYes: 'The local statistical AI identified similarities with fictional examples of pressure. This is not a diagnosis.',
      methodNo: 'The local statistical AI added no warnings; linguistic rules were also applied.',
      noMatch: 'No conclusive matches. If something worries you, seek trusted support.',
      combined: 'A combination of warning signals was detected.',
      steps: [
        'You can stop the conversation. You do not have to reply or do anything uncomfortable.',
        'Do not share additional images, passwords, codes or locations under pressure.',
        'Seek support from a trusted adult or local protection service.',
        'Preserve evidence safely if needed, but do not download or forward intimate images involving minors.',
        'In Chile, Fono Niños 147 provides advice.'
      ],
      situation: 'SITUATION',
      correct: 'Protective response',
      review: 'Let’s review this option',
      next: 'Next situation',
      restart: 'Start again',
      scenarios: [
        [
          '“If you refuse, I will post your photos”.',
          [
            'Send another photo.',
            'Seek help from a trusted adult and do not give in.',
            'Forward the intimate photos to friends.'
          ],
          1,
          'Do not give in to threats or redistribute intimate images.'
        ],
        [
          '“Do not tell your parents; this stays between us”.',
          [
            'Recognize imposed secrecy and seek support.',
            'Accept the secret.',
            'Delete everything without consulting anyone.'
          ],
          0,
          'Imposed secrecy can be a manipulation tactic.'
        ],
        [
          '“Send me your password and location”.',
          [
            'Share both.',
            'Share just the password.',
            'Do not share and seek support if pressured.'
          ],
          2,
          'Passwords and locations are sensitive information.'
        ],
        [
          '“Show me your private photos; I will not tell anyone”.',
          [
            'Send the photos.',
            'Notice warning signs and seek support if pressured.',
            'Post the conversation online.'
          ],
          1,
          'A promise of secrecy cannot guarantee protection.'
        ],
        [
          '“Hi, see you tomorrow to study?”',
          [
            'Every invitation is unsafe.',
            'Consider context; the sentence alone does not prove harm.',
            'It is always safe.'
          ],
          1,
          'Ordinary-looking messages still need context.'
        ]
      ]
    }
  };

  let language = 'es';
  let index = 0;
  let answered = false;
  let analyzed = false;

  const s = () => strings[language];

  const examples = window.DEMO_EXAMPLES;
  const analyze = window.analyzeHybridMessage;

  if (!examples || typeof analyze !== 'function') {
    console.error('ESCUDO: missing analysis modules');

    $('resultPanel').hidden = false;
    $('resultHeading').textContent =
      'Error: no se cargó el motor de análisis.';

    return;
  }

  const updateCount = () => {
    $('charCount').textContent =
      $('messageInput').value.length + ' / 2000';
  };

  function renderExamples() {
    const target = $('examplePills');
    target.replaceChildren();

    for (const example of examples[language]) {
      const b = node('button', 'example-pill', example.label);
      b.type = 'button';

      b.addEventListener('click', () => {
        $('messageInput').value = example.text;
        updateCount();
        analyzed = false;
        $('resultPanel').hidden = true;
        $('messageInput').focus();
      });

      target.append(b);
    }
  }

  function renderResult() {
    const input = $('messageInput').value.trim();

    if (!input) {
      $('messageInput').focus();
      return;
    }

    const result = analyze(input, language);

    const severity =
      result.urgency === 'priority' ? 0 :
      result.urgency === 'attention' ? 1 : 2;

    $('resultHeading').textContent =
      s().headings[severity];

    const tag = $('resultTag');
    tag.textContent = s().tags[severity];

    tag.className =
      'result-tag' + (severity === 0 ? ' priority' : '');

    $('resultSummary').textContent =
      s().summaries[severity];

    $('modelMethod').textContent =
      result.modelFlag ? s().methodYes : s().methodNo;

    const signals = $('resultSignals');
    signals.replaceChildren();

    for (const [i, signal] of result.categories.entries()) {
      const card = node('div', 'match-card');

      card.append(
        node('span', 'match-n', String(i + 1).padStart(2, '0'))
      );

      card.append(node('h3', '', signal.label));
      card.append(node('p', '', signal.explanation));

      signals.append(card);
    }

    if (!result.categories.length) {
      signals.append(
        node('div', 'no-signals', s().noMatch)
      );
    }

    if (result.combinedSignals?.length) {
      signals.append(
        node('div', 'no-signals', s().combined)
      );
    }

    const steps = $('nextSteps');
    steps.replaceChildren();

    for (const [i, step] of s().steps.entries()) {
      if (i !== 3 || severity === 0) {
        steps.append(node('li', '', step));
      }
    }

    $('resultPanel').hidden = false;

    $('resultPanel').scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  function renderScenario() {
    const all = s().scenarios;
    answered = false;

    const current = all[index];

    $('scenarioCount').textContent =
      s().situation + ' ' + (index + 1) + ' / ' + all.length;

    $('scenarioText').textContent = current[0];

    const progress = $('learningProgress');
    progress.replaceChildren();

    all.forEach((_, i) => {
      progress.append(
        node(
          'span',
          'progress-dot' + (i <= index ? ' active' : '')
        )
      );
    });

    const choices = $('scenarioChoices');
    choices.replaceChildren();

    current[1].forEach((choice, i) => {
      const b = node('button', 'choice', choice);
      b.type = 'button';

      b.addEventListener('click', () => {
        if (answered) return;

        answered = true;
        b.classList.add('selected');

        choices.querySelectorAll('button').forEach(
          x => x.disabled = true
        );

        const fb = $('scenarioFeedback');

        fb.replaceChildren(
          node(
            'strong',
            '',
            i === current[2] ? s().correct : s().review
          ),
          node('p', '', current[3])
        );

        fb.hidden = false;
        $('nextScenario').hidden = false;

        $('nextScenario')
          .querySelector('span')
          .textContent =
            index === all.length - 1 ?
              s().restart : s().next;
      });

      choices.append(b);
    });

    $('scenarioFeedback').hidden = true;
    $('nextScenario').hidden = true;
  }

  function setLanguage(lang) {
    language = lang === 'en' ? 'en' : 'es';
    document.documentElement.lang = language;

    document.title =
      language === 'es' ?
        'ESCUDO Digital | Reconoce las señales' :
        'ESCUDO Digital | Recognize the signs';

    for (const [element, es] of originals) {
      element.textContent =
        language === 'es' ?
          es :
          (en[element.dataset.i18n] ?? es);
    }

    $('messageInput').placeholder =
      language === 'es' ?
        'Ej.: Si no haces lo que digo, voy a publicar tus fotos.' :
        'Example: If you refuse, I will post your photos.';

    for (const langCode of ['es', 'en']) {
      const b = $('lang-' + langCode);

      b.classList.toggle(
        'active',
        langCode === language
      );

      b.setAttribute(
        'aria-pressed',
        String(langCode === language)
      );
    }

    renderExamples();
    renderScenario();

    if (analyzed) renderResult();
  }

  function chooseTab(name) {
    for (const tab of ['analyze', 'learn', 'about']) {
      const active = tab === name;

      $('tab-' + tab).classList.toggle(
        'active',
        active
      );

      $('tab-' + tab).setAttribute(
        'aria-selected',
        String(active)
      );

      $('panel-' + tab).hidden = !active;
    }
  }

  $('lang-es').addEventListener(
    'click',
    () => setLanguage('es')
  );

  $('lang-en').addEventListener(
    'click',
    () => setLanguage('en')
  );

  for (const tab of ['analyze', 'learn', 'about']) {
    $('tab-' + tab).addEventListener(
      'click',
      () => chooseTab(tab)
    );
  }

  $('messageInput').addEventListener(
    'input',
    updateCount
  );

  $('analyzeBtn').addEventListener('click', () => {
    if ($('messageInput').value.trim()) {
      analyzed = true;
      renderResult();
    }
  });

  $('clearBtn').addEventListener('click', () => {
    $('messageInput').value = '';
    updateCount();

    analyzed = false;
    $('resultPanel').hidden = true;
    $('messageInput').focus();
  });

  $('nextScenario').addEventListener('click', () => {
    index = (index + 1) % s().scenarios.length;
    renderScenario();
  });

  setLanguage('es');
  updateCount();
  chooseTab('analyze');

  // Registrar el Service Worker si está disponible.
  if (
    'serviceWorker' in navigator &&
    (
      location.protocol === 'https:' ||
      location.hostname === 'localhost'
    )
  ) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('./sw.js')
        .catch(() => {});
    });
  }

})();
