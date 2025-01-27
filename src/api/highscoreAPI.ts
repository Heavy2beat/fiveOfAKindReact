export type Score = {
  name: string;
  points: number;
};

const highscoreURL = "https://fiveofhighscores.duckdns.org/highscores/";

export async function getAllHighscores(): Promise<Score[]> {
    try {
        const response = await fetch(highscoreURL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: Score[] = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

export async function sendScore(score: Score): Promise<void> {
    try {
        const response = await fetch(highscoreURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(score)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Score sent successfully:', data);
    } catch (error) {
        console.error('Error:', error);
    }
}