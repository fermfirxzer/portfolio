fetch('http://localhost:3002').then(r=>r.text()).then(html => {
  const cssUrlMatch = html.match(/href=\"([^\"]+\.css)[^\"]*\"/);
  if (!cssUrlMatch) {
    console.log("No CSS URL found in HTML:", html.substring(0, 500));
    return;
  }
  const cssUrl = cssUrlMatch[1];
  console.log("Fetching CSS:", cssUrl);
  return fetch('http://localhost:3002' + cssUrl).then(r=>r.text()).then(css => {
    console.log("Contains text-[10px]:", css.includes('text-[10px]'));
    console.log("Contains shadow-[4px]:", css.includes('shadow-[4px'));
  });
}).catch(console.error);
