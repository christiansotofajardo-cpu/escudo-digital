
/**
 * ESCUDO Digital — bilingual UI consistency revision, 2026-11-11.
 * UI only: does not modify the local detection model or rules.
 * SPDX-License-Identifier: MIT
 */
(() => {
  'use strict';

  const $ = (id) => document.getElementById(id);
  const node = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  };

  // Every visible static label has an explicit translation in both languages.
  const ui = {
    es: {
      skip: 'Saltar al contenido',
      brandDesc: 'Seguridad en conversaciones digitales',
      eyebrow: 'PROTOTIPO DE PREVENCIÓN DIGITAL',
      heroTitle: 'Si un mensaje te inquieta, mereces entender por qué.',
      heroLead: 'Explora posibles señales de presión, amenaza o manipulación en un mensaje. Sin vigilancia, sin cuentas y sin entregar tus conversaciones a un servidor.',
      trust1: 'Análisis en tu dispositivo', trust2: 'No guardamos mensajes', trust3: 'Español / English',
      tabAnalyze: 'Analizar', tabLearn: 'Aprender', tabAbout: 'Privacidad y ayuda',
      stepOne: '01 / OBSERVAR', stepTwo: '02 / COMPRENDER',
      analyzeTitle: '¿Qué dice el mensaje?',
      analyzeDesc: 'Escribe o pega un mensaje que te preocupe. El análisis ocurre solamente en este dispositivo.',
      fieldLabel: 'Mensaje para analizar',
      privacyTip: 'Consejo: evita incluir nombres, números o direcciones.',
      analyzeButton: 'Analizar mensaje', clearButton: 'Borrar',
      examplesHeading: 'PROBAR CON EJEMPLOS FICTICIOS',
      guideTitle: '¿Qué está buscando ESCUDO?',
      guideDesc: 'Busca patrones lingüísticos de presión; no verifica la intención de quien escribe ni determina si hubo un delito.',
      signal1Title: 'Amenazas y chantaje', signal1Desc: 'Difundir imágenes o causar daño como presión.',
      signal2Title: 'Manipulación y secretos', signal2Desc: 'Afecto condicionado o silencio impuesto.',
      signal3Title: 'Datos personales', signal3Desc: 'Solicitudes de claves, fotos privadas o ubicación.',
      signal4Title: 'Intimidad y consentimiento', signal4Desc: 'Peticiones para desvestirse o mostrar el cuerpo.',
      guideNoteTitle: 'Importante',
      guideNote: 'Un mensaje sin alertas no significa que sea seguro. El contexto y la experiencia de la persona importan.',
      resultEyebrow: 'RESULTADO DEL ANÁLISIS', nextTitle: '¿Qué puedes hacer?',
      resultFoot: 'Evaluación experimental con reglas e inteligencia artificial local. Puede omitir señales o producir alertas incorrectas. No reemplaza el apoyo humano ni los servicios de emergencia.',
      learnEyebrow: 'LABORATORIO DE DECISIONES',
      learnTitle: 'Practiquemos con situaciones ficticias',
      learnIntro: 'Elige la primera respuesta más segura. No necesitas compartir experiencias personales.',
      scenarioQuestion: '¿Qué sería más seguro hacer primero?', nextScenario: 'Siguiente situación',
      privacyEyebrow: 'PRIVACIDAD POR DISEÑO',
      privacyTitle: 'Tus palabras permanecen en tu dispositivo.',
      privacyText: 'El motor analiza el texto en el navegador, sin cuentas, estadísticas, nube, cookies ni almacenamiento de mensajes. Puedes borrar el texto cuando quieras. Al instalar la aplicación, el navegador puede guardar los archivos necesarios para abrirla sin conexión.',
      limitTitle: 'Límites de la herramienta',
      limitText: 'Combina reglas con un clasificador estadístico entrenado con mensajes ficticios. No interpreta de forma fiable ironía, contextos complejos, imágenes ni conversaciones completas. No determina culpabilidad, delitos o seguridad.',
      researchTitle: 'Estado de investigación',
      researchText: 'Prototipo experimental con IA estadística local. Las pruebas usan mensajes ficticios. No cuenta con validación clínica, escolar ni con adolescentes.',
      installTitle: '¿Hay que instalarlo?',
      installText: 'No. Abre la página desde tu navegador. En dispositivos compatibles puedes añadirla a la pantalla de inicio.',
      supportEyebrow: 'PERSONAS Y REDES DE APOYO',
      supportTitle: 'No tienes que resolverlo sola o solo.',
      supportIntro: 'Si te sientes amenazada o en riesgo, conversa con una persona adulta de confianza o un servicio local de protección. Si existe peligro inmediato, contacta a los servicios de emergencia de tu localidad.',
      chileLabel: 'SI ESTÁS EN CHILE', chileTitle: 'Fono Niños — Carabineros de Chile',
      chileDesc: 'Orientación gratuita y confidencial para niñas, niños y adolescentes, las 24 horas.',
      chileLink: 'Información oficial ↗',
      supportNote: 'El 147 es un recurso de Chile. Si estás en otro país, busca un servicio de protección infantil de tu localidad.',
      footer: 'Herramienta experimental, no monitorización automática.',
      placeholder: 'Ej.: Si no haces lo que digo, voy a publicar tus fotos.',
      pageTitle: 'ESCUDO Digital | Reconoce las señales',
      metaDescription: 'Prototipo educativo de prevención de riesgos digitales con análisis local de mensajes.',
      version: 'v0.3 · IA local', footerBrand: 'ESCUDO Digital · IDE SpA · Prototipo v0.3',
      artTop: 'PRIVACIDAD PRIMERO', artBottom: 'SEGURIDAD POR DISEÑO',
      navigation: 'Navegación principal', languageSwitch: 'Idioma', modelAria: 'Método de inteligencia artificial',
      headings: ['Hay señales que merecen atención prioritaria', 'Se identificaron posibles señales de presión', 'No se identificaron señales concluyentes'],
      tags: ['ATENCIÓN PRIORITARIA', 'REVISAR CON APOYO', 'RESULTADO NO CONCLUYENTE'],
      summaries: [
        'El mensaje contiene expresiones que merecen atención. ESCUDO no puede determinar la intención ni el peligro real.',
        'Se encontraron posibles señales; el contexto es esencial.',
        'No se identificaron señales claras. Esto NO demuestra que el mensaje sea seguro.'
      ],
      methodYes: 'La IA estadística local identificó semejanzas con ejemplos ficticios de presión. No es un diagnóstico.',
      methodNo: 'La IA estadística local no añadió alertas; también se aplicaron reglas lingüísticas.',
      noMatch: 'No hubo coincidencias concluyentes. Si algo te inquieta, busca apoyo de confianza.',
      combined: 'Se detectó una combinación de posibles señales; es importante considerar el contexto.',
      steps: [
        'Puedes detener la conversación. No tienes obligación de responder ni de hacer algo que te incomode.',
        'No compartas más imágenes, claves, códigos ni ubicación bajo presión.',
        'Busca apoyo de una persona adulta de confianza o de un servicio de protección.',
        'Conserva evidencia de forma segura si hace falta, pero no descargues ni reenvíes imágenes íntimas de menores.',
        'En Chile, el Fono Niños 147 ofrece orientación.'
      ],
      situation: 'SITUACIÓN', correct: 'Respuesta protectora', review: 'Revisemos esta opción',
      next: 'Siguiente situación', restart: 'Volver a empezar',
      scenarios: [
        ['«Si no haces lo que digo, voy a publicar tus fotos».',
          ['Enviar otra foto para calmar a la persona.', 'Buscar apoyo de una persona adulta de confianza y no ceder a la amenaza.', 'Reenviar las fotos para pedir opinión.'], 1,
          'No cedas a amenazas. Busca apoyo y no redistribuyas imágenes íntimas.'],
        ['«No se lo digas a tus padres, esto queda entre nosotros».',
          ['Reconocer que imponer secretos puede ser una alerta y pedir apoyo.', 'Aceptar el secreto.', 'Borrar todo sin consultar.'], 0,
          'Un secreto impuesto para impedir pedir ayuda puede indicar manipulación.'],
        ['«Envíame tu contraseña y tu ubicación».',
          ['Compartir los datos.', 'Entregar solamente la contraseña.', 'No compartir y buscar apoyo si hay presión.'], 2,
          'La contraseña y la ubicación son datos sensibles.'],
        ['«Muéstrame tus fotos privadas, no se lo diré a nadie».',
          ['Enviar las fotos.', 'Reconocer posibles señales y buscar apoyo si hay presión.', 'Publicar toda la conversación.'], 1,
          'Una promesa de secreto no garantiza protección.'],
        ['«Hola, ¿nos vemos mañana para estudiar?».',
          ['Toda invitación es peligrosa.', 'Considerar el contexto; esta frase sola no prueba daño.', 'El mensaje es siempre seguro.'], 1,
          'Un mensaje cotidiano requiere contexto; ninguna clasificación garantiza seguridad.']
      ]
    },
    en: {
      skip: 'Skip to content',
      brandDesc: 'Safety in digital conversations',
      eyebrow: 'DIGITAL SAFETY PROTOTYPE',
      heroTitle: 'If a message worries you, you deserve to understand why.',
      heroLead: 'Explore possible signs of pressure, threats, or manipulation in a message. No surveillance, no accounts, and no messages sent to a server.',
      trust1: 'On-device analysis', trust2: 'We do not store messages', trust3: 'Spanish / English',
      tabAnalyze: 'Analyze', tabLearn: 'Learn', tabAbout: 'Privacy and support',
      stepOne: '01 / OBSERVE', stepTwo: '02 / UNDERSTAND',
      analyzeTitle: 'What does the message say?',
      analyzeDesc: 'Type or paste a message that concerns you. Analysis happens only on this device.',
      fieldLabel: 'Message to analyze',
      privacyTip: 'Tip: avoid including names, phone numbers, or addresses.',
      analyzeButton: 'Analyze message', clearButton: 'Clear',
      examplesHeading: 'TRY FICTIONAL EXAMPLES',
      guideTitle: 'What is ESCUDO looking for?',
      guideDesc: 'It looks for language patterns associated with pressure; it cannot establish intent or determine whether a crime occurred.',
      signal1Title: 'Threats and blackmail', signal1Desc: 'Threats to share images or cause harm as pressure.',
      signal2Title: 'Manipulation and secrecy', signal2Desc: 'Conditional affection or enforced silence.',
      signal3Title: 'Personal information', signal3Desc: 'Requests for passwords, private photos, or location.',
      signal4Title: 'Intimacy and consent', signal4Desc: 'Requests to undress or expose the body.',
      guideNoteTitle: 'Important',
      guideNote: 'No alert does not mean a message is safe. Context and personal experience matter.',
      resultEyebrow: 'ANALYSIS RESULT', nextTitle: 'What can you do?',
      resultFoot: 'Experimental rules and local statistical AI. This tool may miss cues or produce false alarms. It does not replace human support or emergency services.',
      learnEyebrow: 'DECISION LAB',
      learnTitle: 'Practice with fictional situations',
      learnIntro: 'Choose the safer first response. You do not need to share personal experiences.',
      scenarioQuestion: 'What would be safer to do first?', nextScenario: 'Next situation',
      privacyEyebrow: 'PRIVACY BY DESIGN',
      privacyTitle: 'Your words stay on your device.',
      privacyText: 'Analysis runs in the browser without accounts, analytics, cloud processing, cookies, or message storage. You can clear the text anytime. If installed, the browser may save static application files for offline use.',
      limitTitle: 'Tool limitations',
      limitText: 'It combines rules with a statistical classifier trained on fictional messages. It cannot reliably interpret sarcasm, complex contexts, images, or complete conversations. It does not determine guilt, crimes, or safety.',
      researchTitle: 'Research status',
      researchText: 'Experimental prototype using local statistical AI. Testing has used fictional messages only; there is no clinical, school-based, or adolescent validation.',
      installTitle: 'Do I need to install it?',
      installText: 'No. Open this page in a browser. On compatible devices you can add it to your home screen.',
      supportEyebrow: 'PEOPLE AND SUPPORT',
      supportTitle: 'You do not have to deal with this alone.',
      supportIntro: 'If you feel threatened or at risk, talk to a trusted adult or local protection service. If there is immediate danger, contact local emergency services.',
      chileLabel: 'IF YOU ARE IN CHILE', chileTitle: 'Fono Niños — Chilean Police',
      chileDesc: 'Free and confidential guidance for children and adolescents, 24 hours a day.',
      chileLink: 'Official information ↗',
      supportNote: 'The 147 helpline serves Chile. Elsewhere, look for a local child protection helpline.',
      footer: 'Experimental tool, not automatic monitoring.',
      placeholder: 'Example: If you refuse, I will post your photos.',
      pageTitle: 'ESCUDO Digital | Recognize the signs',
      metaDescription: 'Educational digital safety prototype with local message analysis.',
      version: 'v0.3 · Local AI', footerBrand: 'ESCUDO Digital · IDE SpA · Prototype v0.3',
      artTop: 'PRIVACY FIRST', artBottom: 'SAFETY BY DESIGN',
      navigation: 'Main navigation', languageSwitch: 'Language', modelAria: 'Artificial intelligence method',
      headings: ['Signals requiring priority attention', 'Possible signs of pressure identified', 'No conclusive cues identified'],
      tags: ['PRIORITY ATTENTION', 'REVIEW WITH SUPPORT', 'INCONCLUSIVE RESULT'],
      summaries: [
        'This message contains language that deserves attention. ESCUDO cannot determine intent or actual danger.',
        'Possible warning signs were found; context is essential.',
        'No clear cues were identified. This does NOT mean the message is safe.'
      ],
      methodYes: 'The local statistical AI identified similarities with fictional examples of pressure. This is not a diagnosis.',
      methodNo: 'The local statistical AI added no alerts; linguistic rules were also applied.',
      noMatch: 'No conclusive matches. If something worries you, seek trusted support.',
      combined: 'A combination of possible warning signs was identified; context remains important.',
      steps: [
        'You can stop the conversation. You never have to reply or do anything that makes you uncomfortable.',
        'Do not share additional images, passwords, codes, or location under pressure.',
        'Seek support from a trusted adult or a protection service.',
        'Preserve evidence safely if needed, but do not download or forward intimate images involving minors.',
        'In Chile, Fono Niños 147 offers guidance.'
      ],
      situation: 'SITUATION', correct: 'Protective response', review: 'Let’s review this option',
      next: 'Next situation', restart: 'Start again',
      scenarios: [
        ['“If you refuse, I will post your photos.”',
          ['Send another photo to calm the person.', 'Seek help from a trusted adult and do not give in.', 'Forward intimate photos to friends.'], 1,
          'Do not give in to threats or redistribute intimate images.'],
        ['“Do not tell your parents; this stays between us.”',
          ['Recognize imposed secrecy and seek support.', 'Accept the secret.', 'Delete everything without consulting anyone.'], 0,
          'Imposed secrecy can be a manipulation tactic.'],
        ['“Send me your password and location.”',
          ['Share both.', 'Share only the password.', 'Do not share and seek support if pressured.'], 2,
          'Passwords and location are sensitive information.'],
        ['“Show me your private photos; I will not tell anyone.”',
          ['Send the photos.', 'Notice warning signs and seek support if pressured.', 'Post the conversation online.'], 1,
          'A promise of secrecy does not guarantee protection.'],
        ['“Hi, see you tomorrow to study?”',
          ['Every invitation is unsafe.', 'Consider context; this sentence alone does not prove harm.', 'It is always safe.'], 1,
          'Everyday messages still require context; automated classification cannot guarantee safety.']
      ]
    }
  };

  // Translations of warning categories returned by the existing engine.
  const categoryText = {
    es: {
      exposure: ['Amenaza de exposición', 'El mensaje puede utilizar la divulgación de información o imágenes para presionar.'],
      intimate: ['Presión para obtener imágenes íntimas', 'Podría haber presión para compartir imágenes íntimas o privadas.'],
      sexual_coercion: ['Posible presión sexual o vulneración de la intimidad', 'Se describe una petición u orden para desvestirse o mostrar el cuerpo. El contexto es esencial.'],
      private_images: ['Solicitud de imágenes privadas', 'Se piden imágenes privadas; las promesas de secreto o la insistencia pueden aumentar la preocupación.'],
      harassment: ['Hostigamiento o humillación', 'El texto puede sugerir humillación o ataques dirigidos a la persona.'],
      threat: ['Amenaza o intimidación', 'El texto puede buscar generar temor para controlar una decisión.'],
      emotional: ['Manipulación afectiva', 'El afecto o la relación se presentan como condición para cumplir una exigencia.'],
      secrecy: ['Secreto o promesa de silencio', 'Se menciona guardar silencio o impedir que se cuente algo; debe interpretarse en contexto.'],
      isolation: ['Intento de aislamiento', 'Se intenta limitar el contacto con personas de confianza.'],
      privacy: ['Solicitud de datos sensibles', 'Se solicitan contraseñas, ubicaciones u otros datos privados.'],
      persistence: ['Desconocimiento de un límite', 'Aparece insistencia frente a una negativa o un límite personal.'],
      contextual_blackmail: ['Posible chantaje indirecto o amenaza de exposición', 'Una condición se vincula con la posible difusión de contenido privado a otras personas.'],
      contextual_emotional_pressure: ['Posible presión afectiva para obtener información personal', 'La confianza o el afecto se vinculan con solicitudes de información privada.'],
      ml_warning: ['Posible señal identificada por IA estadística', 'El modelo encuentra similitudes con mensajes ficticios de presión. Puede equivocarse; el contexto importa.']
    },
    en: {
      exposure: ['Threat of exposure', 'The message may use disclosure of personal information or images to apply pressure.'],
      intimate: ['Pressure for intimate images', 'There may be pressure to share intimate or private images.'],
      sexual_coercion: ['Possible sexual pressure or privacy violation', 'A request or demand to undress or expose the body is described. Context is essential.'],
      private_images: ['Request for private images', 'Private images are requested; secrecy promises or repeated pressure may increase concern.'],
      harassment: ['Harassment or humiliation', 'The text may indicate humiliation or attacks directed at a person.'],
      threat: ['Threat or intimidation', 'The wording may seek to create fear to control a decision.'],
      emotional: ['Emotional manipulation', 'Affection or a relationship is made conditional on complying with a demand.'],
      secrecy: ['Secrecy or promise of silence', 'The message mentions withholding information or discouraging disclosure; context matters.'],
      isolation: ['Attempted isolation', 'The message may seek to restrict contact with trusted people.'],
      privacy: ['Request for sensitive information', 'Passwords, locations, or other private information are requested.'],
      persistence: ['Disregard for boundaries', 'There are signs of persistence after a refusal or personal boundary.'],
      contextual_blackmail: ['Possible indirect blackmail or exposure threat', 'A condition is linked to the possible disclosure of private content to other people.'],
      contextual_emotional_pressure: ['Possible emotional pressure for personal information', 'Trust or affection is linked to requests for private information.'],
      ml_warning: ['Possible cue identified by statistical AI', 'The model detects similarities to fictional messages of pressure. It may be wrong; context matters.']
    }
  };

  let language = 'es';
  let scenarioIndex = 0;
  let answered = false;

  const translate = (key) => ui[language][key] || '';
  const examples = window.DEMO_EXAMPLES;
  const analyze = window.analyzeHybridMessage;

  if (!examples || typeof analyze !== 'function') {
    if ($('resultHeading')) {
      $('resultPanel').hidden = false;
      $('resultHeading').textContent =
        'Error: no se cargó el motor de análisis.';
    }
    console.error('ESCUDO: analysis modules were not loaded');
    return;
  }

  function updateCount() {
    $('charCount').textContent =
      `${$('messageInput').value.length} / 2000`;
  }

  function renderExamples() {
    const target = $('examplePills');
    target.replaceChildren();

    for (const example of (examples[language] || [])) {
      const button = node('button', 'example-pill', example.label);
      button.type = 'button';

      button.addEventListener('click', () => {
        $('messageInput').value = example.text;
        updateCount();
        $('resultPanel').hidden = true;
        $('messageInput').focus();
      });

      target.append(button);
    }
  }

  function renderResult(scroll = true) {
    const input = $('messageInput').value.trim();

    if (!input) {
      $('resultPanel').hidden = true;
      if (scroll) $('messageInput').focus();
      return;
    }

    const result = analyze(input, language);

    const severity =
      result.urgency === 'priority' ? 0 :
      result.urgency === 'attention' ? 1 : 2;

    $('resultHeading').textContent =
      translate('headings')[severity];

    $('resultTag').textContent =
      translate('tags')[severity];

    $('resultTag').className =
      `result-tag${severity === 0 ? ' priority' : ''}`;

    $('resultSummary').textContent =
      translate('summaries')[severity];

    $('modelMethod').textContent =
      result.modelFlag
        ? translate('methodYes')
        : translate('methodNo');

    const signalBox = $('resultSignals');
    signalBox.replaceChildren();

    for (const [index, signal] of
      (result.categories || []).entries()) {

      const local = categoryText[language][signal.id];
      const card = node('div', 'match-card');

      card.append(
        node('span', 'match-n',
          String(index + 1).padStart(2, '0'))
      );

      card.append(
        node('h3', '',
          local
            ? local[0]
            : language === 'es'
              ? 'Señal que requiere revisión'
              : 'Cue requiring review')
      );

      card.append(
        node('p', '',
          local
            ? local[1]
            : language === 'es'
              ? 'El mensaje presenta una posible señal. Conviene revisar el contexto con apoyo.'
              : 'The message may contain a warning cue. Review the context with support.')
      );

      signalBox.append(card);
    }

    if (!(result.categories || []).length) {
      signalBox.append(
        node('div', 'no-signals', translate('noMatch'))
      );
    }

    if ((result.combinedSignals || []).length) {
      signalBox.append(
        node('div', 'no-signals', translate('combined'))
      );
    }

    const nextSteps = $('nextSteps');
    nextSteps.replaceChildren();

    for (const [index, step] of
      translate('steps').entries()) {

      if (index !== 3 || severity === 0) {
        nextSteps.append(node('li', '', step));
      }
    }

    $('resultPanel').hidden = false;

    if (scroll) {
      $('resultPanel').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  function renderScenario() {
    const scenarios = translate('scenarios');
    const current = scenarios[scenarioIndex];

    answered = false;

    $('scenarioCount').textContent =
      `${translate('situation')} ${scenarioIndex + 1} / ${scenarios.length}`;

    $('scenarioText').textContent = current[0];

    const progress = $('learningProgress');
    progress.replaceChildren();

    scenarios.forEach((_, index) => {
      progress.append(
        node('span',
          `progress-dot${index <= scenarioIndex ? ' active' : ''}`)
      );
    });

    const choices = $('scenarioChoices');
    choices.replaceChildren();

    current[1].forEach((choice, index) => {
      const button = node('button', 'choice', choice);
      button.type = 'button';

      button.addEventListener('click', () => {
        if (answered) return;

        answered = true;
        button.classList.add('selected');

        choices.querySelectorAll('button').forEach(
          (b) => { b.disabled = true; }
        );

        const feedback = $('scenarioFeedback');

        feedback.replaceChildren(
          node('strong', '',
            index === current[2]
              ? translate('correct')
              : translate('review')),
          node('p', '', current[3])
        );

        feedback.hidden = false;
        $('nextScenario').hidden = false;

        $('nextScenario')
          .querySelector('span').textContent =
            scenarioIndex === scenarios.length - 1
              ? translate('restart')
              : translate('next');
      });

      choices.append(button);
    });

    $('scenarioFeedback').hidden = true;
    $('nextScenario').hidden = true;
  }

  function setLanguage(nextLanguage) {
    language = nextLanguage === 'en' ? 'en' : 'es';
    document.documentElement.lang = language;
    document.title = translate('pageTitle');

    // Always rewrite every static label when the
    // selected language changes.
    for (const element of
      document.querySelectorAll('[data-i18n]')) {

      const key = element.dataset.i18n;

      if (Object.prototype.hasOwnProperty.call(
        ui[language], key
      )) {
        element.textContent = translate(key);
      }
    }

    $('messageInput').placeholder =
      translate('placeholder');

    document.querySelector(
      '.header-version'
    ).textContent = translate('version');

    document.querySelector(
      '.site-footer > span:first-child'
    ).textContent = translate('footerBrand');

    document.querySelector(
      '.art-label-top'
    ).textContent = translate('artTop');

    document.querySelector(
      '.art-label-bottom'
    ).textContent = translate('artBottom');

    document.querySelector(
      '.tab-bar'
    ).setAttribute(
      'aria-label', translate('navigation')
    );

    document.querySelector(
      '.lang-switch'
    ).setAttribute(
      'aria-label', translate('languageSwitch')
    );

    $('modelMethod').setAttribute(
      'aria-label', translate('modelAria')
    );

    const meta = document.querySelector(
      'meta[name="description"]'
    );

    if (meta) {
      meta.setAttribute(
        'content', translate('metaDescription')
      );
    }

    for (const code of ['es', 'en']) {
      const button = $('lang-' + code);
      const active = code === language;

      button.classList.toggle('active', active);
      button.setAttribute(
        'aria-pressed', String(active)
      );
    }

    renderExamples();
    renderScenario();

    // Recompute visible results in the selected language.
    if (!$('resultPanel').hidden) {
      renderResult(false);
    }
  }

  function chooseTab(name) {
    for (const tab of [
      'analyze', 'learn', 'about'
    ]) {
      const active = tab === name;

      $('tab-' + tab).classList.toggle(
        'active', active
      );

      $('tab-' + tab).setAttribute(
        'aria-selected', String(active)
      );

      $('panel-' + tab).hidden = !active;
    }
  }

  $('lang-es').addEventListener(
    'click', () => setLanguage('es')
  );

  $('lang-en').addEventListener(
    'click', () => setLanguage('en')
  );

  for (const tab of [
    'analyze', 'learn', 'about'
  ]) {
    $('tab-' + tab).addEventListener(
      'click', () => chooseTab(tab)
    );
  }

  $('messageInput').addEventListener(
    'input', updateCount
  );

  $('analyzeBtn').addEventListener(
    'click', () => renderResult(true)
  );

  $('clearBtn').addEventListener(
    'click', () => {
      $('messageInput').value = '';
      updateCount();
      $('resultPanel').hidden = true;
      $('messageInput').focus();
    }
  );

  $('nextScenario').addEventListener(
    'click', () => {
      scenarioIndex =
        (scenarioIndex + 1) %
        translate('scenarios').length;

      renderScenario();
    }
  );

  setLanguage('es');
  updateCount();
  chooseTab('analyze');

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
