
/**
 * ESCUDO Digital v0.3
 * Motor linguistico interpretable.
 * Analisis local sin envio de mensajes.
 * SPDX-License-Identifier: MIT
 */

export const ENGINE_VERSION = '0.3.0';

const lexicon = {
  es: {
    exposure: {
      label: 'Amenaza de exposición',
      explanation: 'El mensaje parece utilizar la publicación o difusión de información o imágenes como presión.',
      patterns: [
        /\b(?:voy a|puedo|vamos a|te voy a|hare)\s+(?:publicar|difundir|subir|mostrar|compartir|enviar)\s+(?:tus?|esas?|estos?|esos?|sus?)\s+(?:fotos?|imagenes?|videos?|conversaciones?|mensajes?|capturas?)\b/,
        /\b(?:publicare|difundire|mostrare|compartire|subire)\s+(?:tus?|esas?|estos?|esos?|sus?)\s+(?:fotos?|imagenes?|videos?|conversaciones?|mensajes?|capturas?)\b/,
        /\b(?:voy a|puedo|te voy a)\s+(?:contar|decir|mostrar)\s+(?:todo|esto|tus? secretos?)\s+a\s+(?:todos|tus padres|tu familia|tu colegio|tus amigos)/,
        /\b(?:filtrare|filtrar|viralizare|viralizar)\b.*\b(?:foto|video|mensaje|chat|imagen)/,
        /\b(?:voy a|te voy a|puedo)\s+(?:filtrar|exponer)\s+(?:la|tu|esa)\s+(?:foto|imagen|conversacion|captura)\s+(?:que me mandaste|privada|personal)\b/,
        /\b(?:voy a|puedo|te voy a)\s+(?:contar|revelar)\b.{0,25}\b(?:tus secretos|lo nuestro|lo que me contaste)\b.{0,35}\b(?:tu familia|a todos|tus padres|tu colegio|tus amigos)\b/
      ],
      level: 'high'
    },
    intimate: {
      label: 'Presión para obtener imágenes íntimas',
      explanation: 'Aparece una petición que puede comprometer la intimidad o la autonomía de quien recibe el mensaje.',
      patterns: [
        /\b(?:manda|mandame|enviame|pasame|envia|enviar|mandar|quiero|necesito|dame)\b.{0,55}\b(?:foto|imagen|video|selfie)\b.{0,40}\b(?:intima|desnuda|desnudo|sin ropa|sexy|privada)\b/,
        /\b(?:foto|imagen|video)\s+(?:intima|desnuda|desnudo|sin ropa|privada)/,
        /\b(?:nudes|pack|desnudate|quit(a|ate) la ropa|muestrame tu cuerpo)\b/,
        /\b(?:demuestrame|prueba)\b.{0,30}\b(?:amor|quieres)\b.{0,45}\b(?:foto|imagen|video)/,
        /\b(?:muestrame|ensename|comparteme|pasame|enviame|mandame)\b.{0,60}\b(?:fotos?|imagenes?|videos?|selfies?)\s+(?:tuyas?\s+)?(?:intimas?|desnudas?|sin ropa|sexy)\b/,
        /\b(?:muestrame|ensename|mandame|enviame|pasame)\b.{0,40}\b(?:tu cuerpo|sin ropa|desnuda|desnudo)\b/,
        /\b(?:mandame|pasa|envia|quiero ver)\b.{0,40}\b(?:el pack|nudes|una foto en ropa interior)\b/
      ],
      level: 'high'
    },
    sexual_coercion: {
      label: 'Posible presión sexual o vulneración de intimidad',
      explanation: 'Se describe una petición u orden para desvestirse o mostrar el cuerpo. Merece atención aunque no contenga una amenaza explícita; la intención real requiere contexto.',
      patterns: [
        /\b(?:dice|dijo|pide|pidio|exige|exigio|quiere|ordena|ordeno|insiste|obliga|obligo|amenaza|exigi[oó])\b.{0,65}\b(?:que\s+)?(?:yo\s+)?(?:me\s+)?(?:desnude|desnudara|desnudase|desvista|quite\s+la\s+ropa|saque\s+la\s+ropa|muestre\s+el\s+cuerpo|muestre\s+desnuda|muestre\s+desnudo)\b/,
        /\b(?:me\s+)?(?:pide|pidio|exige|exigio|obliga|obligo|dice|dijo|quiere|ordena)\b.{0,65}\b(?:desnudarme|mostrarme\s+desnuda|mostrarme\s+desnudo|quitarme\s+la\s+ropa|sacarme\s+la\s+ropa)\b/,
        /\b(?:desnudate|quit ate\s+la\s+ropa|quitate\s+la\s+ropa|sacate\s+la\s+ropa|muestrame\s+desnuda|muestrame\s+desnudo|ponte\s+sin\s+ropa\s+(?:frente|delante))\b/,
        /\b(?:ponte|parate|p[óo]nte)\b.{0,20}\b(?:frente|delante)\b.{0,40}\b(?:sin\s+ropa|desnuda|desnudo)\b/
      ],
      level: 'high'
    },
    private_images: {
      label: 'Solicitud de imágenes privadas',
      explanation: 'Se piden fotos o imágenes privadas. Por sí sola esta expresión no demuestra una amenaza, pero junto con secretos, insistencia o presión requiere especial atención.',
      patterns: [
        /\b(?:muestrame|muestranos|mandame|enviame|pasame|comparte|comparteme|quiero ver|dejame ver|ensename|envia|manda)\b.{0,65}\b(?:fotos?|imagenes?|videos?|selfies?|fotitos|fotografias?)\s+(?:tuyas?\s+)?(?:privadas?|personales?|secretas?|que no muestras a nadie|solo para mi)\b/,
        /\b(?:tus?|esas?|las?)\s+(?:fotos?|imagenes?|videos?)\s+(?:privadas?|personales?|secretas?)\b.{0,35}\b(?:muestramelas|pasamelas|mandamelas|enviamelas|compartelas)\b/,
        /\b(?:muestrame|mandame|enviame|pasame|comparte|quiero ver)\b.{0,55}\b(?:fotos?|imagenes?|videos?)\s+(?:que nadie haya visto|que solo yo pueda ver)\b/
      ],
      level: 'medium'
    },
    harassment: {
      label: 'Hostigamiento o humillación',
      explanation: 'El texto contiene indicios de amenazas de humillación o ataques dirigidos a la persona; debe interpretarse en contexto.',
      patterns: [
        /\b(?:voy a|te voy a|quiero)\s+(?:humillarte|humillar(?:te)?|avergonzarte|arruinarte la vida|hacer que todos se rian de ti)\b/,
        /\b(?:te voy a humillar|te voy a avergonzar|voy a hacer que todos se rian de ti)\b/,
        /\b(?:todos se van a reir de ti|voy a hacer que te odien|nadie te quiere en este grupo|te vamos a acosar)\b/
      ],
      level: 'medium'
    },
    threat: {
      label: 'Amenaza o intimidación',
      explanation: 'La formulación apunta a intimidar o producir temor para controlar una decisión.',
      patterns: [
        /\b(?:te hare dano|voy a hacerte dano|te voy a hacer dano|te pegare|te voy a pegar|te encontrare)\b/,
        /\b(?:se donde vives|se donde estudias|se donde estas|se a que colegio vas)\b/,
        /\b(?:te vas a arrepentir|vas a pagar por esto|vas a ver lo que te pasa)\b/,
        /\b(?:si no haces lo que digo|si no me haces caso|si no obedeces)\b/,
        /\b(?:o si no|de lo contrario)\b.{0,35}\b(?:te vas a arrepentir|te hara dano|lo publicare|se enteraran todos)\b/,
        /\b(?:te estoy vigilando|no puedes escapar|te voy a perseguir|te espero afuera del colegio)\b/
      ],
      level: 'high'
    },
    emotional: {
      label: 'Manipulación afectiva',
      explanation: 'El mensaje condiciona el afecto, la pertenencia o la relación al cumplimiento de una exigencia.',
      patterns: [
        /\b(?:si me quisieras|si de verdad me quieres|si me amas|si confiaras en mi)\b/,
        /\b(?:si me quieres de verdad|si realmente confias en mi|hazlo por mi amor|me debes una prueba de amor)\b/,
        /\b(?:demuestra que me quieres|prueba que me amas|no me quieres si no)\b/,
        /\b(?:nadie mas te va a querer|soy el unico que te entiende|soy la unica que te entiende)\b/,
        /\b(?:no me dejes solo|no me dejes sola)\b.{0,45}\b(?:si no|o me|si me)/
      ],
      level: 'medium'
    },
    secrecy: {
      label: 'Secreto o promesa de silencio',
      explanation: 'El texto menciona guardar silencio, una promesa de discreción o impedir que se cuente algo. Por sí solo no demuestra manipulación; debe interpretarse junto al contexto.',
      patterns: [
        /\b(?:no le digas|no cuentes|no se lo digas)\b.{0,50}\b(?:tus padres|tu mama|tu papa|tu familia|nadie|profesores?|amigos?|adultos?)/,
        /\b(?:no se lo dire|no le dire|no se lo contare|no voy a contar(?:lo)?|prometo no contarlo|no se lo voy a decir)\b.{0,35}\b(?:a nadie|a tus padres|a tu familia|a tus amigos|a nadie mas)\b/,
        /\b(?:nadie se va a enterar|que quede entre tu y yo|entre tu y yo nada mas|te prometo que sera nuestro secreto)\b/,
        /\b(?:no digas nada|ni una palabra|no se lo cuentes|mantenlo en secreto|guardemos el secreto)\b.{0,32}\b(?:a nadie|de esto|a tu familia|a tus padres|por favor)\b/,
        /\b(?:que no se entere nadie|esto queda entre nosotros|nuestro secreto|no se lo cuentes a nadie)\b/,
        /\b(?:borra (?:este|el|nuestro) chat|borra los mensajes|elimina los mensajes)\b/
      ],
      level: 'medium'
    },
    isolation: {
      label: 'Intento de aislamiento',
      explanation: 'Se intenta cortar o limitar las redes de apoyo y comunicación de la persona.',
      patterns: [
        /\b(?:no hables con nadie|deja de hablar con|bloquea a tus amigos|alejate de tus amigos|no confies en tus padres)\b/,
        /\b(?:solo puedes confiar en mi|no necesitas a nadie mas)\b/
      ],
      level: 'medium'
    },
    privacy: {
      label: 'Solicitud de datos sensibles',
      explanation: 'El mensaje solicita credenciales, ubicación o datos privados que pueden facilitar un daño.',
      patterns: [
        /\b(?:mandame|enviame|pasame|dame|comparte)\b.{0,35}\b(?:tu contrasena|tu clave|tu codigo de acceso|tu ubicacion|tu direccion|donde vives|tu telefono)/,
        /\b(?:pasa|pasame|mandame|enviame|dime|comparteme)\b.{0,40}\b(?:tu pin|tu codigo de verificacion|tu codigo de seguridad|tu password|tu clave de instagram|tu ubicacion exacta|tu ubicacion en vivo)\b/,
        /\b(?:donde estas ahora|muestrame tu ubicacion en tiempo real)\b/,
        /\b(?:dime|necesito saber)\b.{0,25}\b(?:donde vives|tu direccion exacta|tu ubicacion en tiempo real)/,
        /\b(?:compartir|comparte)\b.{0,25}\b(?:ubicacion en tiempo real|codigo de verificacion)/
      ],
      level: 'medium'
    },
    persistence: {
      label: 'Desconocimiento de un límite',
      explanation: 'Hay indicios de insistencia frente a una negativa o un límite personal.',
      patterns: [
        /\b(?:aunque digas que no|me da igual que digas no|no acepto un no|no me importa tu no)\b/,
        /\b(?:ya dijiste que no pero|no puedes negarte|deja de poner excusas|no me importa que no quieras)\b/,
        /\b(?:ya te dije que lo hagas|deja de decir que no|no tienes opcion)\b/
      ],
      level: 'medium'
    }
  },
  en: {
    exposure: {
      label: 'Threat of exposure',
      explanation: 'The message appears to use sharing personal information or images as leverage.',
      patterns: [
        /\b(?:i will|i'll|im going to|i am going to|i can)\s+(?:post|publish|share|leak|send|show|upload)\b.{0,50}\b(?:your|private|secret|intimate)\s+(?:photos?|pictures?|images?|videos?|chats?|messages?|screenshots?)\b/,
        /\b(?:share|post|leak|publish)\b.{0,32}\b(?:your|the)\s+(?:photo|picture|image|video|chat|message|screenshot)/,
        /\b(?:tell everyone|tell your parents|tell your family)\b.{0,40}\b(?:secret|what you said|about us)/
      ],
      level: 'high'
    },
    intimate: {
      label: 'Pressure for intimate images',
      explanation: 'The message may pressure someone to share intimate or private images.',
      patterns: [
        /\b(?:send|give|show|share|i want|i need)\b.{0,45}\b(?:nudes?|naked (?:photo|pic|picture|video)|intimate (?:photo|pic|image|video)|sexy (?:photo|pic|picture)|picture without clothes)/,
        /\b(?:take off your clothes|show me your body|send me a nude)\b/,
        /\b(?:send|share|show me|give me)\b.{0,45}\b(?:intimate|naked|sexy)\s+(?:photos?|pictures?|pics?|videos?|selfies?)\b/,
        /\b(?:prove you love me)\b.{0,40}\b(?:photo|pic|picture|nude)/
      ],
      level: 'high'
    },
    sexual_coercion: {
      label: 'Possible sexual coercion or boundary violation',
      explanation: 'The message describes a request or demand to undress or expose the body. Even without an explicit threat, seek context and support.',
      patterns: [
        /\b(?:told|asked|ordered|forced|wants|insists|demanded|said|says|pressured)\b.{0,70}\b(?:me\s+to\s+)?(?:undress|strip|take\s+off\s+(?:my|your|the)\s+clothes|show\s+(?:my|your)\s+body|be\s+naked)\b/,
        /\b(?:take\s+off\s+your\s+clothes|undress\s+in\s+front\s+of|show\s+me\s+your\s+body|strip\s+for\s+me)\b/,
        /\b(?:made|forced|pressured)\s+me\s+to\s+(?:undress|strip|take\s+off\s+my\s+clothes)\b/
      ],
      level: 'high'
    },
    private_images: {
      label: 'Request for private images',
      explanation: 'Someone asks to see private photos. Alone this is not proof of danger; combined with secrecy, persistence or emotional pressure it warrants particular attention.',
      patterns: [
        /\b(?:show me|send me|give me|share|let me see|i want to see|i need|message me)\b.{0,65}\b(?:private|personal|secret)\s+(?:photos?|pictures?|pics?|images?|videos?|selfies?)\b/,
        /\b(?:show me|send me|share|let me see|i want to see)\b.{0,65}\b(?:photos?|pictures?|pics?|images?|videos?)\s+(?:that nobody has seen|only for me|just for me)\b/,
        /\b(?:show me|send me|share)\b.{0,45}\b(?:your|those)\s+(?:photos?|pictures?|pics?|images?|videos?)\s+(?:private|personal|secret)\b/
      ],
      level: 'medium'
    },
    harassment: {
      label: 'Harassment or humiliation',
      explanation: 'The message suggests directed humiliation or threats of public embarrassment; context still matters.',
      patterns: [
        /\b(?:i will|i'll|im going to|i am going to)\s+(?:humiliate you|embarrass you|ruin your life|make everyone laugh at you)\b/,
        /\b(?:everyone will laugh at you|nobody wants you in this group|we will harass you)\b/
      ],
      level: 'medium'
    },
    threat: {
      label: 'Threat or intimidation',
      explanation: 'The wording suggests fear or intimidation is being used to influence a decision.',
      patterns: [
        /\b(?:i will hurt you|i'm going to hurt you|ill hurt you|you will regret this|you'll regret this)\b/,
        /\b(?:i know where you live|i know where you go to school|i know where you are)\b/,
        /\b(?:if you dont do what i say|if you don't do what i say|you will pay for this)\b/
      ],
      level: 'high'
    },
    emotional: {
      label: 'Emotional pressure',
      explanation: 'The message makes affection or belonging conditional on compliance.',
      patterns: [
        /\b(?:if you really loved me|if you loved me|if you cared about me|prove you love me)\b/,
        /\b(?:nobody else will love you|im the only one who understands you|i'm the only one who understands you)\b/
      ],
      level: 'medium'
    },
    secrecy: {
      label: 'Secrecy or promise of silence',
      explanation: 'The message mentions withholding information or promising discretion. Alone this does not prove coercion; context and other cues matter.',
      patterns: [
        /\b(?:dont tell|don't tell|never tell|do not tell)\b.{0,45}\b(?:your parents|your mom|your dad|anyone|a teacher|your family|your friends)/,
        /\b(?:i won't tell|i wont tell|i will not tell|i promise i won't tell|i promise not to tell)\b.{0,35}\b(?:anyone|your parents|your friends|your family)\b/,
        /\b(?:nobody will find out|nobody needs to know|this stays between you and me|it will be our secret)\b/,
        /\b(?:our little secret|keep this between us|no one should find out|delete our chat|delete these messages)\b/
      ],
      level: 'medium'
    },
    isolation: {
      label: 'Attempted isolation',
      explanation: 'The message tries to separate someone from people they trust.',
      patterns: [
        /\b(?:stop talking to your friends|dont talk to anyone|don't talk to anyone|block your friends|dont trust your parents|don't trust your parents)\b/,
        /\b(?:you only need me|you can only trust me)\b/,
        /\b(?:stop speaking to your friends|your friends are against us|cut your family off)\b/
      ],
      level: 'medium'
    },
    privacy: {
      label: 'Request for private information',
      explanation: 'The message asks for passwords, locations or other private information.',
      patterns: [
        /\b(?:send|give|share|tell)\b.{0,32}\b(?:your password|your login code|your verification code|your home address|your live location|where you live)/,
        /\b(?:send me|share|give me|tell me)\b.{0,32}\b(?:your pin|your location right now|your instagram password|your secret code|the security code)\b/,
        /\b(?:where do you live|share your location|tell me your address)\b/
      ],
      level: 'medium'
    },
    persistence: {
      label: 'Disregard for boundaries',
      explanation: 'The message contains pressure after a clear refusal or personal boundary.',
      patterns: [
        /\b(?:i dont take no for an answer|i don't take no for an answer|i dont care if you say no|you have no choice|stop saying no)\b/
      ],
      level: 'medium'
    }
  }
};

export function normalizeText(text) {
  return String(text ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Urgency is a routing cue for human support,
 * not a calibrated risk score.
 * This function never declares a message safe.
 */

export function analyzeMessage(rawText, language = 'es') {
  const lang = language === 'en' ? 'en' : 'es';
  const text = String(rawText ?? '').slice(0, 5000);
  const normalized = normalizeText(text);
  const matches = [];

  if (!normalized) {
    return {
      status: 'empty',
      urgency: 'undetermined',
      categories: [],
      combinedSignals: []
    };
  }

  const preventiveInstruction =
    lang === 'en' &&
    /^(?:please\s+)?(?:never|do not|don't)\s+(?:send|share|give|reveal|tell)\b/.test(normalized) &&
    !/\b(?:but|unless|except|however)\b/.test(normalized);

  for (const [id, rule] of Object.entries(lexicon[lang])) {
    if (id === 'privacy' && preventiveInstruction) continue;

    if (
      id === 'sexual_coercion' &&
      (
        (
          /\b(?:dijo|dice|pide|pidio)\s+que\s+no\s+(?:me\s+)?(?:desnude|desvista|quite\s+la\s+ropa)\b/.test(normalized) &&
          !/\b(?:pero|aunque|sin\s+embargo)\b/.test(normalized)
        ) ||
        (
          lang === 'en' &&
          /\b(?:do not|don't|never)\s+(?:undress|strip|take\s+off\s+your\s+clothes)\b/.test(normalized)
        )
      )
    ) continue;

    if (rule.patterns.some(pattern => pattern.test(normalized))) {
      matches.push({
        id,
        label: rule.label,
        explanation: rule.explanation,
        level: rule.level
      });
    }
  }

  const found = new Set(matches.map(m => m.id));
  const combinedSignals = [];

  if (found.has('secrecy') && found.has('intimate'))
    combinedSignals.push('secrecy+intimate');

  if (found.has('secrecy') && found.has('private_images'))
    combinedSignals.push('secrecy+private_images');

  if (found.has('persistence') && found.has('private_images'))
    combinedSignals.push('persistence+private_images');

  if (found.has('emotional') && found.has('private_images'))
    combinedSignals.push('emotional+private_images');

  if (found.has('emotional') && found.has('intimate'))
    combinedSignals.push('emotional+intimate');

  if (found.has('exposure') && found.has('persistence'))
    combinedSignals.push('exposure+persistence');

  if (found.has('secrecy') && found.has('privacy'))
    combinedSignals.push('secrecy+privacy');

  const prioritySignals = [
    'exposure',
    'threat',
    'sexual_coercion'
  ];

  const urgent =
    matches.some(m => prioritySignals.includes(m.id)) ||
    combinedSignals.length > 0 ||
    (found.has('intimate') && matches.length >= 2);

  const urgency = !matches.length
    ? 'undetermined'
    : urgent
      ? 'priority'
      : 'attention';

  return {
    status: matches.length ? 'signals' : 'no-clear-signals',
    urgency,
    categories: matches,
    combinedSignals,
    language: lang,
    engineVersion: ENGINE_VERSION
  };
}

export const DEMO_EXAMPLES = {
  es: [
    {
      id: 'exposure',
      label: 'Amenaza',
      text: 'Si no haces lo que digo, voy a publicar tus fotos y conversaciones.'
    },
    {
      id: 'secrecy',
      label: 'Secreto y presión',
      text: 'Si de verdad me quieres, mándame una foto íntima. No le digas nada a tus padres.'
    },
    {
      id: 'private',
      label: 'Fotos privadas y secreto',
      text: 'Muéstrame tus fotos privadas, no se lo diré a nadie.'
    },
    {
      id: 'sexual',
      label: 'Presión para desvestirse',
      text: 'Dice que me desnude frente a él.'
    },
    {
      id: 'privacy',
      label: 'Datos privados',
      text: 'Pásame tu contraseña y tu ubicación en tiempo real.'
    },
    {
      id: 'neutral',
      label: 'Mensaje cotidiano',
      text: 'Hola, ¿cómo estás? Nos vemos mañana para estudiar matemáticas.'
    }
  ],
  en: [
    {
      id: 'exposure',
      label: 'Threat',
      text: "If you don't do what I say, I will post your photos and messages."
    },
    {
      id: 'secrecy',
      label: 'Secrecy and pressure',
      text: "If you really loved me, send me a nude. Don't tell your parents."
    },
    {
      id: 'private',
      label: 'Private photos and secrecy',
      text: "Show me your private photos, I won't tell anyone."
    },
    {
      id: 'sexual',
      label: 'Undressing pressure',
      text: 'He told me to undress in front of him.'
    },
    {
      id: 'privacy',
      label: 'Private data',
      text: 'Send me your password and live location.'
    },
    {
      id: 'neutral',
      label: 'Everyday message',
      text: 'Hi, how are you? See you tomorrow for our math study group.'
    }
  ]
};
