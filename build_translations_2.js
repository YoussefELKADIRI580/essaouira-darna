const fs = require('fs');

const db = JSON.parse(fs.readFileSync('db_dump.json', 'utf8'));

// A helper to escape SQL strings
const esc = (str) => {
  if (!str) return 'NULL';
  return "'" + str.replace(/'/g, "''") + "'";
};

let sql = `\n\n`;

// 5. About Content
sql += `-- About Content\n`;
db.about_content.forEach(row => {
  let c_fr = row.content;
  let c_en = row.content;
  let t_fr = row.title;
  let t_en = row.title;
  if (row.title === "مستقبل بدون أطفال في وضعية شارع") {
    t_fr = "Un avenir sans enfants en situation de rue";
    t_en = "A future without street children";
    c_fr = "À l'association Essaouira Darna, nous aspirons à ce que la province d'Essaouira soit totalement exempte du phénomène des enfants sans-abri ou en danger, et nous voulons garantir à chaque enfant de cette catégorie un abri digne et une chance égale pour une éducation de qualité et un développement sain.";
    c_en = "At the Essaouira Darna Association, we aspire for the Essaouira province to be completely free of the phenomenon of homeless or at-risk children, and we want to guarantee every child in this category a dignified shelter and an equal chance for quality education and healthy development.";
  } else if (row.title === "الرعاية والإيواء والإدماج الاجتماعي") {
    t_fr = "Prise en charge, hébergement et intégration sociale";
    t_en = "Care, housing, and social integration";
    c_fr = "Notre mission est d'accueillir les enfants orphelins, abandonnés ou vivant dans une situation difficile, de leur fournir un abri sûr, une alimentation complète, des soins médicaux, une éducation et des activités récréatives, afin de préparer leur intégration effective dans leur environnement social et professionnel en tant que membres actifs et indépendants.";
    c_en = "Our mission is to welcome orphaned, abandoned, or children living in difficult situations, to provide them with a safe shelter, comprehensive nutrition, medical care, education, and recreational activities, in order to prepare their effective integration into their social and professional environment as active and independent members.";
  } else if (row.content.includes("جمعية الصويرة دارنا هي مؤسسة للحماية الاجتماعية")) {
    c_fr = "L'association Essaouira Darna est une institution de protection sociale qui s'occupe des enfants abandonnés ou en situation difficile.";
    c_en = "The Essaouira Darna Association is a social protection institution that cares for abandoned children or those in difficult situations.";
  } else if (row.content.includes("تأسست الجمعية في 21 مارس 2008")) {
    c_fr = "L'association a été fondée le 21 mars 2008 grâce à l'Initiative Nationale pour le Développement Humain lancée en 2005 à Essaouira.";
    c_en = "The association was founded on March 21, 2008, thanks to the National Initiative for Human Development launched in 2005 in Essaouira.";
  } else if (row.content.includes("أصبحت المؤسسة مرخصة قانونيا في أبريل 2009")) {
    c_fr = "L'institution a été légalement autorisée en avril 2009, conformément à la décision n° 10/09 du Ministère de la Solidarité, de la Femme, de la Famille et du Développement Social, avec une capacité de 120 bénéficiaires.";
    c_en = "The institution was legally authorized in April 2009, in accordance with Decision No. 10/09 of the Ministry of Solidarity, Women, Family and Social Development, with a capacity of 120 beneficiaries.";
  } else if (row.content.includes("تخضع إدارة المؤسسة للقانون التشريعي رقم 14/05")) {
    c_fr = "La gestion de l'institution est soumise à la loi n° 14-05 relative aux conditions d'ouverture et de gestion des établissements de protection sociale au Maroc.";
    c_en = "The management of the institution is subject to Law No. 14-05 regarding the conditions for opening and managing social protection establishments in Morocco.";
  }
  sql += `UPDATE public.about_content SET title_fr = ${esc(t_fr)}, title_en = ${esc(t_en)}, content_fr = ${esc(c_fr)}, content_en = ${esc(c_en)} WHERE id = ${esc(row.id)};\n`;
});

// 6. History Timeline
sql += `\n-- History Timeline\n`;
db.history_timeline.forEach(row => {
  let d_fr = row.description;
  let d_en = row.description;
  if (row.year === "2005") {
    d_fr = "En partenariat avec la préfecture d'Essaouira, le projet « Essaouira Darna » est né dans le cadre de l'INDH (Initiative Nationale pour le Développement Humain).";
    d_en = "In partnership with the Essaouira prefecture, the 'Essaouira Darna' project was born within the framework of the INDH (National Initiative for Human Development).";
  } else if (row.year === "2008") {
    d_fr = "L'association a officiellement ouvert ses portes et a commencé à accueillir des enfants abandonnés et ceux confrontés à des situations sociales difficiles, venant principalement d'autres associations comme l'Association Annajma et l'Association Nour Mogador.";
    d_en = "The association officially opened its doors and began welcoming abandoned children and those facing difficult social situations, coming mainly from other associations such as the Annajma Association and the Nour Mogador Association.";
  } else if (row.year === "2009") {
    d_fr = "L'institution a obtenu une autorisation légale conformément à la loi 14-05 et à la décision n° 10/09 du Ministère de la Solidarité, de la Femme et du Développement Social, avec une capacité de 60 bénéficiaires.";
    d_en = "The institution obtained legal authorization in accordance with Law 14-05 and Decision No. 10/09 from the Ministry of Solidarity, Women, and Social Development, with a capacity of 60 beneficiaries.";
  } else if (row.year === "2017") {
    d_fr = "L'institution a été autorisée, conformément à la loi 14-05, à augmenter sa capacité d'accueil à 120 bénéficiaires.";
    d_en = "The institution was authorized, in accordance with Law 14-05, to increase its hosting capacity to 120 beneficiaries.";
  } else if (row.year === "حالياً") {
    d_fr = "L'institution est actuellement gérée par une association composée de sept membres, dont trois femmes.";
    d_en = "The institution is currently managed by an association composed of seven members, including three women.";
  }
  sql += `UPDATE public.history_timeline SET description_fr = ${esc(d_fr)}, description_en = ${esc(d_en)} WHERE id = ${esc(row.id)};\n`;
});

// 7. Projects
sql += `\n-- Projects\n`;
const projMap = {
  "تجهيز وتسيير دار الأطفال دارنا": {
    t_fr: "Équipement et gestion de l'orphelinat Darna",
    t_en: "Equipping and running the Darna orphanage",
    s_fr: "Fournir un abri sûr et des soins complets aux enfants orphelins et en situation de rue à Essaouira.",
    s_en: "Providing a safe shelter and comprehensive care for orphaned and street children in Essaouira.",
    l_fr: "Ce projet continu vise à couvrir les coûts opérationnels du centre de soins à Essaouira (Darna), y compris l'alimentation, l'habillement, les soins médicaux et l'éducation pour les enfants résidents. Nous nous efforçons de fournir un environnement familial chaleureux qui soutient leur développement intégré et leur intégration dans la société.",
    l_en: "This ongoing project aims to cover the operational costs of the care center in Essaouira (Darna), including nutrition, clothing, medical care, and education for the resident children. We strive to provide a warm family environment that supports their integrated development and integration into society."
  }
};
db.projects.forEach(row => {
  const p = projMap[row.title] || { t_fr: row.title, t_en: row.title, s_fr: row.short_description, s_en: row.short_description, l_fr: row.long_description, l_en: row.long_description };
  sql += `UPDATE public.projects SET title_fr = ${esc(p.t_fr)}, title_en = ${esc(p.t_en)}, short_description_fr = ${esc(p.s_fr)}, short_description_en = ${esc(p.s_en)}, long_description_fr = ${esc(p.l_fr)}, long_description_en = ${esc(p.l_en)} WHERE id = ${esc(row.id)};\n`;
});

// 8. Project Supplies
sql += `\n-- Project Supplies\n`;
const supMap = {
  "قفة المواد الغذائية الأساسية لأسرة لمدة شهر": { fr: "Panier de denrées de base pour une famille pendant un mois", en: "Basic food basket for a family for a month" },
  "توفير الأدوية الأساسية والوصفات الطبية المستعجلة": { fr: "Fourniture de médicaments de base et d'ordonnances urgentes", en: "Providing basic medicines and urgent prescriptions" },
  "نظارات طبية مصححة للأطفال ضعاف البصر": { fr: "Lunettes correctrices pour les enfants malvoyants", en: "Corrective glasses for visually impaired children" },
  "محفظة مدرسية مجهزة بالكامل بالدفاتر والأقلام": { fr: "Cartable entièrement équipé avec cahiers et stylos", en: "Fully equipped school bag with notebooks and pens" },
  "كتب ومقررات المستوى الابتدائي": { fr: "Livres et manuels de niveau primaire", en: "Primary school books and textbooks" }
};
db.project_supplies.forEach(row => {
  const s = supMap[row.name] || { fr: row.name, en: row.name };
  sql += `UPDATE public.project_supplies SET name_fr = ${esc(s.fr)}, name_en = ${esc(s.en)} WHERE id = ${esc(row.id)};\n`;
});

// Write to file
fs.appendFileSync('translate_db.sql', sql);
console.log('Part 2 generated.');
