const { analyzeText } = require('../services/openaiService')
/**
 * Takes document text, sends to OpenAI API, returns structured JSON with: 
 * Summary, Key Clauses, Risks/Compliance Flags 
 * 
 */
exports.analyzeDocument=async(req, res) => {
    try {
        const {text}=req.body; 
        // Input validation 
        if (!text || text.length>10000){
            return res.status(400).json({message: 'Invalid or too long input.'
            });
        }
        // Call OpenAI service 
        const aiRawOutput=await analyzeTest(text); 
        // Parse OpenAI output into structured JSON
        const parsedOutput=parseAIResponse(aiRawOutput); 
        // Return structured response 
        res.json(parsedOutput); 
    } catch (err){
        console.error('AI Analysis Error:', err.message); 
        res.status(500).json({message: 'AI analysis failed', error: err.message}); 
    }
}; 
/**
 * 
 * Helper function too parse AI response into structured output
 * Assumes GPT 4 output has clear headings: Summary, Key Cluases, Risks
 */
function parseAIResponse(rawText){
    const sections={
        summary: '', 
        key_clauses: [],
        risks: []
    }; 

    const lines=rawText.split('\n');
    let currentSection=''; 
    lines.forEach(line=> {
        const lowerLine=line.toLowerCase(); 
        if (lowerLine.includes('summary')) currentSelection='summary'; 
        else if (lowerLine.includes('key clauses')) currentSection='key_clauses'; 
        else if (lowerLineLine.includes('risks') || lowerLine.includes('compliance')) currentSection='risks'; 
        else {
            if (currentSection=='summary') sections.summary+=line.trim() + ' ';
            else if (currentSection=='key_clauses' && line.trim() != '') sections.key_clauses.push(line.trim()); 
            else if (currentSection == 'risks' && line.trim() != '') sections.risks.push(line.trim()); 
        }
    }); 
    // cleanup 
    sections.summary.trim(); 
    return sections; 
}