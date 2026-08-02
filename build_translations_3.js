const fs = require('fs');
const db = JSON.parse(fs.readFileSync('db_dump.json', 'utf8'));

const esc = (str) => {
  if (!str) return 'NULL';
  return "'" + str.replace(/'/g, "''") + "'";
};

let sql = `\n\n`;

// 9. Members
sql += `-- Members\n`;
db.members.forEach(row => {
  let r_fr = row.role;
  let r_en = row.role;
  // Translate role from French to English
  if (r_fr === "Président fondateur") r_en = "Founding President";
  else if (r_fr === "Président") r_en = "President";
  else if (r_fr === "Président adjoint") r_en = "Vice President";
  else if (r_fr === "Trésorier") r_en = "Treasurer";
  else if (r_fr === "Trésorier adjoint") r_en = "Deputy Treasurer";
  else if (r_fr === "Secrétaire Général") r_en = "General Secretary";
  else if (r_fr === "Secrétaire adjoint") r_en = "Deputy Secretary";
  else if (r_fr === "Expert en art contemporain") r_en = "Contemporary Art Expert";
  else if (r_fr === "Miss Maroc année 2015") r_en = "Miss Morocco 2015";
  else if (r_fr === "Infirmière de secteur psychiatrique et animatrice de théâtre") r_en = "Psychiatric Nurse and Theater Animator";
  
  sql += `UPDATE public.members SET name_fr = ${esc(row.name)}, name_en = ${esc(row.name)}, role_fr = ${esc(r_fr)}, role_en = ${esc(r_en)} WHERE id = ${esc(row.id)};\n`;
});

// 10. Partners
sql += `\n-- Partners\n`;
db.partners.forEach(row => {
  let name_fr = row.name;
  let name_en = row.name;
  if (name_fr === "المبادرة الوطنية للتنمية البشرية") {
    name_fr = "Initiative Nationale pour le Développement Humain";
    name_en = "National Initiative for Human Development";
  } else if (name_fr === "وزارة التضامن والإدماج") {
    name_fr = "Ministère de la Solidarité et de l'Intégration";
    name_en = "Ministry of Solidarity and Integration";
  } else if (name_fr === "مجلس إقليم الصويرة") {
    name_fr = "Conseil Provincial d'Essaouira";
    name_en = "Essaouira Provincial Council";
  } else if (name_fr === "المديرية الإقليمية للصحة") {
    name_fr = "Direction Provinciale de la Santé";
    name_en = "Provincial Health Directorate";
  } else if (name_fr === "أكاديمية التربية والتكوين") {
    name_fr = "Académie de l'Éducation et de la Formation";
    name_en = "Academy of Education and Training";
  } else if (name_fr === "التعاون الوطني") {
    name_fr = "Entraide Nationale";
    name_en = "National Cooperation";
  } else if (name_fr === "محسنين وشركات محلية") {
    name_fr = "Bienfaiteurs et Entreprises Locales";
    name_en = "Benefactors and Local Companies";
  }
  
  sql += `UPDATE public.partners SET name_fr = ${esc(name_fr)}, name_en = ${esc(name_en)} WHERE id = ${esc(row.id)};\n`;
});

// 11. News
sql += `\n-- News\n`;
db.news.forEach(row => {
  let t_fr = row.title;
  let t_en = row.title;
  let e_fr = row.excerpt;
  let e_en = row.excerpt;
  
  if (row.title.includes("زيارة السيد محمد رشيد")) {
    t_fr = "Visite de M. Mohammed Rachid à l'Institution Darna d'Essaouira";
    t_en = "Visit of Mr. Mohammed Rachid to the Darna Institution in Essaouira";
    e_fr = "Le Gouverneur de la province d'Essaouira, M. Mohammed Rachid, a effectué une visite sur le terrain à l'Institution Darna, accompagné d'une délégation. Cette visite visait à observer de près...";
    e_en = "The Governor of the Essaouira province, Mr. Mohammed Rachid, made a field visit to the Darna Institution, accompanied by a delegation. This visit aimed to closely observe...";
  } else if (row.title.includes("ناس الخير")) {
    t_fr = "Passage de l'Association Essaouira Darna dans l'émission 'Nass Lkhir' sur 2M";
    t_en = "Essaouira Darna Association featured on the 'Nass Lkhir' show on 2M";
    e_fr = "L'Association Essaouira Darna a eu l'honneur d'accueillir l'équipe de l'émission sociale 'Nass Lkhir' diffusée sur la chaîne 2M. Ce reportage met en lumière les initiatives...";
    e_en = "The Essaouira Darna Association had the honor of welcoming the team of the social program 'Nass Lkhir' broadcast on the 2M channel. This report highlights the initiatives...";
  } else if (row.title.includes("الاحتفال باليوم الوطني لليتيم")) {
    t_fr = "Célébration de la Journée Nationale de l'Orphelin 2021";
    t_en = "Celebration of the National Orphan Day 2021";
    e_fr = "À l'occasion de la Journée Nationale de l'Orphelin, l'association organise une campagne de collecte de dons auprès des bienfaiteurs et amis de l'association pour redonner le sourire aux enfants...";
    e_en = "On the occasion of the National Orphan Day, the association is organizing a fundraising campaign with benefactors and friends of the association to bring smiles back to the children...";
  }
  
  sql += `UPDATE public.news SET title_fr = ${esc(t_fr)}, title_en = ${esc(t_en)}, excerpt_fr = ${esc(e_fr)}, excerpt_en = ${esc(e_en)} WHERE id = ${esc(row.id)};\n`;
});

fs.appendFileSync('translate_db.sql', sql);
console.log('Part 3 generated.');
