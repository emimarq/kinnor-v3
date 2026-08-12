const facts = [
    "One of the oldest known pieces of written music is over 3,400 years old — from ancient Ugarit, written in cuneiform!",
    "The treble clef started as a fancy letter 'G' — and it just got fancier over time.",
    "In medieval times, music notes were square — they literally looked like little boxes.",
    "Early music was written with no barlines or consistent rhythm — musicians just had to feel it out.",
    "The word ‘clef’ means ‘key’ in French — because it unlocks the notes on the staff.",
    "Before printing, copying music meant hours of hand-drawing every note with a quill.",
    "Bach once wrote music that could be played upside down — and it still made sense.",
    "The sharp symbol (♯) used to look like a hashtag made of squished letter Xs.",
    "In some early chant books, notes floated above the words with no lines at all — like musical ghosts.",
    "Gregorian chant didn’t use rhythm marks — singers just had to guess the pacing from experience.",
    "Common time (4/4) was once written as a broken circle — because a perfect circle meant holy ‘trinity’ time.",
    "Renaissance composers sometimes wrote music in circles or spirals just to show off.",
    "Ancient Greek music used letters and special marks above words — like musical emojis.",
    "Before modern staves, some systems used only one or two lines. Reading it was a nightmare.",
    "A single chant book could weigh over 50 pounds — they were shared by entire choirs.",
    "In the 1500s, music publishers were fined if their printed notes weren’t aligned correctly.",
    "Early piano music often didn’t separate the hands — players had to guess who played what.",
    "Before noteheads became ovals, they were diamonds.",
    "The kinnor is one of the oldest known string instruments in the world, mentioned in the Bible over 40 times.",
    "According to the Bible, King David played the kinnor to calm King Saul when he was tormented by an evil spirit.",
    "The kinnor was small and light enough to carry, which made it ideal for traveling musicians and shepherds in ancient Israel.",
    "No one knows exactly what the original kinnor looked like, but historians think it was similar to a small harp or lyre.",
    "The kinnor was likely tuned using ancient Middle Eastern scales, which sound very different from modern Western music.",
    "Ancient kinnors were usually made from wood and animal gut strings, with some possibly decorated using horns or carvings.",
    "The Hebrew word 'kinnor' is often translated as 'harp,' but many scholars believe it was closer to a lyre in shape and sound.",
    "Some sources say the kinnor had 10 strings, but other ancient writings suggest it could have had as few as 7 or as many as 22.",
    "The kinnor was used in temple worship, community celebrations, and personal prayer — it wasn’t just entertainment, it was sacred.",
    "Instead of using fingers, kinnor players often plucked the strings with a plectrum — basically an ancient version of a guitar pick.",
    "In ancient Israel, the kinnor was considered the national instrument — a cultural symbol of music, worship, and identity.",
    "Psalm 33 encourages people to praise God with the kinnor, showing how important it was in religious life.",
    "Archaeologists haven’t found a complete kinnor yet, but drawings, carvings, and biblical descriptions help reconstruct how it may have looked.",
    "The Sea of Galilee is also called *Lake Kinneret* in Hebrew, because its shape was said to resemble a kinnor.",
    "Some ancient rabbis believed that the sound of the kinnor was so pure it could reflect the soul’s deepest emotions.",
    "According to tradition, David’s kinnor would play by itself at midnight, stirred by the wind — a symbol of divine inspiration.",
    "After the destruction of the Second Temple, the kinnor slowly faded out of everyday use but remained a symbol in Jewish culture.",
    "Modern instrument makers have attempted to rebuild the kinnor using historical texts, ancient imagery, and traditional materials.",
    "The kinnor was known for its soft, peaceful sound — described in writings as calming like a gentle breeze or flowing water.",
    "Today, you can still hear kinnor-inspired instruments in some Jewish folk and sacred music, keeping its legacy alive thousands of years later.",
    "Miles Davis once turned his back to the audience during performances — not to be rude, but to focus fully on the music.",
    "Miles Davis didn’t like to rehearse — he wanted his bands to discover the music in the moment, not practice it to death.",
    "Miles Davis changed the sound of jazz five different times — most musicians are lucky to do it once.",
    "Herbie Hancock accidentally played the wrong chord behind Miles Davis during a show — and Miles made it sound intentional.",
    "Charlie Parker practiced so much that he once spent 11 hours a day working on a single lick until he could play it flawlessly.",
    "Thelonious Monk would sit silently at the piano for minutes before playing a single note — he believed silence was part of the music.",
    "John Coltrane used to write scales on the walls of his practice room — even his ceilings were covered in music.",
    "Ella Fitzgerald’s scat solos were so precise that musicians would transcribe and study them like instrumental solos.",
    "Louis Armstrong claimed he got his trumpet technique by mimicking opera singers on the radio.",
    "Duke Ellington called his orchestra his 'instrument' — he composed with individual players in mind, like a human sound palette.",
    "Bill Evans once said he could spend hours just exploring one chord — that’s how much depth he found in harmony.",
    "Sarah Vaughan had perfect pitch and could modulate keys mid-song without losing her place — like vocal jazz GPS.",
    "Art Tatum was legally blind but could play lightning-fast runs and complex chords most pianists wouldn’t even attempt.",
    "Chet Baker didn’t read music fluently — he learned most of his solos by ear and instinct.",
    "Dizzy Gillespie’s signature bent trumpet came from an accident, but he loved how it changed the sound and stuck with it forever.",
    "Sun Ra said he wasn’t just playing music — he was channeling sound from the cosmos to bring harmony to Earth.",
    "Oscar Peterson was so fast and clean on piano that even classical pianists studied his fingering for technique tips.",
    "Stan Getz learned to play tenor saxophone by copying entire solos off records — by ear, no sheet music involved.",
    "Pat Metheny used to practice 12 hours a day, saying, 'You can’t fake good tone — you have to live with it.'",
    "Elvis Presley was told to stick to truck driving after his first recording — he didn’t listen.",
    "The Beatles used to rehearse in tiny clubs for hours, sometimes playing eight sets a night just to get tighter.",
    "Paul McCartney wrote 'When I'm Sixty-Four' on his family piano when he was just a teenager.",
    "Jimi Hendrix practiced guitar so much that he slept with it — literally — in his bed.",
    "John Lennon couldn’t read sheet music — he just played what felt right.",
    "Freddie Mercury studied classical piano before ever rocking a stage — theory and glam can go hand-in-hand.",
    "Before they were famous, The Beatles failed their first audition — the label said guitar bands were 'on the way out.'",
    "Elvis practiced in church choirs before he ever picked up a guitar — gospel shaped his whole sound.",
    "Brian May of Queen built his first guitar with his dad — using parts from an old fireplace.",
    "Ringo Starr started playing drums on pots and pans because his family couldn’t afford a real kit.",
    "Listening to music you enjoy can trigger the brain to release dopamine — the same feel-good chemical linked to motivation and reward.",
    "Learning an instrument has been shown to improve memory and strengthen the brain’s ability to process language.",
    "Playing music engages both sides of the brain at once — a rare workout that boosts creativity and logic at the same time.",
    "Studies show that students who play instruments tend to score higher on math and reading tests.",
    "Making music in a group helps develop teamwork, listening skills, and social confidence.",
    "Practicing music builds discipline and patience — the same skills used in sports, study, and personal growth.",
    "Singing has been linked to reduced stress levels and even lower blood pressure — it's like a built-in emotional reset button.",
    "Learning rhythm can sharpen your internal sense of timing — helpful for everything from public speaking to sports.",
    "Musicians often show enhanced problem-solving skills because they constantly adapt, listen, and adjust while playing.",
    "Music therapy is used to help people with depression, anxiety, PTSD, and even chronic pain conditions.",
    "Learning songs by ear strengthens your auditory memory — the part of your brain that holds onto sound patterns and speech.",
    "Improvising music activates brain areas involved in decision-making and spontaneity — it literally teaches you how to think on your feet.",
    "Exposure to music at an early age can boost language development and listening comprehension in young children.",
    "Playing music regularly is linked to better emotional regulation — it helps you understand and manage feelings more clearly.",
    "Even just 15 minutes a day of focused music practice has been shown to increase focus and mental clarity over time.",
    "When you play music, your brain lights up like fireworks — it uses nearly every region at once.",
    "Musicians often have bigger and more active corpus callosums — that’s the bridge between the brain’s left and right sides.",
    "Practicing an instrument literally reshapes your brain’s wiring — like weightlifting, but for neurons.",
    "The saxophone was invented for orchestras, but it never really caught on — until jazz stole the spotlight.",
    "Drums are the oldest instrument in human history — older than writing, farming, and the wheel.",
    "The piano was once called the 'pianoforte' — because it could play soft (*piano*) and loud (*forte*), which blew minds back then.",
    "Mozart wrote music before he could write full sentences — he composed his first piece at just five years old.",
    "Jacob Collier practiced microtones as a teen by retuning his family piano with pliers — his mom was not thrilled.",
    "In traditional Balinese music, each instrument is slightly detuned on purpose — to create a shimmering sound called 'ombak'.",
    "In Indian classical music, some ragas are only meant to be played at dawn or dusk — time literally shapes the mood.",
    "In Mongolia, throat singers can produce two notes at once — one deep and one whistling — without using any instruments."
];

let shuffled = [];
let index = 0;

function shuffleFacts() {
    shuffled = [...facts];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    index = 0;
}

export function getFunFact() {
    if (index === 0 || index >= shuffled.length) shuffleFacts();
    return shuffled[index++];
}


