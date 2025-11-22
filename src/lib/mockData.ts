export interface Hotspot {
    x: number; // Percentage 0-100
    y: number; // Percentage 0-100
    label: string;
}

export interface Question {
    id: string;
    type: 'text' | 'image_verification';
    text: string;
    imageUrl?: string;
    hotspots?: Hotspot[];
    options: string[];
    correctAnswer: number; // Index. For image_verification: 0 = Real, 1 = AI (usually)
    explanation: string;
}

export interface Quiz {
    id: string;
    title: string;
    description: string;
    xpReward: number;
    questions: Question[];
    completed: boolean;
    locked: boolean;

    // Saga Map Fields
    is_milestone?: boolean;
    is_special_mission?: boolean;
    xp_multiplier?: number;
    badge_reward_id?: string;
}

export const MOCK_QUIZZES: Quiz[] = [
    // Tier 1: The Newbie
    {
        id: '1',
        title: 'Modulo 1: Basi IA & Miti',
        description: 'Capisci cos\'è davvero l\'IA e sfata i miti della fantascienza.',
        xpReward: 50,
        completed: false,
        locked: false,
        questions: [
            {
                id: 'm1q1',
                type: 'text',
                text: 'Cos\'è l\'"Intelligenza Artificiale" (IA) in parole semplici?',
                options: [
                    'Un robot che prova emozioni',
                    'Sistemi informatici che imparano e risolvono problemi',
                    'Magia dentro un microchip',
                    'Un cervello coltivato in laboratorio'
                ],
                correctAnswer: 1,
                explanation: 'L\'IA è semplicemente un software che impara dai dati per svolgere compiti che richiedono intelligenza umana, come riconoscere schemi.'
            },
            {
                id: 'm1q2',
                type: 'text',
                text: 'Vero o Falso: L\'IA può "pensare" e avere sentimenti come gli umani.',
                options: [
                    'Vero, sono coscienti',
                    'Falso, elaborano solo dati e matematica'
                ],
                correctAnswer: 1,
                explanation: 'L\'IA non ha sentimenti o coscienza. Elabora enormi quantità di dati per prevedere risultati, ma non "sa" cosa sta facendo.'
            },
            {
                id: 'm1q3',
                type: 'text',
                text: 'Quale di questi è un MITO comune sull\'IA?',
                options: [
                    'L\'IA può scrivere poesie',
                    'L\'IA può battere gli umani a scacchi',
                    'L\'IA conquisterà il mondo domani',
                    'L\'IA aiuta i medici nelle diagnosi'
                ],
                correctAnswer: 2,
                explanation: 'L\'idea che l\'IA "prenda il sopravvento" è un cliché da film. L\'IA attuale è uno strumento controllato dagli umani, con limiti precisi.'
            },
            {
                id: 'm1q4',
                type: 'text',
                text: 'Cos\'è un "Deepfake"?',
                options: [
                    'Una creatura degli abissi',
                    'Media generati da IA che sostituiscono il volto o la voce di una persona',
                    'Un account falso sui social',
                    'Un tipo di virus informatico'
                ],
                correctAnswer: 1,
                explanation: 'I Deepfake usano l\'IA per manipolare video e audio, facendo dire o fare alle persone cose che non hanno mai fatto.'
            },
            {
                id: 'm1q5',
                type: 'text',
                text: 'Perché è importante riconoscere i contenuti generati da IA?',
                options: [
                    'Per vincere ai quiz',
                    'Per evitare di essere ingannati da truffe o disinformazione',
                    'Perché l\'arte IA è brutta',
                    'Non è importante'
                ],
                correctAnswer: 1,
                explanation: 'I truffatori usano l\'IA per creare fake news e false identità. Riconoscerla ti protegge dalla manipolazione.'
            }
        ]
    },
    {
        id: '2',
        title: 'Missione Speciale: Password Compromessa!',
        description: 'Sfida ad alto rischio! La tua password potrebbe essere stata rubata.',
        xpReward: 100,
        completed: false,
        locked: true,
        is_special_mission: true,
        xp_multiplier: 2,
        questions: [
            {
                id: 'sm1q1',
                type: 'text',
                text: 'Ricevi una notifica: "Password trovata in una violazione dati". Qual è il PRIMO passo?',
                options: [
                    'Ignorala, probabilmente è falsa',
                    'Cambia immediatamente la password sul sito colpito',
                    'Elimina il tuo account',
                    'Scrivi all\'hacker'
                ],
                correctAnswer: 1,
                explanation: 'Agisci subito. Cambia la password su quel sito e su qualsiasi altro dove usavi la stessa.'
            },
            {
                id: 'sm1q2',
                type: 'text',
                text: 'Cosa rende una password "Forte"?',
                options: [
                    'Il nome del tuo animale domestico',
                    '123456',
                    'Un mix di lettere, numeri e simboli, lunga almeno 12 caratteri',
                    'La tua data di nascita'
                ],
                correctAnswer: 2,
                explanation: 'Lunghezza e complessità sono fondamentali. Usa un password manager per generare password uniche e complesse.'
            }
        ]
    },
    {
        id: '3',
        title: 'Traguardo: Configura 2FA',
        description: 'Proteggi il tuo account con l\'Autenticazione a Due Fattori.',
        xpReward: 150,
        completed: false,
        locked: true,
        is_milestone: true,
        badge_reward_id: 'shield_bearer',
        questions: [
            {
                id: 'ms1q1',
                type: 'text',
                text: 'Cos\'è la 2FA (Autenticazione a Due Fattori)?',
                options: [
                    'Accedere due volte',
                    'Un secondo livello di sicurezza, come un codice inviato al telefono',
                    'Due persone che usano un account',
                    'Una password di riserva'
                ],
                correctAnswer: 1,
                explanation: 'La 2FA aggiunge un secondo passaggio per verificare la tua identità, rendendo molto più difficile per gli hacker accedere al tuo account.'
            }
        ]
    },
    // Tier 2: The Social Surfer
    {
        id: '4',
        title: 'Modulo 2: Rilevatore di Truffe',
        description: 'Impara a riconoscere il Phishing e la "Truffa dei Nonni".',
        xpReward: 75,
        completed: false,
        locked: true,
        questions: [
            {
                id: 'm2q1',
                type: 'text',
                text: 'Ricevi un\'email da "Netf1ix" che dice che il tuo account è sospeso. Cosa fai?',
                options: [
                    'Clicchi subito sul link per risolvere',
                    'Rispondi con la tua password',
                    'Controlli attentamente l\'indirizzo email del mittente',
                    'Vai nel panico e chiami la polizia'
                ],
                correctAnswer: 2,
                explanation: 'Le email di phishing usano spesso piccoli errori (come "Netf1ix"). Verifica sempre il vero indirizzo del mittente prima di cliccare.'
            },
            {
                id: 'm2q2',
                type: 'text',
                text: 'Cos\'è la "Truffa dei Nonni"?',
                options: [
                    'Truffatori che rubano nelle case di riposo',
                    'Un truffatore usa l\'IA per clonare la voce di un nipote in difficoltà',
                    'Vendere dentiere false',
                    'Una carta sconto per anziani'
                ],
                correctAnswer: 1,
                explanation: 'I truffatori usano brevi audio dai social per clonare una voce, poi chiamano i parenti fingendo di essere in ospedale e chiedendo soldi.'
            },
            {
                id: 'm2q3',
                type: 'text',
                text: 'Se un "parente" chiama chiedendo soldi via Gift Card o Bitcoin, è probabilmente:',
                options: [
                    'Un\'emergenza generica',
                    'Una truffa',
                    'Un modo comodo per pagare',
                    'Un errore bancario'
                ],
                correctAnswer: 1,
                explanation: 'Le vere emergenze non richiedono mai pagamenti non tracciabili come Gift Card o Criptovalute. È un enorme campanello d\'allarme.'
            },
            {
                id: 'm2q4',
                type: 'text',
                text: 'Come puoi verificare se una richiesta di aiuto è reale?',
                options: [
                    'Manda i soldi per sicurezza',
                    'Riaggancia e richiama la persona sul suo numero conosciuto',
                    'Fai una domanda segreta che solo lei conoscerebbe',
                    'Sia B che C'
                ],
                correctAnswer: 3,
                explanation: 'Verifica sempre. Riaggancia e chiama il vero numero. Avere una "parola d\'ordine" familiare può smascherare l\'IA.'
            },
            {
                id: 'm2q5',
                type: 'text',
                text: 'Cos\'è il "Voice Cloning"?',
                options: [
                    'Cantare sotto la doccia',
                    'Usare l\'IA per imitare la voce di una persona specifica',
                    'Registrare un memo vocale',
                    'Parlare con un accento'
                ],
                correctAnswer: 1,
                explanation: 'Gli strumenti IA possono analizzare pochi secondi di audio per generare una voce sintetica quasi identica a quella originale.'
            }
        ]
    },
    // Tier 3: The Pro Shopper
    {
        id: '5',
        title: 'Modulo 3: Caccia al Deepfake',
        description: 'Allena i tuoi occhi a notare i difetti visivi nelle immagini IA.',
        xpReward: 100,
        completed: false,
        locked: true,
        questions: [
            {
                id: 'm3q1',
                type: 'image_verification',
                text: 'Questa immagine è Reale o IA?',
                imageUrl: 'https://placehold.co/600x400/png?text=AI+Hand+Glitch',
                options: ['Reale', 'IA'],
                correctAnswer: 1,
                hotspots: [
                    { x: 50, y: 50, label: 'Guarda le dita. L\'IA spesso sbaglia le mani, creando dita in più o distorte.' }
                ],
                explanation: 'I modelli IA faticano con l\'anatomia complessa come le mani. Cerca dita extra o articolazioni "fuse".'
            },
            {
                id: 'm3q2',
                type: 'image_verification',
                text: 'Foto reale o generazione IA?',
                imageUrl: 'https://placehold.co/600x400/png?text=Blurry+Background+Text',
                options: ['Reale', 'IA'],
                correctAnswer: 1,
                hotspots: [
                    { x: 20, y: 30, label: 'Il testo sul cartello è incomprensibile.' },
                    { x: 80, y: 20, label: 'I volti sullo sfondo sono distorti.' }
                ],
                explanation: 'L\'IA fatica con il testo e i dettagli dello sfondo. Se il testo sembra una lingua aliena, è probabilmente IA.'
            },
            {
                id: 'm3q3',
                type: 'image_verification',
                text: 'Riesci a trovare il falso?',
                imageUrl: 'https://placehold.co/600x400/png?text=Perfect+Skin+Texture',
                options: ['Reale', 'IA'],
                correctAnswer: 1,
                hotspots: [
                    { x: 50, y: 40, label: 'La texture della pelle è troppo liscia, come plastica.' }
                ],
                explanation: 'L\'IA crea spesso pelle "perfetta" senza pori o imperfezioni naturali, dando un aspetto plastico.'
            },
            {
                id: 'm3q4',
                type: 'image_verification',
                text: 'Questa persona è reale?',
                imageUrl: 'https://placehold.co/600x400/png?text=Mismatched+Earrings',
                options: ['Reale', 'IA'],
                correctAnswer: 1,
                hotspots: [
                    { x: 30, y: 40, label: 'L\'orecchino sinistro non corrisponde al destro.' }
                ],
                explanation: 'L\'IA spesso manca di simmetria. Controlla accessori spaiati, orecchini o montature degli occhiali.'
            },
            {
                id: 'm3q5',
                type: 'image_verification',
                text: 'Reale o IA?',
                imageUrl: 'https://placehold.co/600x400/png?text=Real+Photo',
                options: ['Reale', 'IA'],
                correctAnswer: 0,
                hotspots: [],
                explanation: 'Questa è una foto reale! L\'illuminazione è coerente, le mani sono naturali e i dettagli dello sfondo hanno senso.'
            }
        ]
    }
];
