export type RankingEntry = {
  id: string;
  name: string;
  score: number;
  date: string;
};

export async function getRanking(difficulty: string): Promise<RankingEntry[]> {
  try {
    const response = await fetch(`/api/ranking/${difficulty}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (e) {
    console.error('Failed to load ranking from server:', e);
    return [];
  }
}

export async function addRanking(name: string, score: number, difficulty: string): Promise<RankingEntry[]> {
  try {
    const response = await fetch(`/api/ranking/${difficulty}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, score }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (e) {
    console.error('Failed to save ranking to server:', e);
    return [];
  }
}


