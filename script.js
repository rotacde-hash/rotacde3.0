
const fs = require("fs");

function processFile(filePath) {
    let content = fs.readFileSync(filePath, "utf8");
    
    const reps = [
        ["hero_subtitle: \"Seu transfer entre Foz do Iguaçu e Ciudad del Este para o WRC 2026.\"", "hero_subtitle: \"Seu transfer entre Foz do Iguaçu e Encarnación para o WRC 2026.\""],
        ["A Rota CDE conecta você a Ciudad del Este com transporte organizado", "A Rota CDE conecta você a Encarnación com transporte organizado"],
        ["oferece transporte entre Foz do Iguaçu e Ciudad del Este para facilitar", "oferece transporte entre Foz do Iguaçu e Encarnación para facilitar"],
        ["card2_title: \"Foz ⇄ Ciudad del Este\"", "card2_title: \"Foz ⇄ Encarnación\""],
        ["step3_desc: \"A Rota CDE realiza o transporte até Ciudad del Este.\"", "step3_desc: \"A Rota CDE realiza o transporte até Encarnación.\""],
        ["com destino direto a Ciudad del Este.\"", "com destino direto a Encarnación.\""],
        ["deslocamento entre Foz do Iguaçu e Ciudad del Este. Cada passageiro", "deslocamento entre Foz do Iguaçu e Encarnación. Cada passageiro"],
        
        ["hero_subtitle: \"Su traslado entre Foz do Iguaçu y Ciudad del Este", "hero_subtitle: \"Su traslado entre Foz do Iguaçu y Encarnación"],
        ["Rota CDE lo conecta con Ciudad del Este con", "Rota CDE lo conecta con Encarnación con"],
        ["ofrece transporte entre Foz do Iguaçu y Ciudad del Este para", "ofrece transporte entre Foz do Iguaçu y Encarnación para"],
        ["step3_desc: \"Rota CDE realiza el transporte hasta Ciudad del Este.\"", "step3_desc: \"Rota CDE realiza el transporte hasta Encarnación.\""],
        ["traslado entre Foz do Iguaçu y Ciudad del Este. Cada", "traslado entre Foz do Iguaçu y Encarnación. Cada"],
        
        ["between Foz do Iguaçu and Ciudad del Este for WRC", "between Foz do Iguaçu and Encarnación for WRC"],
        ["connects you to Ciudad del Este with organized", "connects you to Encarnación with organized"],
        ["transportation between Foz do Iguaçu and Ciudad del Este to make", "transportation between Foz do Iguaçu and Encarnación to make"],
        ["transfer straight to Ciudad del Este.\"", "transfer straight to Encarnación.\""],
        ["direct drop-off in Ciudad del Este.\"", "direct drop-off in Encarnación.\""],
        ["travel between Foz do Iguaçu and Ciudad del Este. All", "travel between Foz do Iguaçu and Encarnación. All"]
    ];
    
    for (let [oldText, newText] of reps) {
        content = content.replace(oldText, newText);
    }
    
    fs.writeFileSync(filePath, content, "utf8");
}

processFile("wrc-2026-paraguay.html");
processFile("rotacde3.0/wrc-2026-paraguay.html");
console.log("Done");

