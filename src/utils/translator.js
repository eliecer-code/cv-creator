export const translateText = async (text, targetLang) => {
  if (!text || !text.trim()) return text;
  
  const sourceLang = targetLang === 'en' ? 'es' : 'en';
  
  try {
    const response = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`
    );
    
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    
    // The response is an array where the first element is an array of translated sentences
    if (data && data[0]) {
      return data[0].map(sentence => sentence[0]).join('');
    }
    
    return text;
  } catch (error) {
    console.error("Translation error:", error);
    alert("Error al traducir el texto automáticamente. Es posible que el servicio gratuito haya alcanzado su límite.");
    return text; // Return original if failed
  }
};
