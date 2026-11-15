const fs = require('fs');

const html = fs.readFileSync('graza_home.html', 'utf8');

const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
if (headMatch) {
  const head = headMatch[1];
  console.log('Head length:', head.length);
  // List all meta, title, link, style tags in head
  const tags = head.match(/<([a-z0-9-]+)[^>]*>/gi) || [];
  console.log('Head tags summary:');
  const tagCounts = {};
  tags.forEach(t => {
    const name = t.match(/<([a-z0-9-]+)/i)[1];
    tagCounts[name] = (tagCounts[name] || 0) + 1;
  });
  console.log(tagCounts);

  // Print inline styles in head
  const styles = head.match(/<style[^>]*>[\s\S]*?<\/style>/gi) || [];
  console.log('Inline styles in head count:', styles.length);
  styles.forEach((s, i) => console.log(`Style #${i}: ${s.substring(0, 150)}... length: ${s.length}`));
}
