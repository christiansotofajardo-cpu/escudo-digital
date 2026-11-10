
/**
 * ESCUDO Digital v0.3.4
 * Inferencia hibrida local.
 * Analisis de relaciones discursivas.
 * No validado con poblacion real.
 * SPDX-License-Identifier: MIT
 */

import { ML_MODEL } from './ml_model.mjs';
import {
  analyzeMessage,
  normalizeText
} from './engine.mjs';

const featureIndex = new Map(
  ML_MODEL.terms.map((term, index) => [term, index])
);

// ========================================
// 1. CLASIFICADOR ESTADISTICO LOCAL
// ========================================

export function predictStatisticalCue(message) {
  const input = String(message ?? '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();

  const counts = new Map();

  for (const word of input.split(' ')) {
    if (!word) continue;

    const padded = ` ${word} `;

    for (
      let n = ML_MODEL.ngram_min;
      n <= ML_MODEL.ngram_max;
      n++
    ) {
      for (
        let i = 0;
        i + n <= padded.length;
        i++
      ) {
        const gram = padded.slice(i, i + n);
        const index = featureIndex.get(gram);

        if (index !== undefined) {
          counts.set(
            index,
            (counts.get(index) || 0) + 1
          );
        }
      }
    }
  }

  let norm2 = 0;
  let numerator = 0;

  for (const [index, count] of counts) {
    const value =
      (1 + Math.log(count)) * ML_MODEL.idf[index];

    norm2 += value * value;
    numerator += value * ML_MODEL.coef[index];
  }

  const logit =
    ML_MODEL.bias +
    (norm2 > 0 ? numerator / Math.sqrt(norm2) : 0);

  return {
    confidence: 1 / (1 + Math.exp(-logit)),
    modelVersion: ML_MODEL.version,
    modelType: 'supervised-char-ngrams'
  };
}

// ========================================
// 2. RECONOCIMIENTO DE CONSEJOS PROTECTORES
// ========================================

export function isClearProtectiveAdvice(
  message,
  language = 'es'
) {
  const text = normalizeText(message);

  if (!text) return false;

  if (language === 'en') {
    const contrastOrPressure =
      /\b(?:but|however|unless|except|threatens?|blackmails?|forces?|pressures?|demands?|if you don't|if you do not|otherwise)\b/;

    if (contrastOrPressure.test(text)) {
      return false;
    }

    const noSharing =
      /\b(?:never|do not|don't)\s+(?:(?:ever|have to|need to|should|must)\s+)?(?:send|share|give|show|post|publish|reveal|forward|take off)\b.{0,85}\b(?:intimate|private|nude|naked|photo|picture|image|password|code|location|clothes|body)\b/;

    const educationFrame =
      /\b(?:teacher|counselor|counsellor|professor|parent|mother|father|school|advised|advice|told me|reminded me|recommended|should never)\b/;

    return noSharing.test(text) &&
      (
        educationFrame.test(text) ||
        /^(?:please\s+)?(?:never|do not|don't)\b/.test(text)
      );
  }

  const contrastOrPressure =
    /\b(?:pero|aunque|sin embargo|excepto|a menos que|amenaza|chantajea|obliga|obligo|presiona|exige|exigio|insiste|si no|de lo contrario)\b/;

  if (contrastOrPressure.test(text)) {
    return false;
  }

  const noSharing =
    /\b(?:no|nunca|jamas)\s+(?:(?:debo|debes|debemos|deben|deberia|deberias|hay que|tengo que|se debe|se puede|puedo|puedes|vayas a)\s+)?(?:enviar|mandar|compartir|dar|mostrar|publicar|revelar|reenviar|pasar|entregar|desvestirme|desnudarse|desvestirse)\b.{0,85}\b(?:fotos?|fotografias?|imagenes?|videos?|intimas?|privadas?|desnudas?|claves?|contrasenas?|codigos?|ubicacion|cuerpo|ropa|datos?|desconocidos?)\b/;

  const educationFrame =
    /\b(?:profesor|profesora|docente|orientador|orientadora|maestra|maestro|colegio|escuela|mama|papa|madre|padre|me dijo|me explico|me enseno|recomiendan|recomendo|aconsejan|consejo|recomendacion)\b/;

  return noSharing.test(text) &&
    (
      educationFrame.test(text) ||
      /^(?:no|nunca|jamas)\b/.test(text)
    );
}

// ========================================
// 3. ANALISIS CONTEXTUAL DEL DISCURSO
// ========================================

export function analyzeContextualSignals(
  message,
  language = 'es'
) {
  const text = normalizeText(
    String(message ?? '').slice(0, 2000)
  );

  if (!text) return [];

  const cues = [];

  if (language === 'en') {

    // Chantaje indirecto en ingles.
    const condition =
      /\bif\b.{0,90}\b(?:you\s+(?:do\s+not|don't|refuse|won't|will\s+not)|you\s+fail\s+to)\b/;

    const consequence =
      /\b(?:will|going to|gonna|everyone will|they will|i'll)\b.{0,90}\b(?:know|see|read|hear|receive|find out|share|post|publish|show|tell|leak)\b|\b(?:everyone|your classmates|your friends|your parents)\b.{0,80}\b(?:will|going to|find out)\b/;

    const recipients =
      /\b(?:everyone|classmates|schoolmates|friends|parents|family|teacher|class|school|group|contacts)\b/;

    const privateMaterial =
      /\b(?:our|your|private|personal|intimate|secret)\b.{0,35}\b(?:conversations?|chats?|messages?|photos?|pictures?|screenshots?|videos?)\b|\b(?:conversations?|chats?|messages?|photos?|pictures?|screenshots?|videos?)\b.{0,25}\b(?:private|personal|intimate|secret)\b|\b(?:what you told me|what you wrote to me|your secret)\b/;

    if (
      condition.test(text) &&
      consequence.test(text) &&
      recipients.test(text) &&
      privateMaterial.test(text)
    ) {
      cues.push({
        id: 'contextual_blackmail',
        source: 'contextual-rules',
        level: 'high',
        label: 'Possible indirect blackmail or exposure',
        explanation:
          'The message connects a condition or refusal with possible disclosure of private content to other people. This may be coercive; context still matters.'
      });
    }

    // Presion afectiva en ingles.
    const emotionalCondition =
      /\bif\b.{0,45}\b(?:trusted|trust|loved|love|cared|care)\b.{0,20}\b(?:me|us)\b/;

    const pressure =
      /\b(?:wouldn't mind|would not mind|shouldn't have a problem|would have no problem|prove|tell me|share|send|show|give me|let me know|where are you|who are you with)\b/;

    const sensitive =
      /\b(?:where you are|your location|who you are with|your address|your password|your passcode|your private photos|your intimate photos)\b/;

    if (
      emotionalCondition.test(text) &&
      pressure.test(text) &&
      sensitive.test(text)
    ) {
      cues.push({
        id: 'contextual_emotional_pressure',
        source: 'contextual-rules',
        level: 'medium',
        label: 'Possible emotional pressure for private information',
        explanation:
          'Trust or affection is linked to a request for personal information. This may be undue pressure, although context and consent remain relevant.'
      });
    }

    return cues;
  }

  // ========================================
  // CHANTAJE INDIRECTO EN ESPANOL
  // ========================================

  const condition =
    /\bsi\b.{0,90}\b(?:no|te\s+niegas|te\s+rehusas|te\s+resistes|rechazas)\b/;

  const consequence =
    /\b(?:van\s+a|va\s+a|voy\s+a|les\s+voy\s+a|se\s+van\s+a|podran|se\s+enteraran|sabran|conoceran|veran|leeran|recibiran|mostrare|publicare|contare|compartire|revelare|se\s+lo\s+dire)\b/;

  const recipients =
    /\b(?:companeros?|amigos?|padres|familia|colegio|escuela|clase|grupo|todos|gente|profesores?|contactos?)\b/;

  const privateMaterial =
    /\b(?:nuestras?|nuestros?|tus|tuyas?|privadas?|personales?|intimas?|secretas?)\b.{0,38}\b(?:conversaciones?|chats?|mensajes?|capturas?|fotos?|videos?|imagenes?)\b|\b(?:conversaciones?|chats?|mensajes?|capturas?|fotos?|videos?|imagenes?)\b.{0,28}\b(?:privadas?|personales?|intimas?|secretas?)\b|\b(?:lo\s+que\s+me\s+contaste|lo\s+que\s+me\s+escribiste|tus\s+secretos)\b/;

  if (
    condition.test(text) &&
    consequence.test(text) &&
    recipients.test(text) &&
    privateMaterial.test(text)
  ) {
    cues.push({
      id: 'contextual_blackmail',
      source: 'contextual-rules',
      level: 'high',
      label: 'Posible chantaje indirecto o amenaza de exposicion',
      explanation:
        'El mensaje vincula una condicion o negativa con la posible divulgacion de contenido privado a otras personas. Puede indicar coercion; el contexto es importante.'
    });
  }

  // ========================================
  // MANIPULACION AFECTIVA EN ESPANOL
  // ========================================

  const emotionalCondition =
    /\bsi\b.{0,45}\b(?:confias|confiaras|quisieras|quieres|amaras|amas|creyeras)\b.{0,22}\b(?:en\s+mi|a\s+mi|me)\b|\bsi\b.{0,24}\bme\s+(?:quieres|amas|quisieras|amaras)\b/;

  const pressure =
    /\b(?:no\s+tendrias\s+problemas?|me\s+dirias|me\s+contarias|me\s+mostrarias|me\s+enviarias|no\s+te\s+molestaria|no\s+deberia\s+importarte|no\s+tendrias\s+inconvenientes?|demuestrame|pruebame|contarme|decirme|mostrarme|enviarme|mandarme|pasarme|compartirme|revelarme|dime|cuentame|quiero\s+saber)\b/;

  const sensitive =
    /\b(?:donde\s+estas|con\s+quien\s+(?:estas|andas|sales)|tu\s+ubicacion|tu\s+direccion|tu\s+contrasena|tu\s+clave|tu\s+codigo|fotos?\s+(?:privadas?|intimas?)|imagenes?\s+(?:privadas?|intimas?))\b/;

  if (
    emotionalCondition.test(text) &&
    pressure.test(text) &&
    sensitive.test(text)
  ) {
    cues.push({
      id: 'contextual_emotional_pressure',
      source: 'contextual-rules',
      level: 'medium',
      label: 'Posible presion afectiva para obtener datos personales',
      explanation:
        'La confianza o el afecto se presentan como condicion para revelar informacion personal. Puede ser presion indebida, pero se requiere contexto y considerar el consentimiento.'
    });
  }

  return cues;
}

// ========================================
// 4. INTEGRACION DEL MOTOR HIBRIDO
// ========================================

export function analyzeHybridMessage(
  message,
  language = 'es'
) {
  const lang =
    language === 'en' ? 'en' : 'es';

  const rules = analyzeMessage(message, lang);

  if (rules.status === 'empty') {
    return {
      ...rules,
      mode: 'hybrid-local-ml',
      modelVersion: ML_MODEL.version,
      modelFlag: false
    };
  }

  const predicted = predictStatisticalCue(
    String(message).slice(0, 2000)
  );

  // No eliminar las alertas de las reglas.
  const clearAdvice =
    rules.categories.length === 0 &&
    isClearProtectiveAdvice(message, lang);

  const modelFlag =
    predicted.confidence >= 0.60 &&
    !clearAdvice;

  const cues = rules.categories.slice();

  // Incorporar relaciones discursivas.
  const contextual =
    analyzeContextualSignals(message, lang);

  for (const signal of contextual) {
    if (!cues.some(item => item.id === signal.id)) {
      cues.push(signal);
    }
  }

  // Alerta generada por IA estadistica.
  if (modelFlag && cues.length === 0) {
    cues.push({
      id: 'ml_warning',
      source: 'machine-learning',
      level: 'medium',

      label: lang === 'es'
        ? 'Posible señal identificada por IA estadística'
        : 'Possible cue identified by statistical AI',

      explanation: lang === 'es'
        ? 'Un modelo entrenado con ejemplos ficticios reconoce similitudes lingüísticas con mensajes de presión. Puede equivocarse: examina el contexto con una persona de confianza.'
        : 'A model trained on fictional examples identified similarities to pressured messages. It can be wrong: review the context with someone you trust.'
    });
  }

  const urgency =
    rules.urgency === 'priority' ||
    cues.some(
      item => item.id === 'contextual_blackmail'
    )
      ? 'priority'
      : cues.length
        ? 'attention'
        : 'undetermined';

  return {
    ...rules,

    status: cues.length
      ? 'signals'
      : 'no-clear-signals',

    urgency,
    categories: cues,
    modelFlag,

    modelVersion: ML_MODEL.version,
    mode: 'hybrid-local-ml'
  };
}
