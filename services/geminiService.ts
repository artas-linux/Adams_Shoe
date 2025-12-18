
/**
 * Simulated Shoe Concept Generator
 * Replaces live Gemini API for keyless deployment on GitHub Pages
 */

const MOCK_CONCEPTS = [
  "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1597043530274-080c98f80479?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1582588673383-2806c49c5822?auto=format&fit=crop&q=80&w=1200"
];

export async function generateShoeConcept(prompt: string): Promise<string | null> {
  // Simulate network latency and AI processing time
  await new Promise(resolve => setTimeout(resolve, 2500));
  
  try {
    // Return a random high-quality concept image
    const randomIndex = Math.floor(Math.random() * MOCK_CONCEPTS.length);
    return MOCK_CONCEPTS[randomIndex];
  } catch (error) {
    console.error("Simulation error:", error);
    return null;
  }
}
