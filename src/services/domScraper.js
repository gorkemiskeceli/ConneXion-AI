/**
 * DOM Scraper Service
 * Extracts clean textual content from the page to provide live context to the AI model.
 */
export function getCleanPageText() {
  if (typeof document === 'undefined') {
    return '';
  }

  try {
    // Select main content elements containing readable text
    const selectors = ['h1', 'h2', 'h3', 'p', 'li', 'td', 'th', 'span', 'div'];
    const elements = document.querySelectorAll(selectors.join(','));
    
    let textParts = [];
    elements.forEach((el) => {
      // Skip elements belonging to the chatbot widget itself to avoid loops
      if (el.closest('.connex-widget-container') || el.closest('[class*="chatbot"]') || el.closest('[id*="chatbot"]')) {
        return;
      }
      
      // Get readable text, trim it
      const txt = el.textContent || el.innerText || '';
      const cleanTxt = txt.replace(/\s+/g, ' ').trim();
      
      // Ignore very short or empty text blocks, and style/script tags
      if (
        cleanTxt.length > 2 &&
        el.tagName !== 'SCRIPT' &&
        el.tagName !== 'STYLE' &&
        el.tagName !== 'NOSCRIPT'
      ) {
        textParts.push(cleanTxt);
      }
    });

    // Remove duplicates to reduce tokens
    const uniqueTextParts = [...new Set(textParts)];
    
    // Join and truncate to maximum 2000 characters
    const fullText = uniqueTextParts.join('\n');
    return fullText.slice(0, 2000);
  } catch (error) {
    console.error('[DOM Scraper Error]:', error);
    return '';
  }
}
