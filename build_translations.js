const fs = require('fs');

const db = JSON.parse(fs.readFileSync('db_dump.json', 'utf8'));

// A helper to escape SQL strings
const esc = (str) => {
  if (!str) return 'NULL';
  return "'" + str.replace(/'/g, "''") + "'";
};

let sql = `-- Database Translation Script
-- This script updates all localized columns with French and English translations.

`;

// 1. Association Info
sql += `-- Association Info\n`;
db.association_info.forEach(row => {
  const name_fr = "Association Essaouira Darna";
  const name_en = "Essaouira Darna Association";
  const tagline_fr = "Prise en charge, hébergement et intégration des enfants en situation difficile dans la province d'Essaouira";
  const tagline_en = "Care, housing, and integration of children in difficult situations in the Essaouira province";
  const desc_fr = "L'association Essaouira Darna a été fondée dans le but de fournir des soins complets, une éducation et un soutien psychosocial aux enfants orphelins, abandonnés ou vivant dans des conditions sociales difficiles dans la ville d'Essaouira et ses environs.";
  const desc_en = "The Essaouira Darna Association was founded with the aim of providing comprehensive care, education, and psychosocial support to orphaned, abandoned children or those living in difficult social conditions in the city of Essaouira and its surroundings.";
  const addr_fr = "Lotissement El Ghazoua, Essaouira, Maroc";
  const addr_en = "El Ghazoua Subdivision, Essaouira, Morocco";
  
  sql += `UPDATE public.association_info SET name_fr = ${esc(name_fr)}, name_en = ${esc(name_en)}, tagline_fr = ${esc(tagline_fr)}, tagline_en = ${esc(tagline_en)}, description_fr = ${esc(desc_fr)}, description_en = ${esc(desc_en)}, address_fr = ${esc(addr_fr)}, address_en = ${esc(addr_en)} WHERE id = ${esc(row.id)};\n`;
});

// 2. Nav Links
sql += `\n-- Nav Links\n`;
const navMap = {
  "الرئيسية": { fr: "Accueil", en: "Home" },
  "من نحن": { fr: "À propos", en: "About Us" },
  "مشاريعنا": { fr: "Nos Projets", en: "Our Projects" },
  "كيف تساهم": { fr: "Comment Contribuer", en: "How to Contribute" },
  "اتصل بنا": { fr: "Contactez-nous", en: "Contact Us" }
};
db.nav_links.forEach(row => {
  const t = navMap[row.label] || { fr: row.label, en: row.label };
  sql += `UPDATE public.nav_links SET label_fr = ${esc(t.fr)}, label_en = ${esc(t.en)} WHERE id = ${esc(row.id)};\n`;
});

// 3. Stats
sql += `\n-- Stats\n`;
const statsMap = {
  "مستفيد": { l_fr: "Bénéficiaire", l_en: "Beneficiary" },
  "درهم": { l_fr: "MAD", l_en: "MAD" },
  "عدد المستفيدين حتى 31/12/2025": { fr: "Nombre de bénéficiaires jusqu'au 31/12/2025", en: "Number of beneficiaries up to 31/12/2025" },
  "المبلغ المتوقع للتبرعات الخيرية لعام 2026 (24%)": { fr: "Montant estimé des dons caritatifs pour 2026 (24%)", en: "Estimated amount of charitable donations for 2026 (24%)" },
  "الميزانية التشغيلية المتوقعة لعام 2026": { fr: "Budget de fonctionnement estimé pour 2026", en: "Estimated operating budget for 2026" },
  "عدد المستفيدين لعام 2026": { fr: "Nombre de bénéficiaires pour 2026", en: "Number of beneficiaries for 2026" }
};
db.stats.forEach(row => {
  const l = statsMap[row.label] || { l_fr: row.label, l_en: row.label };
  const d = statsMap[row.description] || { fr: row.description, en: row.description };
  sql += `UPDATE public.stats SET label_fr = ${esc(l.l_fr)}, label_en = ${esc(l.l_en)}, description_fr = ${esc(d.fr)}, description_en = ${esc(d.en)} WHERE id = ${esc(row.id)};\n`;
});

// 4. Association Values
sql += `\n-- Association Values\n`;
const valMap = {
  "جودة الخدمات": { t_fr: "Qualité des Services", t_en: "Quality of Services", d_fr: "Nos services sont gratuits pour garantir leur continuité et leur conformité à la loi 14/05", d_en: "Our services are free to ensure their continuity and compliance with Law 14/05" },
  "شراكة": { t_fr: "Partenariat", t_en: "Partnership", d_fr: "Nous sommes convaincus que le succès de toute action sociale repose sur la participation et la coopération entre les individus", d_en: "We are convinced that the success of any social action relies on participation and cooperation between individuals" },
  "المصداقية": { t_fr: "Crédibilité", t_en: "Credibility", d_fr: "Dans toutes les initiatives qui nous aident à fournir l'assistance nécessaire aux enfants dans le besoin", d_en: "In all initiatives that help us provide necessary assistance to children in need" },
  "التواصل": { t_fr: "Communication", t_en: "Communication", d_fr: "En communication constante avec nos partenaires", d_en: "In constant communication with our partners" },
  "تكافل": { t_fr: "Solidarité", t_en: "Solidarity", d_fr: "Entre les bénéficiaires et le personnel de l'association", d_en: "Between beneficiaries and association staff" },
  "الشفافية": { t_fr: "Transparence", t_en: "Transparency", d_fr: "Dans la gestion des affaires administratives et financières", d_en: "In the management of administrative and financial affairs" },
  "رعاية شاملة": { t_fr: "Prise en Charge Globale", t_en: "Comprehensive Care", d_fr: "Fournir un abri, de la nourriture, des vêtements et des soins médicaux à chaque enfant résidant au foyer pour assurer sa croissance équilibrée et naturelle.", d_en: "Providing shelter, food, clothing, and medical care to every child residing in the home to ensure their balanced and natural growth." },
  "التعليم والتوجيه": { t_fr: "Éducation et Orientation", t_en: "Education and Guidance", d_fr: "Suivre les enfants dans leur parcours éducatif, les guider et les qualifier pour entrer sur le marché du travail et devenir autonomes.", d_en: "Following children in their educational paths, guiding them, and qualifying them to enter the job market and become self-reliant." },
  "الشفافية والالتزام": { t_fr: "Transparence et Engagement", t_en: "Transparency and Commitment", d_fr: "Engagement envers les normes les plus élevées de gouvernance financière et de gestion administrative avec tous les partenaires, donateurs et institutions.", d_en: "Commitment to the highest standards of financial governance and administrative management with all partners, donors, and institutions." }
};
db.association_values.forEach(row => {
  const t = valMap[row.title] || { t_fr: row.title, t_en: row.title, d_fr: row.description, d_en: row.description };
  sql += `UPDATE public.association_values SET title_fr = ${esc(t.t_fr)}, title_en = ${esc(t.t_en)}, description_fr = ${esc(t.d_fr)}, description_en = ${esc(t.d_en)} WHERE id = ${esc(row.id)};\n`;
});

// Write to file
fs.writeFileSync('translate_db.sql', sql);
console.log('Part 1 generated.');
